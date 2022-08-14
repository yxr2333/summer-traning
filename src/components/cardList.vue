<template>
  <a-row
    v-for="(item, index) in cardData"
    :key="index"
    :gutter="24"
    style="margin-bottom: 18px; margin-left: -8px; margin-right: -8px"
  >
    <a-col
      v-for="(data, j) in item"
      :key="j"
      :xl="8"
      :lg="8"
      :md="24"
      :sm="24"
      :xs="24"
      style="margin-bottom: 10px"
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
import { onMounted, PropType } from 'vue';
import { HomePageCardItem } from '@/types';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';

const props = defineProps({
  cardData: {
    required: true,
    type: Array as PropType<HomePageCardItem[][]>,
  },
});
onMounted(() => {
  console.log(props.cardData);
});
</script>

<style scoped></style>
