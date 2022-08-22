import apiService from '@/utils/requestApi';
import axios from 'axios';
export function findResourcesByLabelIdIn(id: number, pageNum: number, pageSize: number) {
  if (!id) id = 4;
  return apiService({
    url: '/resource/label',
    method: 'get',
    params: {
      id,
      pageNum,
      pageSize,
    },
  });
}
/**
 * 根据id查询资源详情
 * @param id 资源id
 * @returns {Promise<AxiosResponse<any>>}
 */
export function findResourceById(id: number) {
  return apiService({
    url: '/resource/find/id',
    method: 'get',
    params: {
      id,
    },
  });
}

export function publishResource(data: any) {
  return apiService({
    url: '/resource/add',
    method: 'post',
    data,
  });
}

/**
 * 根据id查询资源下的评论
 * @param id 资源id
 * @returns {Promise<AxiosResponse<any>>}
 */
export function findResourceCommentsById(id: number) {
  return apiService({
    url: '/comment/getComment',
    method: 'get',
    params: {
      resource_id: id,
    },
  });
}

export function findManyResources(
  labelId: number,
  order: number,
  isFree: number,
  pageNum: number | null,
  pageSize: number | null,
) {
  if (pageNum === null || pageSize === null) {
    pageNum = 1;
    pageSize = 12;
  }
  return apiService({
    url: '/resource/find/all',
    method: 'get',
    params: {
      id: labelId,
      order,
      isFree: !isFree,
      pageNum,
      pageSize,
    },
  });
}

export function dynamicSearch(
  labelId: number,
  name: string,
  orderId: number,
  isFree: boolean,
  pageNum: number | null,
  pageSize: number | null,
) {
  if (pageNum == null || pageSize == null) {
    pageNum = 1;
    pageSize = 12;
  }
  return apiService({
    url: '/resource/find/dynamic',
    method: 'get',
    params: {
      labelId,
      name,
      orderId,
      isFree: isFree ? 1 : 0,
      pageNum,
      pageSize,
    },
  });
}

export function loadResourceDetailData(id: number, labelId: number) {
  return axios.all([
    findResourceById(id),
    findResourceCommentsById(id),
    findResourcesByLabelIdIn(labelId, 1, 3),
  ]);
}
