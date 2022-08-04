<template>
  <a-menu
    v-model:selected-keys="selectedKeys"
    class="left-menu"
    :open-keys="openKeys"
    mode="inline"
  >
    <a-menu-item key="1">个人</a-menu-item>
    <a-menu-item key="2">设置</a-menu-item>
    <a-menu-item key="3">我的</a-menu-item>
    <a-menu-item key="4">世界</a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const selectedKeys = ref([]);
const openKeys = ref([1]);
</script>

<style scoped lang="less">
.left-menu {
  height: @menu-content-height;
}
</style>
