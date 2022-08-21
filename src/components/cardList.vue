<template>
  <a-modal
    :visible="isVisible"
    title="访问验证"
    @ok="handleOk"
    okText="确认"
    cancelText="取消"
    @cancel="isVisible = false"
  >
    <a-form>
      <a-form-item label="密码" required>
        <a-input-password placeholder="请输入密码..." v-model:value="inputPassword" />
      </a-form-item>
    </a-form>
  </a-modal>
  <a-row
    v-for="(item, index) in cardData"
    :key="index"
    :gutter="24"
    style="margin-bottom: 18px; margin-left: -8px; margin-right: -8px"
  >
    <a-col
      v-for="(data, j) in item"
      :key="j"
      :xl="8"
      :lg="8"
      :md="24"
      :sm="24"
      :xs="24"
      style="margin-bottom: 10px"
    >
      <a-badge-ribbon :text="data.isPaid ? '付费' : '免费'" :color="data.isPaid ? 'red' : 'green'">
        <a-card hoverable style="height: 100%">
          <template #actions>
            <setting-outlined key="setting" />
            <edit-outlined key="edit" />
            <ellipsis-outlined key="ellipsis" />
          </template>
          <a-card-meta
            @click="
              handleCardClick(
                data.id,
                data.isPaid,
                data.password,
                (data.labels as LabelItem[])[0].id as number,
              )
            "
          >
            <template #avatar>
              <a-avatar :size="80" :src="data.icon" />
            </template>
            <template #title>{{ data.name }}</template>
            <template #description>{{ data.description }}</template>
          </a-card-meta>
          <div style="margin-top: 30px; text-align: right">
            <a-tag
              v-for="(tag, index) in data.labels"
              :key="index"
              :color="index === 0 ? 'success' : 'default'"
            >
              {{ tag.name }}
            </a-tag>
          </div>
        </a-card>
      </a-badge-ribbon>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { HomePageCardItem } from '@/types';
import { LabelItem } from '@/types/label/label';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { onMounted, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
  cardData: {
    required: true,
    type: Array as PropType<HomePageCardItem[][]>,
  },
});
const isVisible = ref(false);
const inputPassword = ref('');
const resourceState = ref({
  id: null as number | null,
  labelId: null as number | null,
  pwd: null as string | null,
});
const handleCardClick = (
  id: number | null,
  isPaid: boolean,
  password: string | null,
  labelId: number,
) => {
  resourceState.value.id = id;
  resourceState.value.labelId = labelId;
  if (isPaid === true && password) {
    isVisible.value = true;
    resourceState.value.pwd = password;
  } else {
    router.push({ name: 'resourceDetail', query: { id, labelId } });
  }
};

onMounted(() => {
  console.log(props.cardData);
});
const handleOk = () => {
  const val = inputPassword.value;
  if (val === '' || val === null) {
    message.error('请输入密码');
  } else if (val === resourceState.value.pwd) {
    message.success('密码正确');
    router.push({
      name: 'resourceDetail',
      query: { id: resourceState.value.id, labelId: resourceState.value.labelId },
    });
  } else {
    message.error('密码错误');
  }
};
</script>

<style scoped></style>
