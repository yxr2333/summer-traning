<template>
  <a-layout>
    <!--菜单部分-->
    <a-layout-sider
      ref="menuRef"
      class="left-sider"
      collapsible
      theme="light"
      v-model:collapsed="isCollapsed"
      @collapse="handleSiderCollapse"
    >
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        class="sider-menu"
        mode="inline"
        @click="handleClick"
      >
        <a-sub-menu v-for="item in leftMenuData" :key="item.id">
          <template #icon>
            <Icon :icon="item.iconName" />
          </template>
          <template #title>{{ item.name }}</template>
          <a-menu-item v-for="label in item.labels" :key="label.id">{{ label.name }}</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <!--内容部分-->
    <a-layout ref="resourceContent" class="layout-wrapper">
      <a-spin size="large" tip="加载中..." :spinning="isLoading">
        <a-layout-content>
          <!--页头部分-->
          <common-page-header :title="headerTitle" extra-text="更多" :content="headerContent" />
          <a-card style="margin-top: 20px">
            <a-form>
              <a-form-item>
                <template #label>
                  <edit-outlined />
                  <span style="margin-left: 8px">搜索</span>
                </template>
                <a-input-search
                  enter-button
                  style="max-width: 640px"
                  placeholder="在本专区搜索..."
                />
              </a-form-item>
              <a-form-item>
                <template #label>
                  <codepen-outlined />
                  <span style="margin-left: 8px">排序</span>
                </template>
                <a-radio-group v-model:value="radioVal">
                  <a-radio-button value="time">时间</a-radio-button>
                  <a-radio-button value="collect">收藏</a-radio-button>
                </a-radio-group>
              </a-form-item>
              <a-form-item>
                <template #label>
                  <send-outlined />
                  <span style="margin-left: 8px">精选</span>
                </template>
                <a-checkbox v-model:checked="checked">只看精选</a-checkbox>
              </a-form-item>
            </a-form>
          </a-card>
          <div style="margin-top: 18px">
            <div>
              <card-list :card-data="cardData" v-if="cardData.length !== 0" />
              <div v-else style="width: 100%; height: 100%">
                <a-empty description="暂无数据..." />
              </div>
            </div>
            <div style="display: flex; justify-content: flex-end">
              <a-pagination
                v-model:pageSize="pageSize"
                v-model:current="pageNum"
                :total="totalNum"
                :simple="true"
                @change="handlePageNumChange"
              />
            </div>
          </div>
        </a-layout-content>
      </a-spin>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { countResourceByLabelIdIn, getAllLabelsByCategory } from '@/api/label';
import { findResourcesByLabelIdIn } from '@/api/resource';
import CardList from '@/components/cardList.vue';
import CommonPageHeader from '@/components/worldContent/commonPageHeader.vue';
import { HomePageCardItem } from '@/types';
import { CategoryLabelItem } from '@/types/label/label';
import { Icon } from '@/utils/icon';
import { CodepenOutlined, EditOutlined, SendOutlined } from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';
import { onBeforeMount, onMounted, ref } from 'vue';
const leftMenuData = ref<CategoryLabelItem[]>([]);
const menuRef = ref();
const radioVal = ref('time');
const checked = ref(false);
const selectedKeys = ref<number[]>([]);
const cardData = ref<HomePageCardItem[][]>([]);
const openKeys = ref<number[]>([]);
const pageNum = ref(1);
const pageSize = ref(12);
const resourceContent = ref();
const headerTitle = ref('');
const headerContent = ref('');
const isCollapsed = ref(true);
const isLoading = ref(false);
const totalNum = ref(0);
/**
 * 菜单点击切换
 * @param e 菜单点击事件的参数
 *
 */
const handleClick: MenuProps['onClick'] = async (e) => {
  isLoading.value = true;
  const { key } = e;
  leftMenuData.value.forEach((menuItem) => {
    // 从labels中找到id与key相同的label
    const label = menuItem.labels?.find((label) => label.id === Number(key));
    if (label !== undefined) {
      headerTitle.value = label.name as string;
    }
  });
  let result = await countResourceByLabelIdIn(Number(key));
  headerContent.value = `共${result.data}个资源`;

  result = await findResourcesByLabelIdIn(Number(key), pageNum.value, pageSize.value);
  parseCardListData(result.data.data as HomePageCardItem[]);
  totalNum.value = result.data.totalNum;
  isLoading.value = false;
};

const handlePageNumChange = async (page: number, size: number) => {
  console.log('page', page);
  console.log('pageSize', pageSize);
  isLoading.value = true;
  pageNum.value = page;
  const res = await findResourcesByLabelIdIn(selectedKeys.value[0], page, pageSize.value);
  console.log(res.data.data);
  parseCardListData(res.data.data as HomePageCardItem[]);
  totalNum.value = res.data.totalNum;
  isLoading.value = false;
};

/**
 * 获取左侧菜单数据
 */
const loadLeftMenuData = () => {
  getAllLabelsByCategory().then((res) => {
    if (res) {
      leftMenuData.value = res.data as CategoryLabelItem[];
      if (leftMenuData.value[0].labels && leftMenuData.value[0].labels[0]) {
        selectedKeys.value.length = 0;
        selectedKeys.value.push(leftMenuData.value[0].labels[0].id as number);
        headerTitle.value = leftMenuData.value[0].labels[0].name as string;
        countResourceByLabelIdIn(leftMenuData.value[0].labels[0].id as number).then((resp) => {
          if (resp) {
            headerContent.value = `共${resp.data}个资源`;
          }
        });
      }
    }
  });
};

/**
 * 格式化卡片数据
 */
const parseCardListData = (data: HomePageCardItem[]) => {
  cardData.value.splice(0);
  let n = 3;
  let lineNum = data.length % n === 0 ? data.length / n : Math.floor(data.length / n + 1);
  for (let i = 0; i < lineNum; i++) {
    let temp = data.slice(i * n, i * n + n);

    cardData.value.push(JSON.parse(JSON.stringify(temp)));
  }
};
/**
 * 获取页面内容数据
 */
const loadPageData = async () => {
  const result = await findResourcesByLabelIdIn(
    selectedKeys.value[0],
    pageNum.value,
    pageSize.value,
  );
  if (result) {
    parseCardListData(result.data.data as HomePageCardItem[]);
  }
};
// 挂载之前加载数据
onBeforeMount(() => {
  const width = document.body.clientWidth;
  if (width > 500) {
    isCollapsed.value = false;
    openKeys.value.push(1);
  } else {
    isCollapsed.value = true;
  }
});
onMounted(async () => {
  loadLeftMenuData();
  if (isCollapsed.value === true) {
    resourceContent.value.$el.style.marginLeft = '80px';
  } else {
    resourceContent.value.$el.style.marginLeft = '200px';
  }
  loadPageData();
});

/**
 * 左侧菜单点击收缩事件
 * @param collapsed 是否收缩
 */
const handleSiderCollapse = (collapsed: any, type: any) => {
  isCollapsed.value = collapsed;
  if (collapsed === true) {
    resourceContent.value.$el.style.marginLeft = '80px';
  } else {
    resourceContent.value.$el.style.marginLeft = '200px';
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
  z-index: 3000;
  .sider-menu {
    height: @menu-content-height;
  }
}
.layout-wrapper {
  margin-left: 200px;
  padding: 15px;
  min-height: calc(100vh - 100px);
}
</style>
