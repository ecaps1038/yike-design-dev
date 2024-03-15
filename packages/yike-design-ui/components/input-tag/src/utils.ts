export const calculateElementStyle = (element: HTMLElement) => {
  let paddingLeft = 0;
  let paddingRight = 0;
  if (typeof window === 'undefined') return { paddingLeft, paddingRight };

  const style = window.getComputedStyle(element);
  paddingLeft = parseFloat(style.getPropertyValue('padding-left'));
  paddingRight = parseFloat(style.getPropertyValue('padding-right'));

  return {
    paddingLeft,
    paddingRight,
  };
};
