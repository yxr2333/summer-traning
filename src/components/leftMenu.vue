<template>
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
import { LeftMenuItem } from '@/types';
import { Icon } from '@/utils/icon';
import { PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
  menuItems: {
    type: Array as PropType<LeftMenuItem[]>,
    required: true,
  },
});
const router = useRouter();
// TODO: 将菜单选中项使用Pinia管理，解决返回的时候选项不一致的问题
const selectedKeys = ref(['wish']);
const menuData = ref<LeftMenuItem[]>(props.menuItems);
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
