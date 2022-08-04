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
      <a-col :span="5">
        <top-menu
          :menu-current="current"
          class="menu-part"
          @menu-select="handleMenuSelect"
        />
      </a-col>
      <a-col :span="10" class="search-part">
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
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const current = ref<string[]>(['index']);
const searchData = ref<string | null>(null);
const onSearch = () => {
  console.log(searchData.value);
};
const handleMenuSelect = (key: string) => {
  current.value.splice(0);
  current.value.push(key);
  console.log('current', current);
  router.push({ name: current.value.at(0) });
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
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .own-part {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
