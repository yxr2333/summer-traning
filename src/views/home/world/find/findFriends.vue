<template>
  <div>
    <world-content :page-header="header" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { WorldPageHeaderItem } from '@/types';
import WorldContent from '@/components/worldContent/worldContent.vue';
const header = ref<WorldPageHeaderItem>({
  title: '🔍︎找伙伴',
  content: '海内存知己,天涯若比邻',
  extra: '填写自我介绍',
  icon: 'EditOutlined',
});
</script>

<style scoped></style>
