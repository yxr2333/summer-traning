import store, { useMenuStore, useUserInfoStore } from '@/store';
import { message } from 'ant-design-vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const menuStore = useMenuStore(store);
const userStore = useUserInfoStore(store);
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/home/Home.vue'),
    children: [
      {
        name: 'homeNone',
        path: '',
        redirect: 'home/index',
      },
      {
        name: 'homeIndex',
        path: 'index',
        component: () => import('@/views/home/index/index.vue'),
        meta: {
          title: '主页',
        },
      },
      {
        name: 'resource',
        path: 'resource',
        component: () => import('@/views/home/resource/resource.vue'),
        meta: {
          title: '资源',
        },
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
              title: '心愿墙',
            },
          },
          {
            name: 'find',
            path: 'find',
            component: () => import('@/views/home/world/find/findFriends.vue'),
            meta: {
              menu: 'world',
              title: '找伙伴',
            },
          },
          {
            name: 'ranking',
            path: 'ranking',
            component: () => import('@/views/home/world/ranking/rankingList.vue'),
            meta: {
              menu: 'world',
              title: '激励榜',
            },
          },
          {
            name: 'discuss',
            path: 'discuss',
            component: () => import('@/views/home/world/discuss/discuss.vue'),
            meta: {
              menu: 'world',
              title: '讨论角',
            },
          },
        ],
      },
      {
        name: 'setting',
        path: '/setting',
        component: () => import('@/views/home/setting/setting.vue'),
      },
      {
        name: '404',
        path: '404',
        component: () => import('@/views/sys/404.vue'),
        meta: {
          title: '走丢了~',
        },
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
  if (to.fullPath === '/login') {
    next();
  } else {
    const { token } = userStore;
    if (token) {
      next();
    } else {
      message.error('请先登录');
      next({ path: '/login' });
    }
  }
  if (to.meta.title) {
    document.title = to.meta.title + ' - 知识星球';
  }
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
});
export default router;
