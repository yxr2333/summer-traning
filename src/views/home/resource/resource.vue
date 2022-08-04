<template>
  <a-layout>
    <!--菜单部分-->
    <a-layout-sider
      class="left-sider"
      collapsible
      theme="light"
      @collapse="handleSiderCollapse"
    >
      <a-menu
        id="dddddd"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        class="sider-menu"
        mode="inline"
        @click="handleClick"
      >
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>找教程</template>
          <a-menu-item-group key="g1">
            <template #icon>
              <QqOutlined />
            </template>
            <template #title>编程</template>
            <a-menu-item key="1">C语言教程</a-menu-item>
            <a-menu-item key="2">Java教程</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g2" title="数据库">
            <a-menu-item key="3">Oracle</a-menu-item>
            <a-menu-item key="4">MySQL</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <template #title>社区</template>
          <a-menu-item key="5">掘金</a-menu-item>
          <a-menu-item key="6">CSDN</a-menu-item>
          <a-sub-menu key="sub3" title="国外">
            <a-menu-item key="7">Github</a-menu-item>
            <a-menu-item key="8">StackOverFlow</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>游戏</template>
          <a-menu-item key="9">原神神</a-menu-item>
          <a-menu-item key="10">英雄联盟</a-menu-item>
          <a-menu-item key="11">CS:GO</a-menu-item>
          <a-menu-item key="12">CF</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout id="resource-content" style="margin-left: 200px; padding: 15px">
      <a-layout-content>
        <!--页头部分-->
        <common-page-header title="测试" extra-text="更多" content="测试内容" />
        <a-card style="margin-top: 20px">
          <a-form>
            <a-form-item>
              <template #label>
                <edit-outlined />
                搜索
              </template>
              <a-input-search enter-button style="max-width: 640px" />
            </a-form-item>
            <a-form-item>
              <template #label>
                <codepen-outlined />
                排序
              </template>
              <a-radio-group v-model:value="radioVal" style="max-width: 640px">
                <a-radio-button value="a">Hangzhou</a-radio-button>
                <a-radio-button value="b">Shanghai</a-radio-button>
                <a-radio-button value="c">Beijing</a-radio-button>
                <a-radio-button value="d">Chengdu</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item>
              <template #label>
                <send-outlined />
                精选
              </template>
              <a-checkbox v-model:checked="checked">只看精选</a-checkbox>
            </a-form-item>
          </a-form>
        </a-card>
        <div style="margin-top: 18px">
          <card-list :card-data="cardData" />
          <div style="display: flex; justify-content: flex-end">
            <a-pagination
              v-model:current="pageNum"
              :total="500"
              :show-size-changer="false"
            />
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { MenuProps } from 'ant-design-vue';
import CardList from '@/components/cardList.vue';

import {
  AppstoreOutlined,
  CodepenOutlined,
  EditOutlined,
  MailOutlined,
  QqOutlined,
  SendOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import { HomePageCardItem } from '@/types';
import getPageCardData from '@/api/common';
import { AxiosResponse } from 'axios';
import CommonPageHeader from '@/components/commonPageHeader.vue';

const radioVal = ref('a');
const checked = ref(false);
const selectedKeys = ref<string[]>(['1']);
const cardData = ref<HomePageCardItem[][]>([]);
const openKeys = ref<string[]>(['sub1']);
const pageNum = ref(1);
const pageSize = ref(10);
const handleClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};
const titleClick = (e: Event) => {
  console.log('titleClick', e);
};
onMounted(() => {
  getPageCardData().then((resp: AxiosResponse<HomePageCardItem[]>) => {
    if (resp) {
      const { data } = resp;
      let n = 3;
      let lineNum =
        data.length % n === 0
          ? data.length / n
          : Math.floor(data.length / n + 1);
      for (let i = 0; i < lineNum; i++) {
        let temp = data.slice(i * n, i * n + n);

        cardData.value.push(JSON.parse(JSON.stringify(temp)));
      }
    }
  });
});
// const isCollapsed = ref(false);
const handleSiderCollapse = (collapsed: any, type: any) => {
  console.log(collapsed, type);
  let content = document.getElementById('resource-content');
  if (collapsed === true) {
    content!.style.marginLeft = '80px';
  } else {
    content!.style.marginLeft = '200px';
  }
};
</script>

<style scoped lang="less">
.left-sider {
  overflow: auto;
  height: @menu-content-height;
  position: fixed;
  left: 0;
  top: 80px;
  bottom: 0;
  .sider-menu {
    height: @menu-content-height;
  }
}
</style>
