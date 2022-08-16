<template>
  <div class="to-top-wrapper">
    <a-back-top :visibility-height="0" class="to-top" />
  </div>
  <div class="my-navbar">
    <HeaderNavBar />
  </div>
  <router-view v-slot="{ Component }">
    <!--    <keep-alive>-->
    <component :is="Component" />
    <!--    </keep-alive>-->
  </router-view>
</template>

<script lang="ts" setup>
import { getPageCardData } from '@/api/common';
import HeaderNavBar from '@/components/navbar/HeaderNavBar.vue';
import { HomePageCardItem } from '@/types';
import { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';

const cardData = ref<HomePageCardItem[][]>([]);
onMounted(() => {
  console.log(1);
  getPageCardData().then((resp: AxiosResponse<HomePageCardItem[]>) => {
    if (resp) {
      const { data } = resp;
      let n = 3;
      let lineNum = data.length % n === 0 ? data.length / n : Math.floor(data.length / n + 1);
      for (let i = 0; i < lineNum; i++) {
        let temp = data.slice(i * n, i * n + n);

        cardData.value.push(JSON.parse(JSON.stringify(temp)));
      }
    }
  });
});
</script>
<style scoped lang="less">
.my-navbar {
  position: sticky;
  top: 0;
  height: 80px;
  z-index: 9999;
}
</style>
