import request from '@/utils/request';
import { HomePageCardItem } from '@/types';

export default function getPageCardData() {
  return request.get<HomePageCardItem[]>('/common/pageCard/all', {});
}
