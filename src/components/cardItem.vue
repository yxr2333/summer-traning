<template>
  <a-card hoverable>
    <a-card-meta>
      <template #avatar>
        <a-avatar />
      </template>
      <template #title>{{ $props.title }}</template>
      <template #description>{{ $props.desc }}</template>
    </a-card-meta>
    <a-tag v-for="(item, index) in $props.tags" :key="index" color="blue">
      {{ item }}
    </a-tag>
    <div style="color: #aaaaaa; font-size: 12px">
      发布时间：{{ $props.time }}前
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  tags: {
    type: Array as PropType<string[]>,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
