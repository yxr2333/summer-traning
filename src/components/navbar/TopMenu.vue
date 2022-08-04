<template>
  <div>
    <a-menu
      v-model:selected-keys="nowSelect"
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
import { PropType, ref } from 'vue';
import { useMenuStore } from '@/store/index';

import {
  AppstoreOutlined,
  HomeOutlined,
  TabletOutlined,
} from '@ant-design/icons-vue';

const menuStore = useMenuStore();
const props = defineProps({
  menuCurrent: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
const emit = defineEmits(['menu-select']);
const handleMenuClick = (data: any) => {
  emit('menu-select', data.key);
  nowSelect.value.splice(0);
  nowSelect.value.push(data);
  menuStore.nowMenu = data.key;
};
const nowSelect = ref(props.menuCurrent);
</script>

<style scoped></style>
