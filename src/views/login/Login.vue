<template>
  <div class="login-background">
    <div class="card-main">
      <a-card class="my-card">
        <template #title>
          <div class="card-title">用户登录</div>
        </template>
        <div style="text-align: center">
          <img src="src/assets/vue.svg" alt="vue" width="50" />
        </div>
        <div class="card-content">
          <a-form
            ref="formRef"
            :rules="loginFormRules"
            :model="formData"
            name="loginForm"
            label-align="right"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
          >
            <a-form-item label="用户名" name="username">
              <a-input v-model:value="formData.username" />
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input-password v-model:value="formData.password" />
            </a-form-item>
          </a-form>
        </div>
        <div style="text-align: center">
          <a-button type="default" style="margin-right: 10px" @click="handleResetField">
            重置
          </a-button>
          <a-button type="primary" @click="handleSubmit">登录</a-button>
        </div>
        <div class="icon-box">
          <i v-for="(item, index) in iconList" :key="index" :class="item"></i>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userLogin } from '@/api/user/user';
import { useUserInfoStore } from '@/store';
import { UserLoginParam } from '@/types';
import { UserInfo } from '@/types/user/user';
import { notification } from 'ant-design-vue';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const userInfoStore = useUserInfoStore();
const formRef = ref();
onMounted(() => {
  notification.success({
    message: '账号：yxr\n密码：123456',
  });
});
const loginFormRules = reactive({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入用户名',
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入密码',
    },
  ],
});
const formData = reactive<UserLoginParam>({
  username: 'yxr',
  password: '123456',
});
const iconList: any[] = ['fa fa-github', 'fa fa-wechat', 'fa fa-qq'];
const handleResetField = () => {
  formRef.value.resetFields();
};

const handleSubmit = () => {
  if (formData.password && formData.username) {
    userLogin(formData).then((resp: any) => {
      console.log(resp);
      if (resp.code === 200) {
        userInfoStore.$patch({
          token: resp.data.token,
          userInfo: resp.data.userInfo as UserInfo,
        });
        localStorage.setItem('token', resp.token);
        setTimeout(() => {
          router.push('/home');
        }, 1000);
      }
    });
  }
};
</script>

<style lang="less" scoped>
.login-background {
  background-image: url('https://www.erupt.xyz/demo/login-bg.svg');
  background-repeat: no-repeat;
  background-position: center center;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .card-main {
    width: 540px;
    height: 400px;
    .my-card {
      width: inherit;
      height: inherit;
      .card-title {
        text-align: center;
        font-size: 20px;
      }
      .card-content {
        width: 80%;
        padding: 20px;
        margin-right: 0 !important;
      }
      .icon-box {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        i {
          margin: 5px;
        }
        & > i:nth-child(2) {
          color: #07c160;
        }
        & > i:nth-child(3) {
          color: #38aafe;
        }
      }
    }
  }
}
</style>
