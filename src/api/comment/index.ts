import { PublishCommentParams } from '@/types/comment';
import apiService from '@/utils/requestApi';
export function publishComment(data: PublishCommentParams) {
  return apiService({
    url: '/comment/addComment',
    method: 'post',
    data,
  });
}
