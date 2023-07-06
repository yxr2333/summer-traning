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

export const useSettingMenuStore = defineStore('useSettingMenu', {
  state: () => {
    return {
      nowSettingMenu: 'settingData',
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
  actions: {
    // async updateUserInfo(newUserInfo: UserInfo) {
    //   this.userInfo = newUserInfo;
    //   // 发起API请求，更新用户信息
    //   const data = {
    //     id: this.userInfo.uid,
    //     username: this.userInfo.username,
    //     avatar: this.userInfo.avatar,
    //     description: this.userInfo.description,
    //     email: this.userInfo.email,
    //     labels: this.userInfo.labels,
    //   };
    //   await updateUserInfoApi(data).then((res) => {
    //     console.log(res);
    //   })
    // }
  },
});
const store = createPinia();

export default store;
