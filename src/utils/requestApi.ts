import router from '@/router';
import { useUserInfoStore } from '@/store';
import { message } from 'ant-design-vue';
import axios from 'axios';
const apiService = axios.create({
  timeout: 5000,
  baseURL: '/api/v1',
});
const store = useUserInfoStore();
apiService.interceptors.request.use(
  (config) => {
    if (store.token !== null) {
      config.headers!.token = store.token;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

apiService.interceptors.response.use(
  (success) => {
    if (success.status && success.status === 200) {
      const { code } = success.data;
      if (code === 500 || code === 403 || code === 401 || code === 400) {
        if (code === 401) {
          message.error('未登录或登录已过期，请重新登录');
          router.replace('/login');
        } else {
          if (success.data.msg) {
            message.error(success.data.msg);
          }
        }
      } else if (code === 200 && success.data.msg) {
        message.success(success.data.msg);
      }
    }
    return success.data;
  },
  (error) => {
    const { code } = error.response;
    if (code === 504 || code === 404) {
      message.error('服务器被吃了⊙﹏⊙∥');
    } else if (code === 403) {
      message.error('权限不足,请联系管理员');
    } else if (code === 401) {
      message.error('未登录或登录已过期，请重新登录');
      router.replace('/login');
    } else {
      if (error.response.data.msg) {
        message.error(error.response.data.msg);
      } else {
        message.error('未知错误');
      }
    }
  },
);

export default apiService;
