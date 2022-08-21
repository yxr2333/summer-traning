<template>
  <div class="record-wrapper">
    <a-spin :spinning="isLoading" size="large">
      <a-card title="我的收藏">
        <a-input placeholder="请输入搜索项..." />
        <a-list>
          <a-list-item v-for="item in resourceData" :key="item.id">
            <template #actions>
              <a-button type="text">
                <template #icon>
                  <export-outlined />
                </template>
              </a-button>
              <a-button type="text">
                <template #icon>
                  <star-filled :style="{ color: 'gold' }" />
                </template>
              </a-button>
            </template>
            <a-list-item-meta :description="item.description" :title="item.name">
              <template #avatar>
                <a-avatar :src="item.icon"></a-avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
import { findAllCollectByUserId } from '@/api/user/user';
import { useUserInfoStore } from '@/store';
import { ResourceItem } from '@/types/resource';
import { ExportOutlined, StarFilled } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
const userStore = useUserInfoStore();
const resourceData = ref<ResourceItem[]>([]);
const isLoading = ref(false);
onMounted(() => {
  isLoading.value = true;
  if (userStore.userInfo.uid) {
    findAllCollectByUserId(userStore.userInfo.uid).then((res) => {
      if (res) {
        resourceData.value = res.data;
      }
    });
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});
</script>
<style lang="less" scoped>
.record-wrapper {
  margin: 12px;
  min-height: calc(100vh - 136px);
  min-width: calc(100vw - 258px);
}
</style>
