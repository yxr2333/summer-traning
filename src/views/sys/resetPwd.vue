<template>
  <div class="login-background">
    <div class="card-main">
      <a-card class="my-card">
        <template #extra>
          <a-button type="text" @click="router.push({ name: 'login' })">返回登录</a-button>
        </template>
        <template #title>
          <div class="card-title">找回密码</div>
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
            <a-form-item label="旧密码" name="password" required>
              <a-input-password v-model:value="formData.password" />
            </a-form-item>
            <a-form-item label="新密码" name="newPassword" required>
              <a-input-password v-model:value="formData.newPassword" />
            </a-form-item>
            <a-form-item label="邮箱" name="email" required="">
              <a-input v-model:value="formData.email" />
            </a-form-item>
            <a-form-item label="验证码" name="code" required>
              <a-row :gutter="24">
                <a-col :span="12">
                  <a-input v-model:value="formData.code" />
                </a-col>
                <a-col :span="12">
                  <a-button type="primary" @click="handleSendCode" :disabled="isDisabled">
                    <span v-if="!isDisabled">发送验证码</span>
                    <span v-else>{{ `${minuteData}秒后重试` }}</span>
                  </a-button>
                </a-col>
              </a-row>
            </a-form-item>
          </a-form>
        </div>
        <div style="text-align: center">
          <a-button type="default" style="margin-right: 10px" @click="handleResetField">
            清空
          </a-button>
          <a-button type="primary" @click="handleSubmit">重置密码</a-button>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { sendCode } from '@/api/common/index';
import { resetPwd } from '@/api/user/user';
import { useUserInfoStore } from '@/store';
import { message } from 'ant-design-vue';
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
      message: '请输入旧密码',
    },
  ],
  newPassword: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入新密码',
    },
  ],
  code: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入验证码',
    },
  ],
});
const minuteData = ref(30);
const isDisabled = ref(false);
const formData = reactive({
  username: '',
  password: '',
  newPassword: '',
  code: '',
  email: '',
});
const handleResetField = () => {
  formRef.value.resetFields();
};
const handleSubmit = () => {
  if (
    formData.password !== '' &&
    formData.username !== '' &&
    formData.newPassword !== '' &&
    formData.code !== ''
  ) {
    resetPwd(formData).then((resp: any) => {
      if (resp && resp.code === 200) {
        router.replace({ name: 'login' });
      }
    });
  } else if (formData.username === '') {
    message.error('请输入用户名');
  } else if (formData.password === '') {
    message.error('请输入旧密码');
  } else if (formData.newPassword === '') {
    message.error('请输入新密码');
  } else if (formData.email === '') {
    message.error('请输入邮箱');
  } else if (formData.code === '') {
    message.error('请输入验证码');
  }
};
const handleSendCode = () => {
  if (formData.email === '' || !formData) {
    message.error('请输入邮箱');
  } else {
    isDisabled.value = true;
    minuteData.value = 30;
    sendCode(formData.email);
    let timer = setInterval(() => {
      minuteData.value -= 1;
    }, 1000);
    setTimeout(() => {
      isDisabled.value = false;
      clearInterval(timer);
    }, 30000);
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
