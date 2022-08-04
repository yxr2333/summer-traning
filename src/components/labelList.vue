<template>
  <a-row type="flex" justify="space-around" align="middle">
    <a-col :span="22">
      <a-tabs :activeKey="activeKey" type="card">
        <a-tab-pane
          v-for="item in 20"
          :key="item"
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

const activeKey = ref(1);
</script>
<style scoped></style>
