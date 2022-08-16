import { UserInfo } from '@/types/user/user';
import { createPinia, defineStore } from 'pinia';
export const useCard = defineStore('useCard', {
  state: () => {
    return {
      totalCard: 0,
    };
  },
  actions: {
    incrementCard() {
      this.totalCard++;
    },
  },
  getters: {
    calcTotalCard: (state) => state.totalCard * 10,
  },
});

export const useMenuStore = defineStore('useMenu', {
  state: () => {
    return {
      nowMenu: 'index',
    };
  },
});

export const useUserInfoStore = defineStore('useUserInfo', {
  state: () => {
    return {
      token: null,
      userInfo: {} as UserInfo,
    };
  },
});
const store = createPinia();

export default store;
