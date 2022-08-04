<template>
  <a-page-header
    :title="$props.title"
    :ghost="false"
    style="margin: -15px -15px auto -15px"
  >
    <template #extra>
      <a-button type="primary">{{ $props.extraText }}</a-button>
    </template>
    {{ $props.content }}
  </a-page-header>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  extraText: {
    type: String,
    required: true,
  },
  content: {
    required: true,
    type: String,
  },
});
</script>

<style scoped></style>
