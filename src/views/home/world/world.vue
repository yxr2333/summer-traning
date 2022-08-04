<template>
  <a-layout>
    <a-layout-sider collapsible theme="light">
      <left-menu />
    </a-layout-sider>
    <a-layout style="padding: 15px">
      <a-layout-content>
        <common-page-header title="测试" extra-text="更多" content="测试内容" />
        <a-card style="margin-top: 18px">
          <a-form layout="horizontal">
            <a-row :gutter="24">
              <a-col :span="8">
                <a-form-item>
                  <template #label>内容</template>
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item>
                  <template #label>标签</template>
                  <a-input-search />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-row justify="end" align="center">
                  <a-button type="primary">提交</a-button>
                  <a-button type="default">重置</a-button>
                </a-row>
              </a-col>
            </a-row>
          </a-form>
        </a-card>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts"></script>

<script>
import LeftMenu from '@/components/leftMenu.vue';
import CommonPageHeader from '@/components/commonPageHeader.vue';

export default {
  components: { CommonPageHeader, LeftMenu },
};
</script>
<style scoped></style>
