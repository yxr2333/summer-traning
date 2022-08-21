<template>
  <a-card title="心愿详情">
    <a-descriptions>
      <a-descriptions label="内容" :span="3">{{ state?.content }}</a-descriptions>
      <a-descriptions-item label="标签" :span="3">
        <a-tag
          v-for="(tag, index) in state?.labels"
          :key="tag.id"
          :color="index === 0 ? 'success' : 'default'"
        >
          {{ tag.name }}
        </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="发布时间" :span="3">{{ state?.publishTime }}</a-descriptions-item>
      <a-descriptions-item label="许愿人" :span="3" :contentStyle="{ alignItems: 'center' }">
        <a-avatar :src="state?.user.avatar" />
        <span style="margin-left: 5px; font-size: 16px; font-weight: 500">
          {{ state?.user.username }}
        </span>
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>
<script lang="ts" setup>
import { findWishById } from '@/api/wish';
import { WishCardItem } from '@/types/wish/index';
import { onMounted, ref, toRaw } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const state = ref<WishCardItem>();
onMounted(() => {
  const id = toRaw(route.query).id;
  console.log(id);
  findWishById(Number(id)).then((res) => {
    if (res) {
      state.value = res.data;
    }
  });
});
</script>
