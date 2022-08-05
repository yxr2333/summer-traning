<template>
  <a-layout>
    <a-layout-sider
      class="left-sider"
      collapsible
      theme="light"
      @collapse="handleCollapse"
    >
      <left-menu :menu-items="menuItems" />
    </a-layout-sider>
    <a-layout ref="worldContent" class="content">
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import LeftMenu from '@/components/leftMenu.vue';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { LeftMenuItem } from '@/types';
const worldContent = ref();
const router = useRouter();
const handleCollapse = (collapsed: any, type: any) => {
  // console.log(worldContent.value);
  console.log(collapsed);
  worldContent.value.$el.style.marginLeft = collapsed ? '80px' : '200px';
};
onMounted(() => {
  router.replace({ name: 'wish' });
});
const menuItems = ref<LeftMenuItem[]>([
  {
    icon: 'HeartOutlined',
    title: '心愿墙',
    key: 'wish',
  },
  {
    icon: 'SearchOutlined',
    title: '找伙伴',
    key: 'find',
  },
  {
    icon: 'MessageOutlined',
    title: '讨论角',
    key: 'discuss',
  },
  {
    icon: 'MenuOutlined',
    title: '激励榜',
    key: 'ranking',
  },
]);
</script>
<style scoped lang="less">
.left-sider {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 80px;
  bottom: 0;
}
.content {
  margin-left: 200px;
  padding: 15px;
}
</style>
