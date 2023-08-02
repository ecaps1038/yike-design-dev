import { Ref, nextTick, ref } from 'vue';
import { DIRECTION } from '../../utils';
import { UseSliderProps, SliderEmits, SliderEmitEvents } from './slider';

const checkPercentNum = (num: number): number => {
  return num <= 0 ? 0 : num >= 100 ? 100 : num;
};

const useSlider = (
  props: UseSliderProps,
  runwayRef: Ref<HTMLElement>,
  runwayWidth: Ref<number>,
  barStartPoint: Ref<number>,
  barEndPoint: Ref<number>,
  isRange: Ref<boolean>,
  emits: SliderEmits,
) => {
  let runwayLength = 0,
    rect: unknown = null,
    propsStep = 0; // 步法值
  const isEndBtn = ref(true), // false 开始按钮 true 结束按钮
    moving = ref(false); // 是否在移动中
  const emitValue = (event: SliderEmitEvents) => {
    nextTick(() => {
      let percentBarStart = Math.round(
        (barStartPoint.value / runwayWidth.value) * 100,
      );
      let percentBarEnd = Math.round(
        (barEndPoint.value / runwayWidth.value) * 100,
      );
      percentBarStart = checkPercentNum(percentBarStart);
      percentBarEnd = checkPercentNum(percentBarEnd);
      const runwayLen = props.max - props.min;
      const start = (runwayLen * percentBarStart) / 100 + props.min;
      const end = (runwayLen * percentBarEnd) / 100 + props.min;
      const modelVal = isRange.value ? [start, end] : end;
      // console.log(modelVal);
      emits(event, modelVal);
    });
  };
  // 按钮按步位移
  const handleStep = (step: number) => {
    let start = barStartPoint.value,
      end = barEndPoint.value;
    if (isRange.value) {
      if (isEndBtn.value) {
        end = step >= runwayLength ? runwayLength : step;
        end = end <= 0 ? 0 : end;
      } else {
        start = step >= runwayLength ? runwayLength : step;
        start = start <= 0 ? 0 : start;
      }
      if (start >= end) {
        const cache = start;
        start = end;
        end = cache;
        isEndBtn.value = !isEndBtn.value;
      }
    } else {
      end = step >= runwayLength ? runwayLength : step;
      end = end <= 0 ? 0 : end;
    }
    barStartPoint.value = start;
    barEndPoint.value = end;
    emitValue('update:modelValue');
  };
  // 滑动事件处理
  const handleMove = (e: MouseEvent) => {
    const _rect = rect as DOMRect;
    if (props.direction === DIRECTION[1]) {
      if (e.clientX >= _rect.left && e.clientX <= _rect.right) {
        const diff = e.clientX - _rect.left;
        const step = Math.round(diff / propsStep) * propsStep;
        handleStep(step);
      } else {
        const step = e.clientX < _rect.left ? -9999 : 9999;
        handleStep(step);
      }
    } else if (props.direction === DIRECTION[0]) {
      if (e.clientY >= _rect.top && e.clientY <= _rect.bottom) {
        const diff = _rect.bottom - e.clientY;
        const step = Math.round(diff / propsStep) * propsStep;
        handleStep(step);
      } else {
        const step = e.clientY < _rect.top ? 9999 : -9999;
        handleStep(step);
      }
    }
  };
  // 鼠标拖拽滑动初始化
  const handlerBtnInit = () => {
    moving.value = true;
    runwayLength = runwayWidth.value;
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleMouseUp);
    rect = runwayRef.value.getBoundingClientRect();
    if (props.direction === DIRECTION[1]) {
      propsStep = (runwayLength * props.step) / 100;
    } else if (props.direction === DIRECTION[0]) {
      propsStep = (runwayLength * props.step) / 100;
    }
    // console.log('propsStep', propsStep);
  };
  // 开始按钮 鼠标按下事件
  const handleStartMouseDown = () => {
    if (props.disabled) return;
    handlerBtnInit();
    isEndBtn.value = false;
  };
  // 结束按钮 鼠标按下事件
  const handleEndMouseDown = () => {
    if (props.disabled) return;
    handlerBtnInit();
    isEndBtn.value = true;
  };
  // 鼠标抬起事件
  const handleMouseUp = () => {
    moving.value = false;
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', handleMouseUp);
    emitValue('change');
  };
  return {
    isEndBtn,
    moving,
    handleStartMouseDown,
    handleEndMouseDown,
    emitValue,
  };
};

export { useSlider };
