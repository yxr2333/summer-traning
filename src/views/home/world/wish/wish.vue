<template>
  <world-content :page-header="header" />
</template>

<script lang="ts" setup>
import WorldContent from '@/components/worldContent/worldContent.vue';
import { ref } from 'vue';
import { WorldPageHeaderItem } from '@/types';
const header = ref<WorldPageHeaderItem>({
  title: '💖心愿墙',
  content: '找到你的心愿',
  extra: '更多',
  icon: 'SearchOutlined',
});
</script>

<style scoped></style>
