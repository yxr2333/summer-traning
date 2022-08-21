<template>
  <a-row class="detail-wrapper">
    <a-col :span="16" class="content-left">
      <resource-detail-card :prop-resource-id="Number(resourceId)" />
      <resource-comment-card :prop-resource-id="Number(resourceId)" />
    </a-col>
    <a-col :span="6" class="content-right">
      <resource-like-card :prop-resource-id="Number(resourceId)" :prop-label-id="Number(lableId)" />
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import ResourceCommentCard from '@/components/resource/resourceCommentCard.vue';
import ResourceDetailCard from '@/components/resource/resourceDetailCard.vue';
import ResourceLikeCard from '@/components/resource/resourceLikeCard.vue';
import { onBeforeMount, ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const resourceId = ref<number | null>(null);
const lableId = ref<number | null>(null);
onBeforeMount(() => {
  const id = (toRaw(route).query.value as any)?.id as number;
  const label = (toRaw(route).query.value as any)?.labelId as number;
  if (!id || !label) {
    router.replace('/home/index');
  } else {
    resourceId.value = id;
    lableId.value = label;
  }
});
</script>
<style lang="less" scoped>
.detail-wrapper {
  background-color: #f0f2f5;
  min-width: calc(100vh - 24px);
  min-height: calc(100vh - 80px);
  .content-left {
    margin: 24px 5px 24px 24px;
  }
  .content-right {
    margin: 24px 24px 24px 24px;
  }
}
</style>
