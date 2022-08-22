<template>
  <a-modal :visible="isVisible" title="许个心愿" @ok="handleSubmit" @cancel="isVisible = false">
    <a-form>
      <a-form-item label="内容" required>
        <a-textarea v-model:value="wishState.content"></a-textarea>
      </a-form-item>
      <a-form-item label="标签" required>
        <a-select
          mode="multiple"
          v-model:value="wishState.labelIds"
          show-search
          placeholder="选择标签"
          style="width: 200px"
          :options="options"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        ></a-select>
      </a-form-item>
    </a-form>
  </a-modal>
  <common-page-header
    :title="header.title"
    :extra-text="header.extra"
    :content="header.content"
    :icon="header.icon"
    @btnClick="handleBtnClick"
  />
  <div class="wish-wrapper">
    <a-spin :spinning="isLoading">
      <a-card style="margin-top: 18px">
        <world-content-form @search="handleSearch" />
      </a-card>
      <a-row style="margin-top: 18px" :gutter="24">
        <a-col
          v-for="item in dataArray"
          :key="item.id"
          style="margin-bottom: 10px"
          :xl="8"
          :lg="8"
          :md="24"
          :sm="24"
          :xs="24"
        >
          <a-badge-ribbon
            :color="item.isFinished ? 'cyan' : 'red'"
            :text="item.isFinished ? '已完成' : '待完成'"
          >
            <card-item
              @click="handleClick(item.id)"
              :avatar="(item.user.avatar as string)"
              :tags="item.labels"
              :title="`来自${item.user.username}的心愿`"
              :desc="item.content"
              :time="item.publishTime"
            ></card-item>
          </a-badge-ribbon>
        </a-col>
      </a-row>
      <div style="display: flex; justify-content: flex-end">
        <a-pagination v-model:current="pageNum" :total="totalNum" :show-size-changer="false" />
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { getAllLabels } from '@/api/label';
import { findAllWishes, findWishList, publishWish } from '@/api/wish';
import CardItem from '@/components/cardItem.vue';
import CommonPageHeader from '@/components/worldContent/commonPageHeader.vue';
import WorldContentForm from '@/components/worldContent/world-content-form.vue';
import { useUserInfoStore } from '@/store';
import { WorldPageHeaderItem } from '@/types';
import { LabelItem } from '@/types/label/label';
import { WishCardItem } from '@/types/wish';
import { message, SelectProps } from 'ant-design-vue';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const dataArray = ref<WishCardItem[]>([]);
const pageNum = ref(1);
const pageSize = ref(12);
const totalNum = ref(0);
const isVisible = ref(false);
const router = useRouter();
const header = ref<WorldPageHeaderItem>({
  title: '💖心愿墙',
  content: '找到你的心愿',
  extra: '许个心愿',
  icon: 'HeartOutlined',
});
const allLabels = ref<LabelItem[]>([]);
const options = ref<SelectProps['options']>();
const wishState = ref({
  content: '' as string | null,
  labelIds: [] as number[],
  publishUserId: null as number | null,
});

const isLoading = ref(false);
const userStore = useUserInfoStore();
const loadWishData = async () => {
  let result = await findWishList(pageNum.value, pageSize.value);
  if (result) {
    totalNum.value = result.data.totalNum;
    dataArray.value = result.data.data as WishCardItem[];
  }
};

const handleClick = (id: number) => {
  router.push({ name: 'wishDetail', query: { id } });
};

const handleSearch = (state: any) => {
  isLoading.value = true;
  findAllWishes(null, null, state.labelIds, state.content).then((resp) => {
    if (resp) {
      message.success('搜索成功');
      totalNum.value = resp.data.totalNum;
      dataArray.value = resp.data.data as WishCardItem[];
    }
  });
  isLoading.value = false;
};

onBeforeMount(async () => {
  isLoading.value = true;
  loadWishData();
  getAllLabels().then((res) => {
    if (res) {
      allLabels.value = res.data;
      options.value = res.data.map((label) => {
        return {
          value: label.id,
          label: label.name,
        };
      });
    }
  });
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

const handleBtnClick = () => {
  isVisible.value = true;
};

const handleChange = (value: string) => {
  // console.log(`selected ${value}`);
};
const handleBlur = () => {
  // console.log('blur');
};
const handleFocus = () => {
  // console.log('focus');
};
const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().includes(input);
};

const handleSubmit = () => {
  console.log(wishState.value);
  wishState.value.publishUserId = userStore.userInfo.uid;
  if (wishState.value.content === '') {
    message.error('请输入心愿内容');
    return;
  }
  if (wishState.value.labelIds.length === 0) {
    message.error('请选择心愿标签');
    return;
  }
  publishWish(wishState.value).then((res) => {
    if (res) {
      // message.success('发布成功');
      isVisible.value = false;
      wishState.value.content = '';
      wishState.value.labelIds = [];
      loadWishData();
    }
  });
};
</script>

<style scoped lang="less">
.wish-wrapper {
  min-height: calc(100vh - 220px);
}
</style>
