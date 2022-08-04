<template>
  <a-row type="flex" justify="space-around" align="middle">
    <a-col :span="22">
      <a-tabs :activeKey="activeKey" type="card" @change="handleTabChange">
        <a-tab-pane
          v-for="item in 20"
          :key="item.toString()"
          :tab="'Tab' + item"
        ></a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col :span="2" style="height: 40px">
      <a-button type="primary" size="middle">更多</a-button>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  selectKey: {
    required: true,
    type: String,
  },
});
const activeKey = ref<string>(props.selectKey);

const emit = defineEmits(['tab-change']);
const handleTabChange = (key: any) => {
  emit('tab-change', key);
  activeKey.value = key;
};
</script>
<style scoped></style>
