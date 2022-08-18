import { LabelItem } from '../label/label';

export interface UserInfo {
  uid: number | null;
  username: string | null;
  password: string | null;
  salt: string | null;
  gender: string | null;
  email: string | null;
  avatar: string | null;
  score: number | null;
  description: string | null;
  labels: LabelItem[] | null;
}

export interface UserBaseInfo {
  uid: number | null;
  username: string | null;
  gender: string | null;
  email: string | null;
  avatar: string | null;
  score: number | null;
  description: string | null;
  labels: LabelItem[] | null;
}
