import { onBeforeUnmount, onMounted, reactive } from 'vue';

export default () => {
  const point = reactive({
    x: 0,
    y: 0,
  });
  const getMouseClickPoint = (event: MouseEvent) => {
    point.x = event.pageX;
    point.y = event.pageY;
  };
  onMounted(() => {
    window.addEventListener('click', getMouseClickPoint);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('click', getMouseClickPoint);
  });

  return point;
};
