<template>
  <a-card title="相似资源">
    <a-list split itemLayout="vertical">
      <a-list-item v-for="item in cardData" :key="item.id">
        <a-card hoverable>
          <template #actions>
            <setting-outlined key="setting" @click="handleSettingClick" />
            <edit-outlined key="edit" />
            <ellipsis-outlined key="ellipsis" />
          </template>
          <div @click="handleClick">
            <a-card-meta :title="item.name" :description="item.description">
              <template #avatar>
                <a-avatar :size="60" shape="square" :src="item.icon" />
              </template>
            </a-card-meta>
            <div style="margin-top: 25px; text-align: right">
              <a-tag
                v-for="(tag, index) in item.labels"
                :key="tag.id"
                :color="index === 0 ? 'success' : 'default'"
              >
                {{ tag.name }}
              </a-tag>
            </div>
          </div>
        </a-card>
      </a-list-item>
    </a-list>
  </a-card>
</template>
<script lang="ts" setup>
import { findResourcesByLabelIdIn } from '@/api/resource';
import { ResourceItem } from '@/types/resource';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { onMounted, PropType, ref } from 'vue';
const props = defineProps({
  propResourceId: {
    required: true,
    type: Number as PropType<number | null>,
  },
  propLabelId: {
    requred: true,
    type: Number as PropType<number | null>,
  },
});
const resourceId = ref(props.propResourceId);
const labelId = ref(props.propLabelId);
const cardData = ref<ResourceItem[]>();
onMounted(() => {
  if (resourceId.value && labelId.value) {
    findResourcesByLabelIdIn(labelId.value, 1, 3).then((res) => {
      if (res) {
        cardData.value = res.data.data;
      }
    });
  }
});
const handleClick = () => {
  message.success('ok');
};

const handleSettingClick = (e: Event) => {
  e.preventDefault();
  message.success('111');
};
</script>
