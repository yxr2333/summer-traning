import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import 'ant-design-vue/dist/antd.css';
import 'font-awesome/css/font-awesome.min.css';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(Antd);
app.use(router);
app.use(createPinia());
app.mount('#app');
