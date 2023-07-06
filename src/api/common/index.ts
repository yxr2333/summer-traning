import apiRequest from '@/utils/requestApi';

export function getResourceByLabelId(id: number, order: number) {
  return apiRequest({
    url: '/resource/label',
    method: 'get',
    params: {
      id,
      order,
      pageNum: 1,
      pageSize: 12,
    },
  });
}

export function sendCode(email: string) {
  return apiRequest({
    url: '/mail/sendResetCode',
    method: 'post',
    params: {
      email,
    },
  });
}
