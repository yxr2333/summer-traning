import apiRequest from '@/utils/requestApi';

export function getResourceByLabelId(id: number) {
  return apiRequest({
    url: '/resource/label',
    method: 'get',
    params: {
      id,
      pageNum: 1,
      pageSize: 12,
    },
  });
}
