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
