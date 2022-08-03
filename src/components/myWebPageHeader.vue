<template>
  <a-page-header
    style="
      border: 1px solid rgb(235, 237, 240);
      background-color: #fff;
      width: 100%;
    "
    :title="$props.headerTitle"
  >
    <template #extra>
      <a-radio-group
        v-model:value="$props.radioVal"
        button-style="solid"
        @change="handleChange"
      >
        <a-radio-button
          v-for="(item, index) in $props.radioData"
          :key="index"
          :value="item.value"
        >
          {{ item.title }}
        </a-radio-button>
      </a-radio-group>
    </template>
  </a-page-header>
</template>

<script setup lang="ts">
import { PageHeaderRadioItem } from '@/types';
import { PropType } from 'vue';

defineProps({
  headerTitle: {
    required: true,
    default: '标题',
    type: String,
  },
  radioVal: {
    required: true,
    type: String as PropType<string | number>,
  },
  radioData: {
    required: true,
    type: Array as PropType<PageHeaderRadioItem[]>,
  },
  onRadioChange: {
    required: true,
    type: Function as PropType<(val: string | number) => void>,
  },
});
const emit = defineEmits(['radioChange']);
const handleChange = (e: any) => {
  emit('radioChange', e.target.value);
};
</script>

<style scoped></style>
