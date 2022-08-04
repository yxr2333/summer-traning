<template>
  <div>
    <a-menu
      v-model:selected-keys="$props.menuCurrent"
      class="top-menu"
      mode="horizontal"
      @click="handleMenuClick"
    >
      <a-menu-item key="index" title="主页">
        <template #icon>
          <home-outlined />
        </template>
        主页
      </a-menu-item>
      <a-menu-item key="resource" title="资源">
        <template #icon>
          <appstore-outlined />
        </template>
        资源
      </a-menu-item>
      <a-menu-item key="world" title="世界">
        <template #icon>
          <tablet-outlined />
        </template>
        世界
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import {
  AppstoreOutlined,
  HomeOutlined,
  TabletOutlined,
} from '@ant-design/icons-vue';

defineProps({
  menuCurrent: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
const emit = defineEmits(['menu-select']);
const handleMenuClick = (data: any) => {
  emit('menu-select', data.key);
};
</script>

<style scoped></style>
