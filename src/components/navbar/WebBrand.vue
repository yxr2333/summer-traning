<template>
  <div class="web-brand" @click="handleToHome">
    <img alt="logo" src="src/assets/vue.svg" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const handleToHome = () => {
  router.push({ name: 'homeIndex' });
};
</script>

<style scoped>
.web-brand {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 20px;
}
</style>
