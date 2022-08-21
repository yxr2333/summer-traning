<template>
  <div class="record-wrapper">
    <a-card title="推荐记录">
      <a-list v-if="resources.length">
        <a-list-item v-for="resource in resources" :key="resource.id">
          <a-list-item-meta :description="resource.description" :title="resource.name">
            <template #avatar>
              <a-avatar :src="resource.icon"></a-avatar>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <a-empty description="暂无数据" v-else />
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { findPublishList } from '@/api/user/user';
import { useUserInfoStore } from '@/store';
import { ResourceItem } from '@/types/resource';
import { onMounted, ref } from 'vue';
const userStore = useUserInfoStore();
const resources = ref<ResourceItem[]>([]);
onMounted(() => {
  if (userStore.userInfo.uid) {
    findPublishList(userStore.userInfo.uid).then((res) => {
      if (res) {
        resources.value = res.data;
      }
    });
  }
});
</script>
<style lang="less" scoped>
.record-wrapper {
  margin: 12px;
  min-height: calc(100vh - 136px);
  min-width: calc(100vw - 258px);
}
</style>
