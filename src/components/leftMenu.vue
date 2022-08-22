<template>
  <!-- 侧边栏 -->
  <a-menu
    v-model:selected-keys="selectedKeys"
    class="left-menu"
    mode="inline"
    @select="handleMenuSelect"
  >
    <a-menu-item v-for="item in menuData" :key="item.key">
      <template #icon>
        <Icon :icon="item.icon" />
      </template>
      {{ item.title }}
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import { useMenuStore, useSettingMenuStore } from '@/store';
import { LeftMenuItem } from '@/types';
import { Icon } from '@/utils/icon';
import { PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
const settingStore = useSettingMenuStore();
const menuStore = useMenuStore();
const props = defineProps({
  menuItems: {
    type: Array as PropType<LeftMenuItem[]>,
    required: true,
  },
  propKeys: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
const router = useRouter();
const selectedKeys = ref(props.propKeys);
const menuData = ref<LeftMenuItem[]>(props.menuItems);
const handleMenuSelect = (param: any) => {
  const { key } = param;
  router.push({ name: key });
  selectedKeys.value.pop();
  selectedKeys.value.push(key);
};
settingStore.$subscribe((mutation, state) => {
  console.log('state', state.nowSettingMenu);

  selectedKeys.value.pop();
  selectedKeys.value.push(state.nowSettingMenu);
});
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/setting')) {
    console.log(to);
    settingStore.nowSettingMenu = to.name as string;
    menuStore.nowMenu = to.meta.menu as string;
    console.log('menuStore.nowMenu', menuStore.nowMenu);
  }
  next();
});
</script>

<style scoped lang="less">
.left-menu {
  height: @menu-content-height;
}
</style>
