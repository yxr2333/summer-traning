<template>
  <common-page-header
    :icon="header.icon"
    :title="header.title"
    :content="header.content"
    :extra-text="header.extra"
  ></common-page-header>
  <a-row :gutter="24" style="margin-top: 20px" class="ranking-list-content">
    <a-col :span="8">
      <a-card title="总积分榜" :bordered="false" style="width: 100%">
        <template #extra>
          <a-button type="primary">
            <template #icon>
              <search-outlined />
            </template>
            我的排名
          </a-button>
        </template>
        <a-empty />
      </a-card>
    </a-col>
    <a-col :span="8">
      <a-card title="积分周榜" :bordered="false" style="width: 100%">
        <template #extra>
          <a-date-picker
            v-model:value="weekValue"
            placeholder="请选择周"
            picker="week"
          />
        </template>
        <a-empty />
      </a-card>
    </a-col>
    <a-col :span="8">
      <a-card title="积分月榜" :bordered="false" style="width: 100%">
        <template #extra>
          <a-date-picker
            v-model:value="monthValue"
            placeholder="请选择月"
            picker="month"
          />
        </template>
        <a-empty />
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import CommonPageHeader from '@/components/worldContent/commonPageHeader.vue';
import { ref } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { WorldPageHeaderItem } from '@/types';
import type { Dayjs } from 'dayjs';
const header = ref<WorldPageHeaderItem>({
  title: '🏆︎激励榜',
  content: '一起学习，获得更多积分吧！',
  extra: null,
  icon: null,
});
const weekValue = ref<Dayjs>();
const monthValue = ref<Dayjs>();
</script>

<style lang="less" scoped>
.ranking-list-content {
  margin-top: 18px;
  min-height: calc(100vh - 106px - 18px - 16px - 83px);
}
</style>
