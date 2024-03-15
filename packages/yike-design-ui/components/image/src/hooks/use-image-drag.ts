import { ref, toRefs, watch } from 'vue';

interface ImageDragProps {
  imageEl: HTMLElement;
  scale: number;
}

export const useImageDrag = (props: ImageDragProps) => {
  const { imageEl, scale } = toRefs(props);

  const translate = ref([0, 0]);

  let isDragging = false;
  let startX: number;
  let startY: number;
  let lastX: number = 0;
  let lastY: number = 0;

  /** 鼠标按下 */
  const onMousedown = (e: MouseEvent) => {
    isDragging = true;
    e.preventDefault && e.preventDefault();

    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener('mousemove', onMoving);
    document.addEventListener('mouseup', onMouseEnd);
  };

  /** 鼠标移动中 */
  const onMoving = (e: MouseEvent) => {
    if (isDragging === false) return;
    e.preventDefault && e.preventDefault();

    const deltaX = (e.clientX - startX) / scale.value + lastX;
    const deltaY = (e.clientY - startY) / scale.value + lastY;

    translate.value = [deltaX, deltaY];
  };

  /** 鼠标抬起 */
  const onMouseEnd = (e: MouseEvent) => {
    if (isDragging === false) return;
    e.preventDefault && e.preventDefault();

    isDragging = false;

    lastX = translate.value[0];
    lastY = translate.value[1];

    document.removeEventListener('mousemove', onMoving);
    document.removeEventListener('mouseup', onMouseEnd);
  };

  watch(imageEl, () => {
    imageEl.value.addEventListener('mousedown', onMousedown);
  });

  return {
    translate,
    resetTranslate: () => {
      lastX = 0;
      lastY = 0;
      translate.value = [lastX, lastY];
    },
  };
};
