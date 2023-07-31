// 获取元素的绝对位置坐标（相对于页面左上角）
export function getElementPagePosition(element: HTMLElement | undefined) {
  if (!element) return;
  //计算x坐标
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent as HTMLElement | null;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent as HTMLElement | null;
  }
  //计算y坐标
  let actualTop = element.offsetTop;
  current = element.offsetParent as HTMLElement | null;
  while (current !== null) {
    actualTop += current.offsetTop + current.clientTop;
    current = current.offsetParent as HTMLElement | null;
  }
  //返回结果
  return { x: actualLeft, y: actualTop };
}
// 获取元素的绝对位置坐标（像对于浏览器视区左上角）
export function getElementViewPosition(element: HTMLElement) {
  //计算x坐标
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent as HTMLElement | null;
  while (current !== null) {
    actualLeft += current.offsetLeft + current.clientLeft;
    current = current.offsetParent as HTMLElement | null;
  }
  let elementScrollLeft;
  if (document.compatMode == 'BackCompat') {
    elementScrollLeft = document.body.scrollLeft;
  } else {
    elementScrollLeft = document.documentElement.scrollLeft;
  }
  const left = actualLeft - elementScrollLeft;
  //计算y坐标
  let actualTop = element.offsetTop;
  current = element.offsetParent as HTMLElement | null;
  while (current !== null) {
    actualTop += current.offsetTop + current.clientTop;
    current = current.offsetParent as HTMLElement | null;
  }
  let elementScrollTop;
  if (document.compatMode == 'BackCompat') {
    elementScrollTop = document.body.scrollTop;
  } else {
    elementScrollTop = document.documentElement.scrollTop;
  }
  const right = actualTop - elementScrollTop;
  //返回结果
  return { x: left, y: right };
}
