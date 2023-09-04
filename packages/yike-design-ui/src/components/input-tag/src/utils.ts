export const calculateElementStyle = (element: HTMLElement) => {
  let paddingLeft = 0;
  let paddingRight = 0;
  console.log('element:', element);
  if (typeof window === 'undefined') return { paddingLeft, paddingRight };

  const style = window.getComputedStyle(element);
  console.log('style', style.getPropertyValue('padding-left'));
  paddingLeft = parseFloat(style.getPropertyValue('padding-left'));
  paddingRight = parseFloat(style.getPropertyValue('padding-right'));
  console.log('paddingLeft:', paddingLeft, paddingRight);
  return {
    paddingLeft,
    paddingRight,
  };
};
