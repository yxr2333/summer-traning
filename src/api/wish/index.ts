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

export function publishWish(data: any) {
  return apiService({
    url: '/wish/publishWish',
    method: 'post',
    data,
  });
}

export function findWishById(id: number) {
  return apiService({
    url: '/wish/get/one/' + id,
    method: 'get',
  });
}

export function findWishByUid(userId: number, pageNum: number | null, pageSize: number | null) {
  if (pageNum === null || pageSize === null) {
    pageNum = 1;
    pageSize = 10;
  }
  return apiService({
    url: '/wish/getWishListByUserId',
    method: 'get',
    params: {
      userId,
      pageNum,
      pageSize,
    },
  });
}

export function findAllWishes(
  pageNum: number | null,
  pageSize: number | null,
  labels: number[],
  content: string,
) {
  if (pageNum === null || pageSize === null) {
    pageNum = 1;
    pageSize = 10;
  }
  let str = '';
  if (labels.length !== 0) {
    str = '?labels=';
    str += labels.join('&labels');
  }

  return apiService({
    url: '/wish/findByContentAndLabels/' + str,
    method: 'get',
    params: {
      pageNum,
      pageSize,
      content,
    },
  });
}
