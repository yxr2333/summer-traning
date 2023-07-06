<template>
  <div class="info-wrapper">
    <a-card>
      <div class="name-avatar-box">
        <a-avatar :src="userInfo?.avatar" :size="100" />
        <div class="name-box">
          <span class="name">{{ userInfo?.username }}</span>
          <a-tag color="success" style="margin-left: 15px">V1</a-tag>
          <div>{{ userInfo?.description }}</div>
        </div>
      </div>
    </a-card>

    <a-card title="信息" style="margin-top: 30px">
      <template #extra>
        <a-button type="primary" @click="handleEdit">
          <template #icon>
            <edit-outlined />
          </template>
          编辑
        </a-button>
      </template>
      <a-descriptions>
        <a-descriptions-item label="积分" :span="3">{{ userInfo?.score }}</a-descriptions-item>
        <a-descriptions-item label="兴趣" :span="3">
          <a-tag
            v-for="(tag, index) in userInfo?.labels"
            :key="tag.id"
            :color="!index ? 'success' : 'default'"
          >
            {{ tag.name }}
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="邮箱" :span="3">{{ userInfo?.email }}</a-descriptions-item>
        <a-descriptions-item label="个人简介" :span="3">
          {{ userInfo?.description }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-modal
      v-model:visible="visible"
      title="修改个人信息"
      okText="确认"
      cancelText="取消"
      @ok="handleOkInfo"
    >
      <a-form
        :model="modalUserInfo"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 21 }"
        autocomplete="off"
      >
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="modalUserInfo.username" />
        </a-form-item>
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="modalUserInfo.email" />
        </a-form-item>
        <a-form-item label="个人简介" name="description">
          <a-textarea v-model:value="modalUserInfo.description" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import store, { useMenuStore, useUserInfoStore } from '@/store';
import { UserInfo } from '@/types/user/user';
import { EditOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';

const menuStore = useMenuStore(store);
const userStore = useUserInfoStore(store);
const userInfo = ref<UserInfo>(userStore.userInfo);
const modalUserInfo = ref<UserInfo>({ ...userInfo.value });
const visible = ref(false);
onMounted(() => {
  menuStore.$patch({
    nowMenu: 'setting',
  });
});
const handleEdit = () => {
  modalUserInfo.value = { ...userInfo.value };
  visible.value = true;
};
const handleOkInfo = async () => {
  // 更新用户的信息
  // await userStore.updateUserInfo(modalUserInfo.value);
  visible.value = false;
};
</script>
<style lang="less" scoped>
.info-wrapper {
  margin: 12px;
  min-height: calc(100vh - 136px);
  min-width: calc(100vw - 258px);
  .name-avatar-box {
    display: flex;
    margin: 20px 0;
    .name-box {
      margin-left: 15px;
      .name {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
}
</style>
