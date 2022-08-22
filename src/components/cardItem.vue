<template>
  <a-card hoverable>
    <a-card-meta>
      <template #avatar>
        <a-avatar :src="props.avatar ? props.avatar : null" />
      </template>
      <template #title>{{ $props.title }}</template>
      <template #description>{{ $props.desc }}</template>
    </a-card-meta>
    <div style="text-align: left; margin-top: 10px; margin-bottom: 20px">
      <a-tag
        v-for="(item, index) in $props.tags"
        :key="index"
        :color="index === 0 ? 'blue' : 'default'"
      >
        {{ item.name }}
      </a-tag>
    </div>

    <div style="color: #aaaaaa; font-size: 12px; text-align: right">
      发布时间：{{ $props.time }}
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { LabelItem } from '@/types/label/label';
import { PropType } from 'vue';

const props = defineProps({
  avatar: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  tags: {
    type: Array as PropType<LabelItem[]>,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
