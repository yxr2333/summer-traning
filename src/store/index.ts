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
const store = createPinia();

export default store;
