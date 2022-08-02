import { defineStore } from 'pinia';

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
