import { PublishCommentParams } from '@/types/comment';
import apiService from '@/utils/requestApi';
export function publishComment(data: PublishCommentParams) {
  return apiService({
    url: '/comment/addComment',
    method: 'post',
    data,
  });
}

export function getAllCommentPlatformData() {
  return apiService({
    url: '/comment/getPlatform',
    method: 'get',
  });
}

export function publishCommentInPlatform(data: any) {
  return apiService({
    url: '/comment/addPlatform',
    method: 'post',
    data,
  });
}
