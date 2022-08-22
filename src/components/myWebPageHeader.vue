<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240); background-color: #fff; width: 100%"
    :title="$props.headerTitle"
  >
    <template #extra>
      <a-switch
        v-model:checked="isFree"
        checked-children="免费"
        un-checked-children="付费"
        @change="handleSwitchChange"
      />
      <a-radio-group v-model:value="selectVal" button-style="solid" @change="handleRadioChange">
        <a-radio-button
          v-for="(item, index) in $props.radioData"
          :key="index"
          :value="Number(item.value)"
        >
          {{ item.title }}
        </a-radio-button>
      </a-radio-group>
    </template>
  </a-page-header>
</template>

<script setup lang="ts">
import { PageHeaderRadioItem } from '@/types';
import { PropType, ref } from 'vue';

const props = defineProps({
  headerTitle: {
    required: true,
    default: '标题',
    type: String,
  },
  radioVal: {
    required: true,
    type: Number as PropType<number>,
  },
  radioData: {
    required: true,
    type: Array as PropType<PageHeaderRadioItem[]>,
  },
  switchData: {
    required: true,
    type: Boolean as PropType<boolean>,
  },
});
const selectVal = ref(props.radioVal);
const isFree = ref(props.switchData);
const emits = defineEmits(['radio-change', 'switch-change']);
const handleRadioChange = (e: Event) => {
  selectVal.value = (e.target as any).value;
  emits('radio-change', (e.target as any).value as number);
};
const handleSwitchChange = (checked: boolean | string | number, event: Event) => {
  emits('switch-change', checked);
};
</script>

<style scoped></style>
