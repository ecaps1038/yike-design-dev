import { ref } from 'vue';
import { createGlobalState } from '@vueuse/core';

export const getElement = (selector: string): HTMLElement => {
  return document.querySelector(selector) ?? document.body;
};

let count = 0;

const DrawerOperator = createGlobalState(() => {
  const drawers = ref<number[]>([]);

  // 记录一个抽屉打开 将抽屉 id 放入 drawers 数组
  const open = (id: number) => {
    drawers.value.push(id);
    console.log('opened drawers', drawers.value);
  };

  // 记录最后一个打开（最前面的）的抽屉关闭
  const close = () => {
    drawers.value.pop();
    console.log('opened drawers', drawers.value);
  };

  const isLast = (id: number): boolean => {
    return drawers.value[drawers.value.length - 1] === id ? true : false;
  };

  return { drawers, open, close, isLast };
});

export const getDrawerOrder = () => {
  return (count += 1);
};

export const drawerStats = DrawerOperator();
