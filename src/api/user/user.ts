import { UserLoginParam } from '@/types';
import { UserUpdateInfo } from '@/types/user/user';
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

export function updateUserInfoApi(data: UserUpdateInfo) {
  return request({
    url: '/user/modifyInfo',
    method: 'post',
    data,
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

export function doRegister(username: string, password: string, email: string, description: string) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password,
      email,
      description,
    },
  });
}

export function resetPwd(data: any) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    data,
  });
}
