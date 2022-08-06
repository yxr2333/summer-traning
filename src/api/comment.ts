import request from '@/utils/request';
import { CommentItem } from '@/types';

export function getAllCommentData() {
  return request.get<CommentItem[]>('/comment/all');
}
