<template>
  <a-row type="flex" justify="space-around" align="middle">
    <a-col :xl="22" :lg="22" :md="22" :sm="21" :xs="18">
      <a-row align="middle" justify="center">
        <a-tabs :activeKey="activeKey" type="card" @change="handleTabChange">
          <!-- <a-tab-pane v-for="item in 20" :key="item.toString()" :tab="'Tab' + item"></a-tab-pane> -->
          <a-tab-pane v-for="item in props.tabData" :key="item.id" :tab="item.name"></a-tab-pane>
        </a-tabs>
      </a-row>
    </a-col>
    <a-col :xl="2" :lg="2" :md="2" :sm="3" :xs="6" style="height: 40px">
      <a-button type="primary" size="middle">更多</a-button>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { LabelItem } from '@/types/label/label';
import { PropType, ref } from 'vue';

const props = defineProps({
  selectKey: {
    required: true,
    type: Number,
  },
  tabData: {
    required: true,
    type: Array as PropType<LabelItem[]>,
  },
});
const activeKey = ref<number>(props.selectKey);

const emit = defineEmits(['tab-change']);
const handleTabChange = (key: any) => {
  emit('tab-change', key);
  activeKey.value = key;
};
</script>
<style scoped></style>
