<template>
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';

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

<style scoped></style>
