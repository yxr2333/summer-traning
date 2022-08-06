import { createVNode } from 'vue';
import * as $Icon from '@ant-design/icons-vue';

export const Icon = (props: { icon: string }) => {
  const { icon } = props;
  if (icon === null || icon === '' || icon === undefined) return;
  const antIcon: { [key: string]: any } = $Icon;
  return createVNode(antIcon[icon]);
};
