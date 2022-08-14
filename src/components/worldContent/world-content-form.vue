<template>
  <a-form layout="horizontal">
    <a-row :gutter="24" align="middle">
      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <a-form-item style="margin: 0">
          <template #label>内容</template>
          <a-input />
        </a-form-item>
      </a-col>
      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <a-form-item style="margin: 0">
          <template #label>标签</template>
          <a-input-search />
        </a-form-item>
      </a-col>
      <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24" style="margin-top: 10px">
        <a-row justify="center" align="center">
          <a-button type="primary" style="margin-right: 5px">提交</a-button>
          <a-button type="default">重置</a-button>
        </a-row>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup></script>

<style scoped></style>
