<template>
  <a-col
    v-for="(item, index) in 24"
    :key="index"
    style="margin-bottom: 10px"
    :xl="8"
    :lg="8"
    :md="24"
    :sm="24"
    :xs="24"
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
import CardItem from '@/components/cardItem.vue';
</script>

<style scoped></style>
