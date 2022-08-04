<template>
  <a-row
    v-for="(item, index) in cardData"
    :key="index"
    style="margin-bottom: 18px; margin-left: -8px; margin-right: -8px"
  >
    <a-col
      v-for="(data, j) in item"
      :key="j"
      :span="8"
      style="padding-right: 8px; padding-left: 8px"
    >
      <a-card hoverable>
        <template #actions>
          <setting-outlined key="setting" />
          <edit-outlined key="edit" />
          <ellipsis-outlined key="ellipsis" />
        </template>
        <a-card-meta>
          <template #avatar>
            <a-avatar :size="80" :src="data.iconUrl" />
          </template>
          <template #title>{{ data.title }}</template>
          <template #description>{{ data.desc }}</template>
        </a-card-meta>
        <div>
          <a-tag color="success">编程</a-tag>
          <a-tag>知识</a-tag>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { HomePageCardItem } from '@/types';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';

defineProps({
  cardData: {
    required: true,
    type: Array as PropType<HomePageCardItem[][]>,
  },
});
</script>

<style scoped></style>
