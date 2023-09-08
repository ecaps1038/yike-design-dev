import {
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
  reactive,
  useSlots,
  defineComponent,
  h,
} from 'vue';
import type { Ref } from 'vue';
import type { TooltipProps } from './tooltip';
import { splitCamelCase, getView } from './utils';

const POSITION = [
  ['left', 'top'],
  ['right', 'bottom'],
  ['', ''],
] as const;

type Position = (typeof POSITION)[number];
type ObCallback = {
  (evt: IntersectionObserverEntry): void;
};

/**
 * @function useObserver 侦听器
 * @param el 侦听的元素
 * @param callback 元素可见大小发生变化的回调函数
 * @param option IntersectionObserver 配置项,
 * @param autoGetView 是否自动获取目标元素上层视口元素
 */
export function useObserver(
  el: Ref<HTMLElement | null | undefined>,
  callback: ObCallback,
  option?: IntersectionObserverInit,
  autoGetView?: boolean,
): void {
  let observer: IntersectionObserver;

  onMounted(() => {
    observer = new IntersectionObserver(
      ([change]) => {
        callback(change);
      },
      {
        ...option,
        root: autoGetView ? (getView(el.value!) as Element) : null,
      },
    );

    if (el.value) observer.observe(el.value);
  });

  onBeforeUnmount(() => {
    observer.unobserve(el.value!);
    observer.disconnect();
  });
}

/**
 * @function usePosition 计算元素遮挡方位
 * @param tooltip 侦听的标签元素对象 Ref<Element | null | undefined> 响应式数据类型
 * */
export function usePosition(tooltip: Ref<HTMLElement | null | undefined>) {
  const position = ref<[Position[0], Position[1]]>(['', '']);
  let time = 0;

  useObserver(
    tooltip,
    (e) => {
      const { left, right, top, bottom } = e.intersectionRect;
      const { left: bl, right: br, top: bt, bottom: bb } = e.rootBounds!;
      if (e.time - time < 100) return;
      time = e.time;

      // 完全显示和完全不显示
      if (e.intersectionRatio == 1 || e.intersectionRatio == 0) {
        position.value[0] = '';
        position.value[1] = '';
        return;
      }

      // 判断左右超出状态
      if ((left <= bl && right >= br) || (left == 0 && right == 0))
        position.value[0] = '';
      else if (left <= bl) position.value[0] = 'left';
      else if (right >= br) position.value[0] = 'right';
      else position.value[0] = '';

      // 判断上下超出状态
      if ((bottom >= bb && top <= bt) || (top == 0 && bottom == 0))
        position.value[1] = '';
      else if (bottom >= bb) position.value[1] = 'bottom';
      else if (top <= bt) position.value[1] = 'top';
      else position.value[1] = '';
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
    true,
  );

  return position;
}

/**
 * @function usePlacement  根据已有 Placement 和 气泡位置动态生成 新的 Placement
 * @param tooltip  侦听的标签元素对象 Ref<Element | null | undefined> 响应式数据类型
 * @param placement  元素默认方位类型 可选值 "left" | "top" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"
 * */
export function usePlacement(
  tooltip: Ref<HTMLElement | null | undefined>,
  placement: TooltipProps['placement'],
) {
  const position = usePosition(tooltip);
  const result = splitCamelCase(placement!);
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

/**
 * @function useDefaultSlots 将默认插槽以组件形式返回
 */
export function useDefaultSlots() {
  const slots = useSlots();

  const DefaultSlot = defineComponent(
    (componentProps, context) => {
      return () => {
        const VNodes = slots.default
          ? slots.default()
          : [h('span', {}, 'tooltip')];

        if (VNodes.length > 1) {
          console.error(
            new Error(
              'Component can only have one root element, but you have used multiple root elements',
            ),
          );
        }

        VNodes[0] = h(VNodes[0], { ...componentProps, ...context.attrs });
        return VNodes;
      };
    },
    { inheritAttrs: false },
  );

  return DefaultSlot;
}
