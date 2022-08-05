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
  value: string;
  title: string;
}
export interface CardTagItem {
  isFlashed: boolean | null;
  title: string;
}
export interface HomePageCardItem {
  id: number | null;
  iconUrl: string | null;
  title: string | null;
  desc: string | null;
  // tags: CardTagItem[] | null;
}

export interface WorldPageHeaderItem {
  title: string;
  content: string;
  extra: string;
}
