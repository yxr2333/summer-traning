import { LabelItem } from '../label/label';
import { UserInfo } from '../user/user';

export interface ResourceItem {
  id: number | null;
  name: string | null;
  description: string | null;
  link: string | null;
  icon: string | null;
  content: string | null;
  collect: number | null;
  isPaid: boolean | null;
  password: string | null;
  releaseTime: string | null;
  publishUser: UserInfo | null;
  labels: LabelItem[] | null;
}
