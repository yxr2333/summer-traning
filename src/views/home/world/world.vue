<template>
  <a-layout>
    <!--左边菜单栏-->
    <a-layout-sider
      ref="menuRef"
      class="left-sider"
      collapsible
      theme="light"
      @collapse="handleCollapse"
    >
      <left-menu :menu-items="menuItems" />
    </a-layout-sider>
    <a-layout ref="worldContent" class="content">
      <a-layout-content>
        <!--主体内容部分-->
        <router-view v-slot="{ Component }">
          <!--          <keep-alive>-->
          <component :is="Component" />
          <!--          </keep-alive>-->
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import LeftMenu from '@/components/leftMenu.vue';

import { LeftMenuItem } from '@/types';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const worldContent = ref();
const router = useRouter();
const menuRef = ref();
/**
 * 控制菜单栏收缩时,主体内容部分的marginLeft
 * @param collapsed
 * @param type
 */
const handleCollapse = (collapsed: any, type: any) => {
  // console.log(worldContent.value);
  console.log(collapsed);
  worldContent.value.$el.style.marginLeft = collapsed ? '80px' : '200px';
};
/**
 * 调用时机为首次挂载
 * 以及每次从缓存中被重新插入的时候
 */
onMounted(() => {
  // const width = document.body.clientWidth;
  // if (width <= 450) {
  //   menuRef.value.$el.style.display = 'none';
  //   worldContent.value.$el.style.marginLeft = 'auto';
  // }
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
