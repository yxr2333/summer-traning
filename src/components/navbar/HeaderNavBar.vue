<template>
  <a-modal
    :visible="isVisible"
    title="发布资源"
    @ok="handleOk"
    ok-text="确认"
    cancel-text="取消"
    @cancel="isVisible = false"
  >
    <a-form labelAlign="left">
      <a-form-item label="名称" required>
        <a-input
          v-model:value="createState.name"
          placeholder="网站、文章等资源名，最多25字"
          aria-autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="描述" required>
        <a-input
          v-model:value="createState.description"
          placeholder="用一句话介绍资源，最多80字"
          aria-autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="是否付费" required>
        <a-switch
          v-model:checked="isPaid"
          checked-children="免费"
          un-checked-children="付费"
        ></a-switch>
      </a-form-item>
      <a-form-item label="密码" v-if="!createState.isPaid">
        <a-input-password
          v-model:value="createState.password"
          placeholder="请输入密码..."
          aria-autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="链接" required>
        <a-input v-model:value="createState.link" placeholder="与资源对应的地址，http(s)开头" />
      </a-form-item>
      <a-form-item label="标签" required>
        <a-select
          mode="multiple"
          v-model:value="seletedLabels"
          show-search
          placeholder="选择标签"
          style="width: 200px"
          :options="options"
          :filter-option="filterOption"
        ></a-select>
      </a-form-item>
      <a-form-item label="图标" required>
        <a-upload-dragger
          v-model:fileList="fileList"
          name="file"
          :multiple="true"
          :headers="headers"
          action="/api/v1/common/upload"
          @change="handleChange"
          @drop="handleDrop"
        >
          <img
            :src="imgUrl"
            alt="example"
            style="width: 100px; height: 100px"
            v-if="fileList.length !== 0"
          />
          <div v-else>
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">点击或将文件拖到此处进行上传</p>
            <p class="ant-upload-hint">只支持上传图片类型的文件</p>
          </div>
        </a-upload-dragger>
        <a-button type="primary" style="margin-top: 10px">从图库选择</a-button>
      </a-form-item>
      <a-form-item label="详情" required>
        <a-textarea placeholder="详细介绍该资源的作用、用法等等"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
  <div class="header-wrapper">
    <a-row style="height: 80px" type="flex" justify="space-around" align="middle">
      <a-col :xl="5" :lg="5" :md="5" :sm="8" :xs="8" class="brand-part">
        <web-brand class="brand-part" />
        <span ref="brandText">知识星球</span>
        <span ref="menuIcon" @click="handleDrawerClick">
          <Icon :icon="menuIconText" style="font-size: 20px" />
          <!--          <menu-unfold-outlined :style="{ fontSize: '20px' }" />-->
        </span>
      </a-col>

      <a-col ref="menuRef" :xl="7" :lg="7" :md="7">
        <top-menu :menu-current="current" class="menu-part" @menu-select="handleMenuSelect" />
      </a-col>
      <a-col ref="inputRef" :xl="8" :lg="8" :md="8" :sm="8" :xs="8" class="search-part">
        <a-input-search
          v-model:value="searchData"
          size="large"
          class="search-part"
          placeholder="输入数据进行搜索...."
          enter-button
          @search="onSearch"
        />
      </a-col>
      <a-col ref="btnRef" :xl="2" :lg="2" :md="2" :sm="4" :xs="4" class="own-part">
        <a-row align="middle" justify="center">
          <a-button type="primary" @click="handlePublish">推荐</a-button>
        </a-row>
      </a-col>
      <a-col
        :xl="2"
        :lg="2"
        :md="2"
        :sm="3"
        :xs="3"
        class="own-part"
        style="justify-content: center"
      >
        <a-dropdown placement="bottom">
          <a-avatar :size="40" style="cursor: pointer" alt="头像" :src="avatarUrl"></a-avatar>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="router.push({ name: 'settingData' })">
                <template #icon>
                  <user-outlined />
                </template>
                <a href="javascript:">个人中心</a>
              </a-menu-item>
              <a-menu-item @click="router.push({ name: 'settingNotification' })">
                <template #icon>
                  <message-outlined />
                </template>
                <a href="javascript:">消息中心</a>
              </a-menu-item>
              <a-menu-item>
                <template #icon>
                  <logout-outlined :style="{ color: 'red' }" />
                </template>
                <a style="color: red" @click="handleLogout">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-col>
    </a-row>
  </div>
  <a-drawer
    v-model:visible="drawerVisible"
    placement="right"
    width="150"
    :z-index="200"
    style="padding: 40px 24px"
  >
    <top-menu
      menu-mode="vertical"
      :menu-current="current"
      class="menu-part"
      @menu-select="handleMenuSelect"
    />
  </a-drawer>
</template>

