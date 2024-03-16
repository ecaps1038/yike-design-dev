import { ref, toRefs, watch } from 'vue';

/** 放大 | 缩小 */
type ZoomType = 'zoomIn' | 'zoomOut';

interface ImageScaleProps {
  wrapperEl: HTMLElement;
}

export const useImageScale = (props: ImageScaleProps) => {
  const { wrapperEl } = toRefs(props);

  const ZOOM_INCREMENT = 0.1;
  const MIN_SCALE = 0.1;
  const MAX_SCALE = 10;

  const scale = ref(1);

  const adjustZoom = (
    type: ZoomType = 'zoomIn',
    inc: number = ZOOM_INCREMENT,
  ) => {
    const increment = type === 'zoomIn' ? inc : -inc;
    scale.value += increment;

    // 限制缩放在最小和最大增量值之间
    scale.value = Math.min(Math.max(scale.value, MIN_SCALE), MAX_SCALE);
  };

  /** 鼠标滚轮事件 */
  const onWheel = (e: WheelEvent) => {
    const increment = 0.5;
    // 向下（缩小）
    if (e.deltaY > 0) adjustZoom('zoomOut', increment);
    // 向上（放大）
    else if (e.deltaY < 0) adjustZoom('zoomIn', increment);
  };

  watch(wrapperEl, () => {
    wrapperEl.value && wrapperEl.value.addEventListener('wheel', onWheel);
  });

  return {
    scale,
    adjustZoom,
    resetScale: () => {
      scale.value = 1;
    },
  };
};
