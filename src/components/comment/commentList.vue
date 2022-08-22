<template>
  <a-list class="comment-list" item-layout="horizontal">
    <a-list-item v-for="item in props.commentHistory" :key="item.id">
      <a-list-item-meta :title="item.publishUser.username">
        <template #avatar>
          <a-avatar :src="item.publishUser.avatar"></a-avatar>
        </template>
        <template #description>
          <span style="color: black">{{ item.content }}</span>
          <br />
          <span style="font-size: 10px">发布时间：{{ item.publishTime }}</span>
        </template>
        {{ item.publishTime }}
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script lang="ts" setup>
import { CommentItem } from '@/types';
import { PropType, ref } from 'vue';
const props = defineProps({
  commentHistory: {
    required: true,
    type: Array as PropType<CommentItem[]>,
  },
});
const commentData = ref<CommentItem[]>(props.commentHistory);
</script>

<style scoped></style>
