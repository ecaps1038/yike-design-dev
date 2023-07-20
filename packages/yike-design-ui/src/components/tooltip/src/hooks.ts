import { onMounted, onBeforeUnmount, ref, watch, reactive } from 'vue';
import type { Ref } from 'vue';
import type { TooltipProps } from './tooltip';
import { splitCameCase } from './utils';

type EventType = keyof WindowEventMap;
type ListenCallback = {
  (this: Window, ev: WindowEventMap[EventType]): any;
};
type ObCallback = {
  (ev: IntersectionObserverEntry): void;
};
const POSITION = [
  ['left', 'top'],
  ['right', 'bottom'],
  ['', ''],
] as const;
type Position = (typeof POSITION)[number];

// 事件监听hook函数
export function useEventListener(
  type: EventType,
  callback: ListenCallback,
  option?: boolean | AddEventListenerOptions,
): void {
  onMounted(() => window.addEventListener(type, callback, option));
  onBeforeUnmount(() => window.removeEventListener(type, callback, option));
}

// 使用观察器
export function useObserver(
  el: Ref<Element | null | undefined>,
  callback: ObCallback,
  option?: IntersectionObserverInit,
): void {
  const observer = new IntersectionObserver(([change]) => {
    callback(change);
  }, option);
  onMounted(() => {
    if (el.value) observer.observe(el.value);
  });
  onBeforeUnmount(() => {
    observer.unobserve(el.value!);
    observer.disconnect();
  });
}
// 计算遮挡位置
/**
 * @function usePosition : 计算元素遮挡方位
 * @param tooltip : 侦听的标签元素对象 Ref<Element | null | undefined> 响应式数据类型
 * */
export function usePosition(tooltip: Ref<Element | null | undefined>) {
  const position = ref<[Position[0], Position[1]]>(['', '']);
  useObserver(
    tooltip,
    (e) => {
      const { left, right, top, bottom } = e.intersectionRect;
      const { left: bl, right: br, top: bt, bottom: bb } = e.boundingClientRect;
      // 判断左右超出状态
      if (left > bl && right < br)
        console.log('1--------'), (position.value[0] = '');
      else if (left > bl) position.value[0] = 'left';
      else if (right < br) position.value[0] = 'right';
      else position.value[0] = '';

      // 判断上下超出状态
      if (top > bt && bottom < bb) position.value[1] = '';
      else if (top > bt) position.value[1] = 'top';
      else if (bottom < bb) position.value[1] = 'bottom';
      else position.value[1] = '';
    },
    { threshold: [0, 0.5, 1] },
  );

  return position;
}

/**
 * @function usePlacement : 根据已有 Placement 和 气泡位置动态生成 新的 Placement
 * @param tooltip : 侦听的标签元素对象 Ref<Element | null | undefined> 响应式数据类型
 * @param placement : 元素默认方位类型 可选值 "left" | "top" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" |
 * */
export function usePlacement(
  tooltip: Ref<Element | null | undefined>,
  placement: TooltipProps['placement'],
) {
  const position = usePosition(tooltip);
  const result = splitCameCase(placement!);
  const p = reactive([...result]);
  watch(
    position,
    () => {
      switch (result[0]) {
        case 'top':
        case 'bottom':
          if (position.value[1] == 'top') p[0] = 'bottom';
          else if (position.value[1] == 'bottom') p[0] = 'top';
          break;
        case 'left':
        case 'right':
          if (position.value[0] == 'left') p[0] = 'right';
          else if (position.value[0] == 'right') p[0] = 'left';
          break;
        default:
          break;
      }

      switch (result[1]) {
        case 'Left':
        case 'Right':
          if (position.value[0] == 'left') p[1] = 'Left';
          else if (position.value[0] == 'right') p[1] = 'Right';
          break;
        case 'Top':
        case 'Bottom':
          if (position.value[1] == 'top') p[1] = 'Top';
          else if (position.value[1] == 'bottom') p[1] = 'Bottom';
          break;
        default:
          break;
      }
    },
    { deep: true, immediate: true },
  );
  return p;
}
