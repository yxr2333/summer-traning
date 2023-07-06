import store, { useMenuStore, useSettingMenuStore, useUserInfoStore } from '@/store';
import { message } from 'ant-design-vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const menuStore = useMenuStore(store);
const userStore = useUserInfoStore(store);
const settingStore = useSettingMenuStore(store);
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
    name: 'register',
    path: '/register',
    component: () => import('@/views/register/register.vue'),
    meta: {
      title: '注册',
    },
  },
  {
    name: 'resetPwd',
    path: '/reset',
    component: () => import('@/views/sys/resetPwd.vue'),
    meta: {
      title: '重置密码',
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
        meta: {
          title: '首页',
        },
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
            meta: {
              title: '世界',
            },
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
          {
            name: 'wishDetail',
            path: 'wd',
            component: () => import('@/views/home/world/detail/wishDetail.vue'),
            meta: {
              title: '心愿详情',
            },
          },
        ],
      },
      {
        name: 'resourceDetail',
        path: '/resourceDetail',
        component: () => import('@/views/resource/resourceDetail.vue'),
        meta: {
          title: '资源详情',
        },
      },
      {
        name: 'setting',
        path: '/setting',
        component: () => import('@/views/home/setting/setting.vue'),
        redirect: '/setting/info',
        meta: {
          title: '个人中心',
        },
        children: [
          {
            name: 'settingData',
            path: 'info',
            component: () => import('@/views/home/setting/subviews/info.vue'),
            meta: {
              title: '个人资料',
              menu: 'setting',
            },
          },
          {
            name: 'settingCollect',
            path: 'collect',
            component: () => import('@/views/home/setting/subviews/collect.vue'),
            meta: {
              title: '我的收藏',
              menu: 'setting',
            },
          },
          {
            name: 'settingLike',
            path: 'record',
            component: () => import('@/views/home/setting/subviews/record.vue'),
            meta: {
              title: '推荐记录',
              menu: 'setting',
            },
          },
          {
            name: 'settingNotification',
            path: 'notification',
            component: () => import('@/views/home/setting/subviews/notification.vue'),
            meta: {
              title: '消息通知',
              menu: 'setting',
            },
          },
          {
            name: 'settingWish',
            path: 'myWish',
            component: () => import('@/views/home/setting/subviews/myWish.vue'),
            meta: {
              title: '我的心愿',
              menu: 'setting',
            },
          },
          {
            name: 'settingInvite',
            path: 'invite',
            component: () => import('@/views/home/setting/subviews/invite.vue'),
            meta: {
              title: '邀请好友',
              menu: 'setting',
            },
          },
          {
            name: 'settingScore',
            path: 'score',
            component: () => import('@/views/home/setting/subviews/score.vue'),
            meta: {
              title: '积分记录',
              menu: 'setting',
            },
          },
        ],
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
  // console.log(to);
  if (to.fullPath === '/login' || to.fullPath === '/register' || to.fullPath === '/reset') {
    next();
    return;
  } else {
    const { token } = userStore;
    if (!token) {
      const token = localStorage.getItem('token');
      const userInfo = localStorage.getItem('userInfo');
      if (token !== null && token !== undefined && userInfo !== null && userInfo !== undefined) {
        userStore.$patch({
          token: token as any,
          userInfo: JSON.parse(userInfo) as any,
        });
        if (to.path.startsWith('/home')) {
          if (to.path.startsWith('/home/world')) {
            menuStore.nowMenu = to.meta.menu as string;
            next();
            return;
          }
          const { name } = to;
          if (typeof name === 'string') {
            menuStore.nowMenu = name;
          }
        }
        // console.log(to.path.startsWith('/setting'));
        next();
        return;
      } else {
        message.error('请先登录');
        next({ path: '/login' });
      }
    }
  }
  if (to.meta.title !== null && to.meta.title !== undefined) {
    document.title = to.meta.title + ' - 知识星球';
  }
  next();
});
export default router;
