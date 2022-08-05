<template>
  <common-page-header
    :title="$props.pageHeader.title"
    :extra-text="$props.pageHeader.extra"
    :content="$props.pageHeader.content"
  />
  <a-card style="margin-top: 18px">
    <a-form layout="horizontal">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item>
            <template #label>内容</template>
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item>
            <template #label>标签</template>
            <a-input-search />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-row justify="end" align="center">
            <a-button type="primary">提交</a-button>
            <a-button type="default">重置</a-button>
          </a-row>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
  <a-row style="margin-top: 18px" :gutter="24">
    <a-col
      v-for="(item, index) in 24"
      :key="index"
      style="margin-bottom: 10px"
      :span="8"
    >
      <card-item
        :tags="['编程']"
        title="SpringBoot"
        desc="SpringBoot Content"
        time="12小时"
      ></card-item>
    </a-col>
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
import CommonPageHeader from '@/components/commonPageHeader.vue';
import { WorldPageHeaderItem } from '@/types';
const pageNum = ref(1);
const props = defineProps({
  pageHeader: {
    type: Object as PropType<WorldPageHeaderItem>,
    required: true,
  },
});
</script>

<style scoped></style>
