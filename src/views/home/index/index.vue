<template>
  <a-row class="home-content">
    <a-col :xl="18" :lg="18" :md="24" :sm="24" :xs="24" class="content-left">
      <!--Tab栏部分-->
      <a-row>
        <label-list
          :tab-data="tabData"
          class="content-left-label-list"
          :select-key="selectLabel"
          @tab-change="handleTabChange"
        />
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
      <a-spin tip="加载中..." :spinning="isLoading" size="large">
        <card-list :card-data="cardData" v-if="cardData.length !== 0" />
        <a-empty v-else description="暂无数据"></a-empty>
      </a-spin>
    </a-col>
    <!--右边部分-->
    <a-col :xl="6" :lg="6" :md="24" :sm="24" :xs="24" class="content-right">
      <a-row style="margin-bottom: 18px">
        <a-card hoverable style="width: 100%">
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
import { getResourceByLabelId } from '@/api/common/index';
import { getAllLabels } from '@/api/label/index';
import CardList from '@/components/cardList.vue';
import LabelList from '@/components/labelList.vue';
import MyWebPageHeader from '@/components/myWebPageHeader.vue';
import { HomePageCardItem, PageHeaderRadioItem } from '@/types';
import { LabelItem } from '@/types/label/label';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { onMounted, reactive, ref } from 'vue';
const selectLabel = ref(1);
const radioVal = ref<number | string>('a');
const title = ref('你好');
const tabData = ref<LabelItem[]>([]);
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
const cardData = ref<HomePageCardItem[][]>([]);
const isLoading = ref(false);
const handleRadioChange = (val: string | number) => {
  radioVal.value = val;
};
/**
 * 顶部TAB标签切换的回调
 * @param activeKey 当前选中的标签的id值
 */
const handleTabChange = (activeKey: number) => {
  selectLabel.value = activeKey;
  // 切换下方的标题
  tabData.value.forEach((item) => {
    if (item.id === activeKey && item.name) {
      title.value = item.name;
    }
  });
  loadCardData();
};

const loadCardData = () => {
  isLoading.value = true;
  getResourceByLabelId(selectLabel.value).then((res) => {
    console.log(res);
    if (res) {
      const { data } = res.data;
      cardData.value.length = 0;
      let n = 3;
      let lineNum = data.length % n === 0 ? data.length / n : Math.floor(data.length / n + 1);
      for (let i = 0; i < lineNum; i++) {
        let temp = data.slice(i * n, (i + 1) * n);
        cardData.value.push(JSON.parse(JSON.stringify(temp)));
      }
    }
  });
  setTimeout(() => {
    isLoading.value = false;
  }, 200);
};

onMounted(() => {
  loadCardData();
  getAllLabels().then((resp) => {
    if (resp) {
      tabData.value = resp.data;
      title.value = tabData.value[0].name as string;
    }
  });
});
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
  //padding: 24px 0 24px 24px;
  //overflow: hidden;
  .content-left {
    padding: 12px;
    .content-left-label-list {
      width: 100%;
    }
  }
  .content-right {
    width: 100%;
    padding: 12px;
  }
}
</style>
