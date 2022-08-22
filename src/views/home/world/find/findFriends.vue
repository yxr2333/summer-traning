<template>
  <!--弹出框部分-->
  <a-modal
    :visible="isVisible"
    title="完善个人信息"
    cancel-text="关闭"
    ok-text="提交"
    @cancel="isVisible = false"
    @ok="handleModalOk"
  >
    <a-form :model="formState" autocomplete="off" label-align="right">
      <a-form-item label="个人介绍" required name="description">
        <a-input :value="formState.description" />
      </a-form-item>

      <a-form-item label="联系方式" required name="contact">
        <a-input :value="formState.contact" />
      </a-form-item>
    </a-form>
  </a-modal>
  <common-page-header
    :title="header.title"
    :extra-text="header.extra"
    :content="header.content"
    :icon="header.icon"
    @btnClick="handleBtnClick"
  />
  <div class="wish-wrapper">
    <a-card style="margin-top: 18px">
      <world-content-form @search="handleSearch" />
    </a-card>
    <a-card style="margin-top: 18px">
      <a-list item-layout="vertical">
        <a-spin tip="加载中..." :spinning="isLoading">
          <a-list-item v-for="item in dataArray" :key="item.uid">
            <a-list-item-meta>
              <template #avatar>
                <a-avatar :src="item.avatar" :size="40" />
              </template>
              <template #title>{{ item.username }}</template>
              <template #description>{{ item.description }}</template>
            </a-list-item-meta>
            <div style="margin-top: 20px">
              <div>
                <a-tag v-for="(label, index) in item.labels" :key="index" color="default">
                  {{ label.name }}
                </a-tag>
              </div>
              <div style="margin-top: 15px; color: #aaaaaa">发布时间：2天前</div>
            </div>
            <template #actions>
              <a-button type="text">
                <template #icon>
                  <like-outlined />
                </template>
                点赞
              </a-button>
              <a-button type="text">
                <template #icon>
                  <message-outlined />
                </template>
                讨论
              </a-button>
            </template>
          </a-list-item>
        </a-spin>
      </a-list>
    </a-card>
    <div style="display: flex; justify-content: flex-end">
      <a-pagination v-model:current="pageNum" :total="totalNum" :show-size-changer="false" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { findAllUsers, findMyAllUsers } from '@/api/user/user';
import CommonPageHeader from '@/components/worldContent/commonPageHeader.vue';
import WorldContentForm from '@/components/worldContent/world-content-form.vue';
import { useUserInfoStore } from '@/store';
import { WorldPageHeaderItem } from '@/types';
import { UserBaseInfo } from '@/types/user/user';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';

const header = ref<WorldPageHeaderItem>({
  title: '🔍︎找伙伴',
  content: '海内存知己,天涯若比邻',
  extra: '填写自我介绍',
  icon: 'EditOutlined',
});
const userStore = useUserInfoStore();
const dataArray = ref<UserBaseInfo[]>([]);
const pageNum = ref(1);
const totalNum = ref(0);
const pageSize = ref(12);
const isLoading = ref(false);
const isVisible = ref(false);
const formState = ref({
  description: null,
  contact: null,
});

const handleSearch = (state: any) => {
  isLoading.value = true;
  console.log(state);
  if (state.labelIds.length === 0 && state.content === '') {
    findAllUsers(pageNum.value, pageSize.value).then((res) => {
      if (res) {
        totalNum.value = res.data.totalNum;
        dataArray.value = res.data.data;
      }
    });
    isLoading.value = false;

    return;
  }
  findMyAllUsers(null, null, state.labelIds, state.content).then((res) => {
    console.log(res);
    if (res) {
      dataArray.value = res.data.data;
      totalNum.value = res.data.totalNum;
    }
  });
  isLoading.value = false;
};

onMounted(async () => {
  isLoading.value = true;
  const result = await findAllUsers(pageNum.value, pageSize.value);
  if (result) {
    totalNum.value = result.data.totalNum;
    dataArray.value = result.data.data;
  }
  isLoading.value = false;
});

const handleBtnClick = () => {
  if (userStore.userInfo.description) {
    message.info('已完善个人信息');
  } else {
    isVisible.value = true;
  }
};

const handleModalOk = () => {
  message.success('提交成功');
};
</script>

<style scoped>
.wish-wrapper {
  min-height: calc(100vh - 220px);
}
</style>
