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
