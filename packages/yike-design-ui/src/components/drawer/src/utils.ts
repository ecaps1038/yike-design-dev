import { ref } from 'vue';
import { createGlobalState } from '@vueuse/core';

export const getElement = (value: string | HTMLElement): HTMLElement => {
  if (value instanceof HTMLElement) {
    return value;
  }
  return document.querySelector(value) ?? document.body;
};

let count = 0;

const DrawerOperator = createGlobalState(() => {
  const drawers = ref<number[]>([]);

  // 记录一个抽屉打开 将抽屉 id 放入 drawers 数组
  const open = (id: number) => {
    if (drawers.value[0] === id) return;
    drawers.value.unshift(id);
  };

  // 记录最后一个打开（最前面的）的抽屉关闭
  const close = () => {
    drawers.value.shift();
  };

  // 判断是不是最后一个未关闭的抽屉
  const isLast = (id: number): boolean => {
    const last = drawers.value[0];
    if (last === id || last === undefined) {
      return true;
    }
    return false;
  };

  return { drawers, open, close, isLast };
});

export const getDrawerOrder = () => {
  return (count += 1);
};

export const drawerStats = DrawerOperator();
