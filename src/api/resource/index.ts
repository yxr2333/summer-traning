import apiService from '@/utils/requestApi';
export function findResourcesByLabelIdIn(id: number, pageNum: number, pageSize: number) {
  if (!id) id = 4;
  return apiService({
    url: '/resource/label',
    method: 'get',
    params: {
      id,
      pageNum,
      pageSize,
    },
  });
}
