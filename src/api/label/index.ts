import { LabelItem } from '@/types/label/label';
import apiService from '@/utils/requestApi';

export function getAllLabels() {
  return apiService.get<LabelItem[]>('/common/getAllLabels');
}

export function getAllLabelsByCategory() {
  return apiService({
    url: '/common/labelCategoryMenu',
    method: 'get',
  });
}
