export const getElement = (el: string): HTMLElement => {
  return document.querySelector(el) ?? document.body;
};
