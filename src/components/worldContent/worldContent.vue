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
    <a-pagination v-model:current="pageNum" :total="500" :show-size-changer="false" />
  </div>
</template>

<script lang="ts" setup>
import CommonPageHeader from '@/components/worldContent/commonPageHeader.vue';
import WorldContentCardlist from '@/components/worldContent/world-content-cardlist.vue';
import WorldContentForm from '@/components/worldContent/world-content-form.vue';
import { PageData, WorldPageHeaderItem } from '@/types';
import { PropType, ref } from 'vue';
const pageNum = ref(1);
const props = defineProps({
  pageHeader: {
    type: Object as PropType<WorldPageHeaderItem>,
    required: true,
  },
  cardList: {
    type: Array,
    require: true,
  },
  pageData: {
    type: Object as PropType<PageData>,
    required: true,
  },
});
</script>

<style scoped></style>
