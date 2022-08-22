import { UserLoginParam } from '@/types';
import request from '@/utils/requestApi';

export function userLogin(data: UserLoginParam) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
}

export function findAllUsers(pageNum: number, pageSize: number) {
  return request({
    url: '/user/getAllLikeName',
    method: 'get',
    params: {
      pageNum,
      pageSize,
    },
  });
}

export function findAllCollectByUserId(uid: number) {
  return request({
    url: '/resource/find/collect',
    method: 'get',
    params: {
      uid,
    },
  });
}

export function findPublishList(id: number) {
  return request({
    url: '/resource/find/one',
    method: 'get',
    params: {
      id,
    },
  });
}

export function findMyAllUsers(
  pageNum: number | null,
  pageSize: number | null,
  labels: number[],
  name: string,
) {
  if (pageNum === null || pageSize === null) {
    pageNum = 1;
    pageSize = 10;
  }
  let str = '';
  if (labels.length !== 0) {
    str = '?labelIds=';
    str += labels.join('&labelIds');
  }
  return request({
    url: '/user/findAllByNameAndLabelId',
    method: 'get',
    params: {
      pageNum,
      pageSize,
      name,
    },
  });
}
