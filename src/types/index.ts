import { Dayjs } from 'dayjs';
import { LabelItem } from './label/label';
import { UserInfo } from './user/user';
export interface Log {
  id: number | undefined | null;
  msg: string | undefined | null;
}

export interface UserTest {
  name: string | undefined;
  gender: string | undefined;
}

export interface FormDataTest {
  name: string | null;
  phone: string | null;
  age: number | null;
}

export interface MenuItem {
  title: string | null;
  icon: string | null;
  index: string | null;
  content: string | null;
  isSubMenu: boolean;
  children: MenuItem[] | null;
}

export interface Department {
  id: number | null;
  name: string | null;
}

export interface TableDataItem {
  id: number | null;
  label: string;
  name: string | null;
  gender: string | null;
  dept: Department | null;
}

export interface TableConfig {
  prop: string | null;
  label: string | null;
}

export interface UserLoginParam {
  username: string | null;
  password: string | null;
}

export interface NavBarTagItem {
  id: number;
  isFocus: boolean;
  title: string;
}

export interface PageHeaderRadioItem {
  value: number;
  title: string;
}
export interface CardTagItem {
  isFlashed: boolean | null;
  title: string;
}
export interface HomePageCardItem {
  id: number | null;
  collect: number | null;
  content: string | null;
  description: string | null;
  icon: string | null;
  isPaid: boolean;
  link: string | null;
  name: string | null;
  password: string | null;
  labels: LabelItem[] | null;
  publishUser: UserInfo | null;
  // tags: CardTagItem[] | null;
}

export interface WorldPageHeaderItem {
  title: string;
  content: string;
  extra: string | null;
  icon: string | null;
}

export interface LeftMenuItem {
  icon: string;
  title: string;
  key: string;
}

export interface CommentItem {
  author: string;
  avatar: string;
  content: string;
  datetime: Dayjs;
}

export interface PageData {
  totalNum: number;
  pageNum: number;
  pageSize: number;
}
