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

export function loadResourceDetailData(id: number, labelId: number) {
  return axios.all([
    findResourceById(id),
    findResourceCommentsById(id),
    findResourcesByLabelIdIn(labelId, 1, 3),
  ]);
}
