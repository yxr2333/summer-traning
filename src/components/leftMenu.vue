<template>
  <a-menu
    v-model:selected-keys="selectedKeys"
    class="left-menu"
    mode="inline"
    @select="handleMenuSelect"
  >
    <a-menu-item key="wish">
      <template #icon>
        <heart-outlined />
      </template>
      个人
    </a-menu-item>
    <a-menu-item key="find">
      <template #icon>
        <search-outlined />
      </template>
      找伙伴
    </a-menu-item>
    <a-menu-item key="discuss">
      <template #icon>
        <message-outlined />
      </template>
      讨论角
    </a-menu-item>
    <a-menu-item key="ranking">
      <template #icon>
        <menu-outlined />
      </template>
      激励榜
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  HeartOutlined,
  MessageOutlined,
  SearchOutlined,
  MenuOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const selectedKeys = ref(['wish']);
const handleMenuSelect = (param: any) => {
  const { key } = param;
  router.push({ name: key });
  selectedKeys.value.pop();
  selectedKeys.value.push(key);
};
</script>

<style scoped lang="less">
.left-menu {
  height: @menu-content-height;
}
</style>
