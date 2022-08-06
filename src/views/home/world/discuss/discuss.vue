<template>
  <common-page-header
    :title="header.title"
    :content="header.content"
    :extra-text="header.extra"
    :icon="header.icon"
  />
  <a-row style="margin-top: 18px">
    <a-card title="历史消息" :bordered="false" style="width: 100%">
      <!--历史讨论列表部分-->
      <div class="history-container">
        <comment-list />
      </div>
      <!--发表评论部分-->
      <sub-comment />
    </a-card>
  </a-row>
</template>

<script lang="ts" setup>
import CommonPageHeader from '@/components/worldContent/commonPageHeader.vue';
import { ref } from 'vue';
import { WorldPageHeaderItem } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SubComment from '@/components/comment/subComment.vue';
import CommentList from '@/components/comment/commentList.vue';

dayjs.extend(relativeTime);
const header = ref<WorldPageHeaderItem>({
  title: '🗨︎讨论角',
  content: '欢迎实时交流，探讨问题，共同进步！',
  extra: null,
  icon: null,
});
</script>

<style scoped lang="less">
.history-container {
  max-height: 380px;
  overflow: scroll;
  margin-bottom: 12px;
}
</style>
