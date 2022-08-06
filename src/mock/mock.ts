import {
  CommentItem,
  HomePageCardItem,
  TableConfig,
  TableDataItem,
} from '@/types';
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
const homeCardData: HomePageCardItem[] = [
  {
    id: 1,
    iconUrl: 'https://s2.loli.net/2022/08/03/Rz5wd2IrVKk36po.jpg',
    title: '掘金',
    desc: '掘金',
  },
  {
    id: 2,
    iconUrl: 'https://s2.loli.net/2022/08/04/Ctf7Tuv5ZIdEsxL.png',
    title: 'Python',
    desc: 'Python',
  },
  {
    id: 3,
    iconUrl: 'https://s2.loli.net/2022/08/04/TXM7eNFfvYUELpz.png',
    title: 'JavaScript',
    desc: 'JavaScript',
  },
  {
    id: 4,
    iconUrl: 'https://s2.loli.net/2022/08/04/h8GzFOlYB5xpMwu.png',
    title: 'Github',
    desc: 'Github',
  },
  {
    id: 5,
    iconUrl: 'https://s2.loli.net/2022/08/04/BNTHDEkJghSus6f.png',
    title: 'MindMap',
    desc: 'MindMap',
  },
  {
    id: 6,
    iconUrl: 'https://s2.loli.net/2022/08/04/h8GzFOlYB5xpMwu.png',
    title: 'faker.js',
    desc: 'faker.js',
  },
  {
    id: 7,
    iconUrl: 'https://s2.loli.net/2022/08/04/p2eX7SfvIdtUk1C.png',
    title: '图灵社区',
    desc: '图灵社区',
  },
  {
    id: 8,
    iconUrl: 'https://s2.loli.net/2022/08/04/fM8dlUqYLgoHhFS.png',
    title: '冷熊社区',
    desc: '冷熊社区',
  },
  {
    id: 9,
    iconUrl: 'https://s2.loli.net/2022/08/04/5shQEiIa1KkR6GH.png',
    title: 'QQ邮箱',
    desc: 'QQ邮箱',
  },
  {
    id: 10,
    iconUrl: 'https://s2.loli.net/2022/08/04/AmWBtGVc1vZqy36.png',
    title: 'UI云',
    desc: 'UI云',
  },
  {
    id: 11,
    iconUrl:
      'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/1610793363633-bilibili.jpg',
    title: '哔哩哔哩',
    desc: '哔哩哔哩',
  },
  {
    id: 12,
    iconUrl: 'https://s2.loli.net/2022/08/04/OIwAyKj3lmBTCin.png',
    title: 'pnpm',
    desc: 'pnpm',
  },
];
export default [
  {
    url: '/mock/api/common/pageCard/all',
    method: 'get',
    response() {
      return homeCardData;
    },
  },
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
