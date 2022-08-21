<template>
  <a-modal
    :visible="isVisible"
    title="写评论"
    okText="确认"
    cancelText="取消"
    @ok="handleConfirm"
    @cancel="isVisible = false"
  >
    <a-form>
      <a-form-item label="评分">
        <a-rate v-model:value="formState.score" />
      </a-form-item>
      <a-form-item label="评论内容">
        <a-input v-model:value="formState.content" />
      </a-form-item>
    </a-form>
  </a-modal>
  <a-card title="评论" style="margin-top: 20px">
    <template #extra>
      <a-button type="primary" @click="handleWriteComment">
        <template #icon>
          <search-outlined />
        </template>
        写评论
      </a-button>
    </template>
    <a-list item-layout="horizontal" :data-source="data" v-if="data.length !== 0">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.content">
            <template #title>
              <a href="https://www.antdv.com/">{{ item.publishUser.username }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="item.publishUser.avatar" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
    <a-empty v-else description="暂无数据..." />
  </a-card>
</template>
<script lang="ts" setup>
import { publishComment } from '@/api/comment/index';
import { findResourceCommentsById } from '@/api/resource';
import { useUserInfoStore } from '@/store';
import { PublishCommentParams } from '@/types/comment';
import { SearchOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { onMounted, PropType, ref } from 'vue';
const userStore = useUserInfoStore();
const props = defineProps({
  propResourceId: {
    required: true,
    type: Number as PropType<number | null>,
  },
});
const resourceId = ref(props.propResourceId);
interface UserCommentInfo {
  uid: number;
  username: string;
  avatar: string;
}
interface DataItem {
  id: number;
  content: string;
  publishTime: string;
  publishUser: UserCommentInfo;
}
const formState = ref({
  score: 3 as number | null,
  content: null as string | null,
});

const data = ref<DataItem[]>([]);
const isVisible = ref(false);
const handleWriteComment = () => {
  isVisible.value = true;
};
const handleConfirm = () => {
  if (formState.value.content && formState.value.content !== '') {
    // TODO: 调用发布评论接口
    const params: PublishCommentParams = {
      content: formState.value.content,
      publishUser: userStore.userInfo.uid?.toString() as string,
      resourceId: resourceId.value?.toString() as string,
    };
    publishComment(params).then((res) => {
      if (res) {
        // message.success('评论成功');
        loadData();
      }
      isVisible.value = false;
    });
  } else {
    message.error('请正确输入评论内容');
  }
};
const loadData = () => {
  if (resourceId.value) {
    findResourceCommentsById(resourceId.value).then((res) => {
      if (res) {
        data.value = res.data;
      }
    });
  }
};
onMounted(() => {
  loadData();
});
</script>
