<template>
  <div class="login-background">
    <div class="card-main">
      <a-card class="my-card">
        <template #extra>
          <a-button type="text" @click="router.push({ name: 'login' })">返回登录</a-button>
        </template>
        <template #title>
          <div class="card-title">用户注册</div>
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
            <a-form-item label="用户名" name="username" required>
              <a-input v-model:value="formData.username" />
            </a-form-item>
            <a-form-item label="密码" name="password" required>
              <a-input-password v-model:value="formData.password" />
            </a-form-item>
            <a-form-item label="邮箱" name="email" required>
              <a-input v-model:value="formData.email" />
            </a-form-item>
            <a-form-item label="个人描述" name="description">
              <a-input v-model:value="formData.description" />
            </a-form-item>
          </a-form>
        </div>
        <div style="text-align: center">
          <a-button type="default" style="margin-right: 10px" @click="handleResetField">
            重置
          </a-button>
          <a-button type="primary" @click="handleSubmit">注册</a-button>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { doRegister } from '@/api/user/user';
import { useUserInfoStore } from '@/store';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const userInfoStore = useUserInfoStore();
const formRef = ref();
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
  email: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入邮箱',
    },
  ],
});
const formData = reactive({
  username: '',
  password: '',
  email: '',
  description: '',
});
const handleResetField = () => {
  formRef.value.resetFields();
};
const handleSubmit = () => {
  if (formData.password && formData.username && formData.email) {
    doRegister(formData.username, formData.password, formData.email, formData.description).then(
      (res: any) => {
        if (res.code === 200) {
          router.replace({ name: 'login' });
        }
      },
    );
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
    height: 500px;
    .my-card {
      width: inherit;
      height: inherit;
      .card-title {
        // text-align: center;
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
