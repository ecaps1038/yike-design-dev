export function isWindow(el: any) {
  return el === window;
}

export function getTargetRect(target: HTMLElement | Window) {
  return isWindow(target)
    ? {
        top: 0,
        bottom: window.innerHeight,
      }
    : (target as HTMLElement).getBoundingClientRect();
}
