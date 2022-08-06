<template>
  <common-page-header
    :title="$props.pageHeader.title"
    :extra-text="$props.pageHeader.extra"
    :content="$props.pageHeader.content"
    :icon="$props.pageHeader.icon"
  />
  <a-card style="margin-top: 18px">
    <world-content-form />
  </a-card>
  <a-row style="margin-top: 18px" :gutter="24">
    <world-content-cardlist />
  </a-row>
  <div style="display: flex; justify-content: flex-end">
    <a-pagination
      v-model:current="pageNum"
      :total="500"
      :show-size-changer="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';
import CardItem from '@/components/cardItem.vue';
import CommonPageHeader from '@/components/worldContent/commonPageHeader.vue';
import { WorldPageHeaderItem } from '@/types';
import WorldContentForm from '@/components/worldContent/world-content-form.vue';
import WorldContentCardlist from '@/components/worldContent/world-content-cardlist.vue';
const pageNum = ref(1);
const props = defineProps({
  pageHeader: {
    type: Object as PropType<WorldPageHeaderItem>,
    required: true,
  },
});
</script>

<style scoped></style>
