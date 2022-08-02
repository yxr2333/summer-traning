<template>
  <div>
    <img src="src/assets/vue.svg" alt="vue" />
    <div>{{ title }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const title = ref('Hello,World');
</script>

<style scoped></style>
