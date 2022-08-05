import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store, { useMenuStore } from '@/store';

const menuStore = useMenuStore(store);
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/home/Home.vue'),
    children: [
      {
        path: '',
        redirect: 'home/index',
      },
      {
        name: 'homeIndex',
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
        children: [
          {
            name: 'worldIndex',
            path: '',
            redirect: 'home/world/wish',
          },
          {
            name: 'wish',
            path: 'wish',
            component: () => import('@/views/home/world/wish/wish.vue'),
            meta: {
              menu: 'world',
            },
          },
          {
            name: 'find',
            path: 'find',
            component: () => import('@/views/home/world/find/findFriends.vue'),
            meta: {
              menu: 'world',
            },
          },
          {
            name: 'ranking',
            path: 'ranking',
            component: () =>
              import('@/views/home/world/ranking/rankingList.vue'),
            meta: {
              menu: 'world',
            },
          },
          {
            name: 'discuss',
            path: 'discuss',
            component: () => import('@/views/home/world/discuss/discuss.vue'),
            meta: {
              menu: 'world',
            },
          },
        ],
      },
      {
        name: '404',
        path: '404',
        component: () => import('@/views/sys/404.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/home/404',
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.path.startsWith('/home')) {
    if (to.path.startsWith('/home/world')) {
      menuStore.nowMenu = to.meta.menu as string;
      next();
      return;
    }
    const { name } = to;
    if (typeof name === 'string') {
      menuStore.nowMenu = name;
      console.log('nowMenu', menuStore.nowMenu);
    }
  }
  next();
});
export default router;
