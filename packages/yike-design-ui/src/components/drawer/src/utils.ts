import { ref } from 'vue';
import { createGlobalState } from '@vueuse/core';

export const getElement = (selector: string): HTMLElement => {
  return document.querySelector(selector) ?? document.body;
};

let count = 0;

const DrawerOperator = createGlobalState(() => {
  const drawers = ref<number[]>([]);

  const open = (id: number) => {
    drawers.value.push(id);
    console.log('opened drawers', drawers.value);
  };

  const close = () => {
    drawers.value.pop();
    console.log('opened drawers', drawers.value);
  };

  return { drawers, open, close };
});

export const getDrawerOrder = () => {
  return (count += 1);
};

export const drawerStats = DrawerOperator();
