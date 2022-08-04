import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store, { useMenuStore } from '@/store';

const menuStore = useMenuStore(store);
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/home',
    component: () => import('@/views/home/Home.vue'),
    children: [
      {
        path: '',
        redirect: 'home/index',
      },
      {
        name: 'index',
        path: 'index',
        component: () => import('@/views/home/index/index.vue'),
      },
      {
        name: 'resource',
        path: 'resource',
        component: () => import('@/views/home/resource/resource.vue'),
      },
      {
        name: 'world',
        path: 'world',
        component: () => import('@/views/home/world/world.vue'),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.path.startsWith('/home')) {
    const { name } = to;
    if (typeof name === 'string') {
      menuStore.nowMenu = name;
      console.log('nowMenu', menuStore.nowMenu);
    }
  }
  next();
});
export default router;
