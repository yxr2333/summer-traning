<template>
  <div class="card-wrapper">
    <a-card title="资源详情">
      <template #actions>
        <div>
          <setting-outlined key="setting" />
          分享
        </div>
        <div>
          <edit-outlined key="edit" />
          海搜
        </div>
        <div>
          <ellipsis-outlined key="ellipsis" />
          举报
        </div>
      </template>
      <div style="text-align: center">
        <a-image :width="100" :src="state?.icon"></a-image>
        <div class="content-name">{{ state?.name }}</div>
        <div class="content-tags">
          <a-tag color="#cd201f" style="cursor: pointer" @click="handleCollect">
            <template #icon>
              <heart-outlined />
            </template>
            {{ state?.collect }}
          </a-tag>
          <a-tag
            color="#3b5999"
            @click="handleShareLink(state?.link as string)"
            style="cursor: pointer"
          >
            <template #icon>
              <share-alt-outlined />
            </template>
            分享
          </a-tag>
        </div>
        <div>{{ state?.description }}</div>
        <div class="content-labels">
          <a-tag
            :color="index === 0 ? 'success' : 'default'"
            v-for="(item, index) in state?.labels"
            :key="item.id"
          >
            {{ item.name }}
          </a-tag>
        </div>
        <a-divider />
        <a-descriptions>
          <a-descriptions-item label="链接" :span="3">
            <a-typography-paragraph>
              <a-typography-link
                :href="state?.link"
                :copyable="{
                  text: state?.link,
                  tooltip: true,
                  onCopy: onCopy,
                }"
              >
                {{ state?.link }}
              </a-typography-link>
            </a-typography-paragraph>
          </a-descriptions-item>
          <a-descriptions-item label="时间" :span="3">
            {{ state?.releaseTime }}
          </a-descriptions-item>
          <a-descriptions-item label="推荐人" :span="3" :contentStyle="{ alignItems: 'center' }">
            <a-avatar :src="state?.publishUser?.avatar" />
            <span style="margin-left: 5px; font-size: 16px; font-weight: 500">
              {{ state?.publishUser?.username }}
            </span>
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { findResourceById } from '@/api/resource';
import { ResourceItem } from '@/types/resource';
import {
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
  SettingOutlined,
  ShareAltOutlined,
} from '@ant-design/icons-vue';
import { toClipboard } from '@soerenmartius/vue3-clipboard';
import { message } from 'ant-design-vue';
import { onMounted, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
  // propState: {
  //   required: true,
  //   type: Object as PropType<ResourceItem>,
  // },
  propResourceId: {
    required: true,
    type: Number as PropType<number | null>,
  },
});
const state = ref<ResourceItem>();
const router = useRouter();
const resourceId = ref<number | null>(props.propResourceId);
const handleShareLink = (link: string | undefined | null) => {
  if (link) {
    const str = '我在知识星球发现了好的资源，快来看看吧！链接：' + window.location.href;
    toClipboard(str);
    message.success('复制成功');
  } else {
    message.error('复制失败');
  }
};
const onCopy = () => {
  message.success('复制成功');
};
const handleCollect = () => {
  message.success('收藏成功');
};
onMounted(() => {
  if (resourceId.value) {
    findResourceById(resourceId.value).then((res) => {
      if (res) {
        state.value = res.data;
      }
    });
  } else {
    message.error('资源id不能为空');
    router.back();
  }
});
</script>
<style lang="less" scoped>
.card-wrapper {
  .content-name {
    margin-bottom: 8px;
    color: #000;
    font-weight: 500;
    font-size: 24px;
    letter-spacing: 1px;
  }
  .content-tags {
    margin-bottom: 24px;
    user-select: none;
  }
  .content-labels {
    margin-top: 24px;
  }
}
</style>
