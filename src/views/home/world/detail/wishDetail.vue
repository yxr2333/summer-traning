<template>
  <a-row class="detail-wrapper">
    <a-col :span="16" class="content-left">
      <wish-detail-card style="margin-bottom: 20px" />
      <a-card title="满足列表">
        <template #extra>
          <a-button type="primary">
            <template #icon>
              <smile-outlined />
            </template>
            帮忙完成
          </a-button>
        </template>
        <a-empty description="暂无数据" />
      </a-card>
    </a-col>
    <a-col :span="6" class="content-right">
      <a-card title="相似心愿">
        <a-list split itemLayout="vertical">
          <a-list-item v-for="item in 3" :key="item">
            <a-card>
              <a-card-meta title="Card title" description="This is the description">
                <template #avatar>
                  <a-avatar src="https://joeschmoe.io/api/v1/random" />
                </template>
              </a-card-meta>
              <div style="margin-top: 15px; text-align: right">
                <a-tag color="success">Spring</a-tag>
                <a-tag color="default">Boot</a-tag>
              </div>
            </a-card>
          </a-list-item>
        </a-list>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import wishDetailCard from '@/components/wish/wishDetailCard.vue';
import { SmileOutlined } from '@ant-design/icons-vue';
import { onMounted, toRaw } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

onMounted(() => {
  const id = toRaw(route.query).id;
  console.log(id);
});
</script>
<style lang="less" scoped>
.detail-wrapper {
  background-color: #f0f2f5;
  min-width: calc(100vh - 24px);
  min-height: calc(100vh - 110px);
  .content-left {
    margin: 24px 5px 24px 24px;
  }
  .content-right {
    margin: 24px 24px 24px 24px;
  }
}
</style>
