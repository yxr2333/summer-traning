import apiService from '@/utils/requestApi';
export function findWishList(pageNum: number, pageSize: number) {
  return apiService({
    url: '/wish/getWishList',
    params: {
      pageNum,
      pageSize,
    },
  });
}
