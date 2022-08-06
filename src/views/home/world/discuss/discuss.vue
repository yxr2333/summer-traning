<template>
  <common-page-header
    :title="header.title"
    :content="header.content"
    :extra-text="header.extra"
    :icon="header.icon"
  />
  <a-row style="margin-top: 18px">
    <a-card title="历史消息" :bordered="false" style="width: 100%">
      <div class="history-container">
        <div v-for="item in 3" :key="item">
          <a-list
            class="comment-list"
            :header="`${data.length} replies`"
            item-layout="horizontal"
            :data-source="data"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <a-comment :author="item.author" :avatar="item.avatar">
                  <template #actions>
                    <span v-for="(action, index) in item.actions" :key="index">
                      {{ action }}
                    </span>
                  </template>
                  <template #content>
                    <p>
                      {{ item.content }}
                    </p>
                  </template>
                  <template #datetime>
                    <a-tooltip
                      :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')"
                    >
                      <span>{{ item.datetime.fromNow() }}</span>
                    </a-tooltip>
                  </template>
                </a-comment>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>
      <a-comment>
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
          <a-form-item>
            <a-textarea
              v-model:value="value"
              :rows="4"
              :showCount="true"
              :maxlength="200"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              html-type="submit"
              :loading="submitting"
              type="primary"
              @click="handleSubmit"
            >
              发送
            </a-button>
          </a-form-item>
        </template>
      </a-comment>
    </a-card>
  </a-row>
</template>

<script lang="ts" setup>
import CommonPageHeader from '@/components/worldContent/commonPageHeader.vue';
import { ref, defineComponent } from 'vue';
import { WorldPageHeaderItem } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { message } from 'ant-design-vue';
dayjs.extend(relativeTime);
const header = ref<WorldPageHeaderItem>({
  title: '讨论区',
  content: '欢迎实时交流，探讨问题，共同进步！',
  extra: null,
  icon: null,
});
const data = ref([
  {
    actions: ['Reply to'],
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    datetime: dayjs().subtract(1, 'days'),
  },
  {
    actions: ['Reply to'],
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/random',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    datetime: dayjs().subtract(2, 'days'),
  },
]);
const value = ref<string>('');
const submitting = ref<boolean>(false);
const handleSubmit = () => {
  submitting.value = true;
  setTimeout(() => {
    message.success('评论成功');
    submitting.value = false;
  }, 1500);
};
</script>

<style scoped lang="less">
.history-container {
  max-height: 380px;
  overflow: scroll;
  margin-bottom: 12px;
}
</style>
