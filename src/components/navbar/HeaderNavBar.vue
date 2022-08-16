<template>
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
          <a-button type="primary">推荐</a-button>
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
              <a-menu-item>
                <template #icon>
                  <user-outlined />
                </template>
                <a href="javascript:">个人中心</a>
              </a-menu-item>
              <a-menu-item>
                <template #icon>
                  <message-outlined />
                </template>
                <a href="javascript:">消息中心</a>
              </a-menu-item>
              <a-menu-item>
                <template #icon>
                  <logout-outlined :style="{ color: 'red' }" />
                </template>
                <a @click="handleLogout" style="color: red">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-col>
    </a-row>
  </div>
  <a-drawer
    v-model:visible="drawerVisible"
    placement="left"
    width="150"
    z-index="2000"
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
import TopMenu from '@/components/navbar/TopMenu.vue';
import WebBrand from '@/components/navbar/WebBrand.vue';
import { useMenuStore, useUserInfoStore } from '@/store';
import { Icon } from '@/utils/icon';
import { LogoutOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const menuStore = useMenuStore();
const userStore = useUserInfoStore();
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

const handleLogout = (e: Event) => {
  e.preventDefault();
  userStore.$reset();
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

const onSearch = () => {
  console.log(searchData.value);
};
const handleMenuSelect = (key: string) => {
  // current.value.pop();
  // current.value.push(key);
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
