export interface LabelItem {
  id: number | null;
  name: string | null;
}

export interface CategoryLabelItem {
  id: number | null;
  labels: LabelItem[] | null;
  name: string | null;
  iconName: string | null;
}
