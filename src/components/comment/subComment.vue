<template>
  <a-comment>
    <template #avatar>
      <a-avatar :src="userStore.userInfo.avatar" alt="logo" />
    </template>
    <template #content>
      <a-form-item>
        <a-textarea v-model:value="inputValue" :rows="4" :showCount="true" :maxlength="200" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
          发送
        </a-button>
      </a-form-item>
    </template>
  </a-comment>
</template>

<script lang="ts" setup>
import { publishCommentInPlatform } from '@/api/comment/index';
import { useUserInfoStore } from '@/store';
import { message } from 'ant-design-vue';
import { ref } from 'vue';
const userStore = useUserInfoStore();
const inputValue = ref<string>('');
const submitting = ref<boolean>(false);
const emits = defineEmits(['load-data']);
const handleSubmit = () => {
  submitting.value = true;
  if (inputValue.value === '') {
    message.error('请输入评论内容');
    submitting.value = false;
    return;
  }
  let data = {
    content: inputValue.value,
    publishUser: userStore.userInfo.uid,
  };
  publishCommentInPlatform(data).then((res) => {
    if (res) {
      inputValue.value = '';
      setTimeout(() => {
        submitting.value = false;
      }, 1000);
      emits('load-data');
    }
  });
};
</script>

<style scoped></style>