<script lang="ts" setup>
import { getAllLabels } from '@/api/label';
import { publishResource } from '@/api/resource';
import TopMenu from '@/components/navbar/TopMenu.vue';
import WebBrand from '@/components/navbar/WebBrand.vue';
import { useMenuStore, useUserInfoStore } from '@/store';
import { LabelItem } from '@/types/label/label';
import { Icon } from '@/utils/icon';
import {
  InboxOutlined,
  LogoutOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import { message, SelectProps, type UploadChangeParam } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().includes(input);
};
const menuStore = useMenuStore();
const userStore = useUserInfoStore();
const headers = ref({
  token: userStore.token,
});
const router = useRouter();
const current = ref<string[]>([menuStore.nowMenu]); // 从pinia中读取当前选中的菜单

const searchData = ref<string | null>(null);
const brandText = ref();
const menuIcon = ref();
const btnRef = ref();
const menuRef = ref();
const inputRef = ref();
const drawerVisible = ref(false);
const menuIconText = ref('MenuUnfoldOutlined');
const avatarUrl = ref('');
const isVisible = ref(false);
const fileList = ref<any[]>([]);
const imgUrl = ref('');
const allLabels = ref<LabelItem[]>([]);
const seletedLabels = ref<any[]>([]);
const isPaid = ref(true);
const options = ref<SelectProps['options']>();

const createState = ref({
  name: null as string | null,
  description: null as string | null,
  link: null as string | null,
  icon: null as string | null,
  isPaid: true as boolean,
  password: null as string | null,
  publishUser: null as number | null,
  labels: [] as any[],
});
const handleDrop = (e: DragEvent) => {
  console.log(e);
};
const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'done') {
    imgUrl.value = info.file.response.data;
  }
};

const handlePublish = () => {
  isVisible.value = true;
};
const handleOk = () => {
  createState.value.isPaid = !isPaid.value;
  createState.value.icon = fileList.value[0].response.data;
  createState.value.publishUser = userStore.userInfo.uid;
  createState.value.labels = seletedLabels.value.map((label) => {
    return {
      id: label,
    };
  });
  console.log(createState.value);
  publishResource(createState.value).then((res) => {
    if (res) {
      Object.assign(createState.value, {
        name: null as string | null,
        description: null as string | null,
        link: null as string | null,
        icon: null as string | null,
        isPaid: true as boolean,
        password: null as string | null,
        publishUser: null as number | null,
        labels: [] as any[],
      });
      seletedLabels.value = [];
      isPaid.value = true;
      fileList.value = [];
      imgUrl.value = '';
      isVisible.value = false;
    }
  });
};

const handleLogout = (e: Event) => {
  e.preventDefault();
  userStore.$reset();
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  message.success('退出成功');
  router.replace('/login');
};
const handleDrawerClick = () => {
  drawerVisible.value = !drawerVisible.value;
  if (drawerVisible.value === true) {
    menuIconText.value = 'MenuFoldOutlined';
  } else {
    menuIconText.value = 'MenuUnfoldOutlined';
  }
};
/**
 * 根据宽度设置部分元素的可见性
 */
const checkWidth = () => {
  let width = document.body.clientWidth;
  if (width <= 750) {
    brandText.value.style.display = 'none';
    menuRef.value.$el.style.display = 'none';
    if (width <= 460) {
      btnRef.value.$el.style.display = 'none';
    }
    // inputRef.value.$el.style.display = 'none';

    menuIcon.value.style.display = 'inline-block';
  } else {
    brandText.value.style.display = 'inline-block';
    btnRef.value.$el.style.display = 'inline-block';
    menuIcon.value.style.display = 'none';
    menuRef.value.$el.style.display = 'inline-block';
    // inputRef.value.$el.style.display = 'inline-block';
  }
};
onMounted(() => {
  checkWidth();
  console.log(userStore.userInfo);

  if (userStore.userInfo !== null && userStore.userInfo.avatar) {
    avatarUrl.value = userStore.userInfo.avatar;
  }
  getAllLabels().then((res) => {
    if (res) {
      allLabels.value = res.data;
      options.value = res.data.map((label) => {
        return {
          value: label.id,
          label: label.name,
        };
      });
    }
  });
});
window.onresize = () => {
  checkWidth();
};

// menuStore.$subscribe((mutation, state) => {
//   console.log('$subscribe');
//   current.value.pop();
//   current.value.push(state.nowMenu);
//   console.log('current', current.value);
//   // router.push({ name: current.value.at(0) });
// });

const onSearch = () => {};
const handleMenuSelect = (key: string) => {
  if (drawerVisible.value === true) {
    setTimeout(() => {
      drawerVisible.value = false;
      menuIconText.value = 'MenuUnfoldOutlined';
    }, 500);
  }
  router.push({ name: key });
};
</script>

<style lang="less">
.header-wrapper {
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgb(0 21 41 / 12%);
  .search-part {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .brand-part {
    display: inline-block;
    cursor: pointer;
  }
  .menu-part {
    width: 100%;
  }
  .own-part {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

.ant-dropdown-menu-root {
  top: 20px;
}
</style>
