<template>
  <div>
    <a-layout>
      <!--左边菜单栏-->
      <a-layout-sider
        ref="settingMenuRef"
        class="left-sider"
        collapsible
        theme="light"
        @collapse="handleCollapse"
      >
        <left-menu :menu-items="menuItems" :prop-keys="selectedKeys" />
      </a-layout-sider>
      <a-layout ref="settingContent" class="content">
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
  </div>
</template>

<script lang="ts" setup>
import LeftMenu from '@/components/leftMenu.vue';

import { useSettingMenuStore } from '@/store';
import { LeftMenuItem } from '@/types';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const settingMenuStore = useSettingMenuStore();
const settingContent = ref();
const router = useRouter();
const settingMenuRef = ref();
const selectedKeys = ref([settingMenuStore.nowSettingMenu]);
/**
 * 控制菜单栏收缩时,主体内容部分的marginLeft
 * @param collapsed
 * @param type
 */
const handleCollapse = (collapsed: any, type: any) => {
  console.log(collapsed);
  settingContent.value.$el.style.marginLeft = collapsed ? '80px' : '200px';
};
/**
 * 调用时机为首次挂载
 * 以及每次从缓存中被重新插入的时候
 */
onMounted(() => {
  const width = document.body.clientWidth;
  if (width <= 450) {
    settingMenuRef.value.$el.style.display = 'none';
    settingContent.value.$el.style.marginLeft = 'auto';
  }
  // router.replace({ name: 'settingData' });
});

const menuItems = ref<LeftMenuItem[]>([
  {
    icon: 'SolutionOutlined',
    title: '个人资料',
    key: 'settingData',
  },
  {
    icon: 'HddOutlined',
    title: '我的收藏',
    key: 'settingCollect',
  },
  {
    icon: 'LikeOutlined',
    title: '推荐记录',
    key: 'settingLike',
  },
  {
    icon: 'MessageOutlined',
    title: '消息通知',
    key: 'settingNotification',
  },
  {
    icon: 'HeartOutlined',
    title: '我的心愿',
    key: 'settingWish',
  },
  {
    icon: 'PlusOutlined',
    title: '邀请好友',
    key: 'settingInvite',
  },
  {
    icon: 'MenuOutlined',
    title: '积分记录',
    key: 'settingScore',
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
