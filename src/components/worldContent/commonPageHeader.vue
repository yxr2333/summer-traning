<template>
  <a-page-header :title="$props.title" :ghost="false" style="margin: -15px -15px auto -15px">
    <template v-if="$props.extraText !== null && $props.extraText !== ''" #extra>
      <a-button type="primary" @click="handleBtnClick">
        <template #icon>
          <Icon v-if="$props.icon !== null" :icon="$props.icon" />
        </template>
        {{ $props.extraText }}
      </a-button>
    </template>
    {{ $props.content }}
  </a-page-header>
</template>

<script lang="ts" setup>
import { Icon } from '@/utils/icon';
import { PropType } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  extraText: {
    type: String as PropType<string | null>,
    required: false,
  },
  content: {
    required: true,
    type: String,
  },
  icon: {
    required: false,
    type: String as PropType<string | null>,
  },
});

const emits = defineEmits(['btnClick']);

const handleBtnClick = () => {
  emits('btnClick');
};
</script>

<style scoped></style>
