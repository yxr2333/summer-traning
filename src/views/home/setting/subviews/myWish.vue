<template>
  <div class="wish-wrapper">
    <a-card>
      <a-list>
        <a-badge-ribbon
          v-for="wish in wishes"
          :key="wish.id"
          :color="wish.isFinished ? 'green' : 'red'"
          :text="wish.isFinished ? '已完成' : '未完成'"
        >
          <a-list-item>
            <a-list-item-meta :description="wish.content" :title="wish.user.username">
              <template #avatar>
                <a-avatar :src="wish.user.avatar"></a-avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </a-badge-ribbon>
      </a-list>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { findWishByUid } from '@/api/wish';
import { useUserInfoStore } from '@/store';
import { WishCardItem } from '@/types/wish';
import { onMounted, ref } from 'vue';
const userStore = useUserInfoStore();
const wishes = ref<WishCardItem[]>([]);
onMounted(() => {
  if (userStore.userInfo.uid) {
    findWishByUid(userStore.userInfo.uid, null, null).then((res) => {
      if (res) {
        wishes.value = res.data.data;
      }
    });
  }
});
</script>

<style lang="less" scope>
.wish-wrapper {
  margin: 12px;
  min-height: calc(100vh - 136px);
  min-width: calc(100vw - 258px);
}
</style>
