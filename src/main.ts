import store from '@/store';
import { VueClipboard } from '@soerenmartius/vue3-clipboard';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'font-awesome/css/font-awesome.min.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(Antd);
app.use(VueClipboard);
app.use(store);
app.use(router);
router.isReady().then(() => {
  app.mount('#app');
});
