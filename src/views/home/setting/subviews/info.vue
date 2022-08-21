<template>
  <div class="info-wrapper">
    <a-card>
      <a-avatar :src="userInfo?.avatar" :size="100" />
      <a-tag color="success" style="margin-left: 15px">1级</a-tag>
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
  </div>
</template>
<script lang="ts" setup>
import { useMenuStore, useUserInfoStore } from '@/store';
import { UserInfo } from '@/types/user/user';
import { EditOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
const userStore = useUserInfoStore();
const menuStore = useMenuStore();
const userInfo = ref<UserInfo>();
const handleEdit = () => {
  message.success('编辑...');
};
onMounted(() => {
  userInfo.value = userStore.userInfo;
  menuStore.$patch({
    nowMenu: 'setting',
  });
});
</script>
<style lang="less" scoped>
.info-wrapper {
  margin: 12px;
  min-height: calc(100vh - 136px);
  min-width: calc(100vw - 258px);
}
</style>
