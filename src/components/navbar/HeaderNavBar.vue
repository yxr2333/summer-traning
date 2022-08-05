<template>
  <div class="header-wrapper">
    <a-row
      style="height: inherit"
      type="flex"
      justify="space-around"
      align="middle"
    >
      <a-col :span="3" class="brand-part">
        <web-brand class="brand-part" />
      </a-col>
      <a-col :span="6">
        <top-menu
          :menu-current="current"
          class="menu-part"
          @menu-select="handleMenuSelect"
        />
      </a-col>
      <a-col :span="9" class="search-part">
        <a-input-search
          v-model:value="searchData"
          size="large"
          class="search-part"
          placeholder="输入数据进行搜索...."
          enter-button
          @search="onSearch"
        />
      </a-col>
      <a-col :span="2" class="own-part">
        <a-button type="primary">推荐</a-button>
      </a-col>
      <a-col :span="2" class="own-part" style="justify-content: center">
        <a-avatar :size="40" style="cursor: pointer">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import TopMenu from '@/components/navbar/TopMenu.vue';
import WebBrand from '@/components/navbar/WebBrand.vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/store';

const menuStore = useMenuStore();
menuStore.$subscribe((mutation, state) => {
  console.log('$subscribe');
  current.value.pop();
  current.value.push(state.nowMenu);
  console.log('current', current.value);
  // router.push({ name: current.value.at(0) });
});
const router = useRouter();
const current = ref<string[]>([menuStore.nowMenu]); // 从pina中读取当前选中的菜单

const searchData = ref<string | null>(null);
const onSearch = () => {
  console.log(searchData.value);
};
const handleMenuSelect = (key: string) => {
  // current.value.pop();
  // current.value.push(key);
  router.push({ name: key });
};
</script>

<style scoped lang="less">
.header-wrapper {
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgb(0 21 41 / 12%);
  .search-part {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .brand-part {
    cursor: pointer;
  }
  .menu-part {
    width: 100%;
  }
  .own-part {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
