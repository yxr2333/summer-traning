<template>
  <a-col
    v-for="(item, index) in 24"
    :key="index"
    style="margin-bottom: 10px"
    :span="8"
  >
    <card-item
      :tags="['编程']"
      title="SpringBoot"
      desc="SpringBoot Content"
      time="12小时"
    ></card-item>
  </a-col>
</template>

<script setup lang="ts">
import cardItem from '@/components/cardItem.vue';
</script>

<style scoped></style>
