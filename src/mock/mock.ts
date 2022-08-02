import { TableConfig, TableDataItem } from '@/types';
import { MockMethod } from 'vite-plugin-mock';

const userData: TableDataItem[] = [
  {
    id: 1,
    label: '编号',
    dept: null,
    gender: '男',
    name: 'yxr',
  },
  {
    id: 2,
    label: '编号',
    dept: null,
    gender: '男',
    name: 'yyyyxr',
  },
  {
    id: 3,
    label: '编号',
    dept: null,
    gender: '女',
    name: 'zyl',
  },
];
const userTableConfig: TableConfig[] = [
  {
    prop: 'id',
    label: '编号',
  },
  {
    prop: 'gender',
    label: '性别',
  },
  {
    prop: 'name',
    label: '姓名',
  },
];

export default [
  {
    url: '/mock/api/user/getUserData',
    method: 'get',
    response() {
      return userData;
    },
  },
  {
    url: '/mock/api/user/getTableConfig',
    method: 'get',
    response() {
      return userTableConfig;
    },
  },
  {
    url: '/mock/api/user/login',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '登录成功',
      };
    },
  },
] as MockMethod[];
