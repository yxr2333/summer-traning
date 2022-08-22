<template>
  <a-form layout="horizontal">
    <a-row :gutter="24" align="middle">
      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <a-form-item style="margin: 0">
          <template #label>内容</template>
          <a-input placeholder="请输入内容.." v-model:value="state.content" />
        </a-form-item>
      </a-col>
      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <a-form-item style="margin: 0">
          <template #label>标签</template>
          <a-select
            mode="multiple"
            v-model:value="state.labelIds"
            show-search
            placeholder="选择标签"
            style="width: 200px"
            :options="options"
            :filter-option="filterOption"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24" style="margin-top: 10px">
        <a-row justify="center" align="center">
          <a-button type="primary" style="margin-right: 5px" @click="handleSearch">搜索</a-button>
          <a-button type="default">重置</a-button>
        </a-row>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
import { getAllLabels } from '@/api/label';
import { LabelItem } from '@/types/label/label';
import { SelectProps } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
const options = ref<SelectProps['options']>();
const allLabels = ref<LabelItem[]>([]);
const state = ref({
  content: '' as string,
  labelIds: [] as number[],
});
const emits = defineEmits(['search']);
const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().includes(input);
};

const handleSearch = () => {
  emits('search', state.value);
};
onMounted(() => {
  getAllLabels().then((res) => {
    if (res) {
      allLabels.value = res.data;
      options.value = res.data.map((label) => {
        return {
          value: label.id,
          label: label.name,
        };
      });
    }
  });
});
</script>

<style scoped></style>
