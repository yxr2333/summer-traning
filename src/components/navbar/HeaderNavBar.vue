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
        <top-menu :menu-current="current" class="menu-part" />
      </a-col>
      <a-col :span="10" class="search-part">
        <a-input-search
          v-model:value="searchData"
          class="search-part"
          placeholder="input search text"
          enter-button
          @search="onSearch"
        />
      </a-col>
      <a-col :span="2" class="own-part">
        <a-button type="primary">推荐</a-button>
      </a-col>
      <a-col :span="2" class="own-part" style="justify-content: center">
        <a-avatar :size="40">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import WebBrand from '@/components/navbar/WebBrand.vue';
import TopMenu from '@/components/navbar/TopMenu.vue';
import { UserOutlined } from '@ant-design/icons-vue';

const current = ref<string[]>(['mail']);
const searchData = ref<string | null>(null);
const onSearch = () => {
  console.log(searchData.value);
};
</script>

<style scoped lang="less">
.header-wrapper {
  background-color: #fff;

  .search-part {
    display: flex;
    align-items: center;
    justify-content: center;
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
