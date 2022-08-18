<template>
  <common-page-header
    :title="header.title"
    :extra-text="header.extra"
    :content="header.content"
    :icon="header.icon"
    @btnClick="handleBtnClick"
  />
  <div class="wish-wrapper">
    <a-card style="margin-top: 18px">
      <world-content-form />
    </a-card>
    <a-row style="margin-top: 18px" :gutter="24">
      <a-col
        v-for="item in dataArray"
        :key="item.id"
        style="margin-bottom: 10px"
        :xl="8"
        :lg="8"
        :md="24"
        :sm="24"
        :xs="24"
      >
        <a-badge-ribbon
          :color="item.isFinished ? 'cyan' : 'red'"
          :text="item.isFinished ? '已完成' : '待完成'"
        >
          <card-item
            :avatar="item.user.avatar"
            :tags="item.labels"
            :title="`来自${item.user.username}的心愿`"
            :desc="item.content"
            :time="item.publishTime"
          ></card-item>
        </a-badge-ribbon>
      </a-col>
    </a-row>
    <div style="display: flex; justify-content: flex-end">
      <a-pagination v-model:current="pageNum" :total="totalNum" :show-size-changer="false" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { findWishList } from '@/api/wish';
import CardItem from '@/components/cardItem.vue';
import { WorldPageHeaderItem } from '@/types';
import { WishCardItem } from '@/types/wish';
import { onBeforeMount, ref } from 'vue';
import CommonPageHeader from '@/components/worldContent/commonPageHeader.vue';
import WorldContentForm from '@/components/worldContent/world-content-form.vue';
import { notification } from 'ant-design-vue';

const dataArray = ref<WishCardItem[]>([]);
const pageNum = ref(1);
const pageSize = ref(12);
const totalNum = ref(0);
const header = ref<WorldPageHeaderItem>({
  title: '💖心愿墙',
  content: '找到你的心愿',
  extra: '更多',
  icon: 'SearchOutlined',
});

onBeforeMount(async () => {
  const result = await findWishList(pageNum.value, pageSize.value);
  if (result) {
    totalNum.value = result.data.totalNum;
    dataArray.value = result.data.data as WishCardItem[];
  }
});

const handleBtnClick = () => {
  notification.success({
    message: '提示',
    description: '等待开发~',
  });
};
</script>

<style scoped lang="less">
.wish-wrapper {
  min-height: calc(100vh - 220px);
}
</style>
