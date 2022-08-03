<template>
  <HeaderNavBar class="my-navbar" />
  <a-row class="home-content">
    <a-col :span="17" class="content-left">
      <!--Tab栏部分-->
      <a-row>
        <label-list class="content-left-label-list" />
      </a-row>
      <!--标题加选择器部分-->
      <a-row>
        <my-web-page-header
          :header-title="title"
          :radio-data="radioData"
          :radio-val="radioVal"
          :onRadioChange="handleRadioChange"
        />
      </a-row>
      <div style="margin-bottom: 18px"></div>
      <!--内容卡片区-->
      <a-row
        v-for="i in 5"
        :key="i"
        style="margin-bottom: 18px; margin-left: -8px; margin-right: -8px"
      >
        <a-col
          v-for="j in 3"
          :key="j"
          :span="8"
          style="padding-right: 8px; padding-left: 8px"
        >
          <a-card hoverable>
            <template #actions>
              <setting-outlined key="setting" />
              <edit-outlined key="edit" />
              <ellipsis-outlined key="ellipsis" />
            </template>
            <a-card-meta>
              <template #avatar>
                <a-avatar
                  :size="80"
                  src="https://s2.loli.net/2022/08/03/rcKEdlYtSqsNDkh.png"
                />
              </template>
              <template #title>Title</template>
              <template #description>Description</template>
            </a-card-meta>
            <div>
              <a-tag color="success">编程</a-tag>
              <a-tag>知识</a-tag>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </a-col>
    <!--右边部分-->
    <a-col :span="6" class="content-right">
      <a-row style="margin-bottom: 18px">
        <a-card hoverable>
          <a-card-meta>
            <template #title>✨ 欢迎加入我们的知识星球</template>
            <template #description>
              一个氛围超好的编程学习圈子，领资料、免费答疑、求职指南、简历修改、独家经验、专属直播(点击了解详情)
            </template>
          </a-card-meta>
        </a-card>
      </a-row>
      <!--站点描述-->
      <a-row style="margin-bottom: 18px">
        <a-card hoverable style="width: 100%">
          <template #cover>
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          </template>
          <template #actions>
            <setting-outlined key="setting" />
            <edit-outlined key="edit" />
            <ellipsis-outlined key="ellipsis" />
          </template>
          <a-card-meta title="Card title" description="This is the description">
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-card-meta>
        </a-card>
      </a-row>
      <!--排行卡片-->
      <a-row style="margin-bottom: 18px">
        <a-card hoverable style="width: 100%">
          <template #title>本周排行</template>
          <template #extra>
            <a>更多</a>
          </template>
          <a-card-meta>
            <template #description>
              <a-empty />
            </template>
          </a-card-meta>
        </a-card>
      </a-row>
      <!--外部链接-->
      <a-row style="margin-bottom: 18px">
        <a-card hoverable style="width: 100%">
          <a-card-meta>
            <template #avatar>
              <a-image
                style="width: 64px"
                src="https://s2.loli.net/2022/08/03/Rz5wd2IrVKk36po.jpg"
              />
            </template>
            <template #title>三峡大学</template>
            <template #description>
              计算机与信息学院。学院下设计算机软件系、计算机工程系、计算机应用系、通信工程系、信息管理系、计算机与信息技术实验中心6个教学机构。
            </template>
          </a-card-meta>
        </a-card>
      </a-row>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import LabelList from '@/components/labelList.vue';
import MyWebPageHeader from '@/components/myWebPageHeader.vue';
import HeaderNavBar from '@/components/navbar/HeaderNavBar.vue';
import { PageHeaderRadioItem } from '@/types';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import { reactive, ref } from 'vue';
const radioVal = ref<number | string>('a');
const title = ref('你好');
const radioData = reactive<PageHeaderRadioItem[]>([
  {
    title: '推荐',
    value: 'a',
  },
  {
    title: '最新',
    value: 'b',
  },
  {
    title: '精选',
    value: 'c',
  },
]);
const handleRadioChange = (val: string | number) => {
  radioVal.value = val;
};
</script>
<style scoped lang="less">
.my-navbar {
  position: sticky;
  top: 0px;
  height: 80px;
  z-index: 9999;
}
.home-content {
  background-color: #f0f2f5;
  min-height: 100vh;
  z-index: 10;
  .content-left {
    margin: 24px;
    .content-left-label-list {
      width: 100%;
    }
  }
  .content-right {
    margin: 24px auto;
  }
}
</style>
