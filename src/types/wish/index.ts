import { LabelItem } from '../label/label';
import { UserInfo } from '../user/user';

export interface WishCardItem {
  id: number;
  content: string;
  user: UserInfo;
  publishTime: string;
  isFinished: boolean;
  labels: LabelItem[];
}
