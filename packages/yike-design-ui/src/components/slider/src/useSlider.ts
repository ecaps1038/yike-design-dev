import { Ref, nextTick, ref } from 'vue';
import { DIRECTION } from '../../utils';
import { UseSliderProps, SliderEmits, SliderEmitEvents } from './slider';

const checkPercentNum = (num: number): number => {
  return num <= 0 ? 0 : num >= 100 ? 100 : num;
};

const useSlider = (
  props: UseSliderProps,
  runwayWidth: Ref<number>,
  barStartPoint: Ref<number>,
  barEndPoint: Ref<number>,
  isRange: Ref<boolean>,
  emits: SliderEmits,
) => {
  let pointStart = 0,
    runwayLength = 0,
    prevDistance = 0, // 上一次步径偏差
    prevDirection = 0, // 上一次位移方向 -1 负向移动  0 未移动 1 正向移动
    isOver = false, // 是否过界
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
    // console.log(step);
    let start = barStartPoint.value,
      end = barEndPoint.value;
    if (isRange.value) {
      if (isEndBtn.value) {
        end += step;
        end = end >= runwayLength ? runwayLength : end;
        end = end <= 0 ? 0 : end;
        isOver = end <= 0 || end >= runwayLength;
      } else {
        start += step;
        start = start >= runwayLength ? runwayLength : start;
        start = start <= 0 ? 0 : start;
        isOver = start <= 0 || start >= runwayLength;
      }
      if (start >= end) {
        const cache = start;
        start = end;
        end = cache;
        isEndBtn.value = !isEndBtn.value;
      }
    } else {
      end += step;
      end = end >= runwayLength ? runwayLength : end;
      end = end <= 0 ? 0 : end;
      isOver = end <= 0 || end >= runwayLength;
    }
    barStartPoint.value = start;
    barEndPoint.value = end;
    emitValue('update:modelValue');
  };
  // 滑动距离计算
  const handleDistance = (diff: number, point: number) => {
    // 当前移动方向
    const curDirection = diff > 0 ? 1 : -1;
    if (
      curDirection !== prevDirection &&
      Math.abs(diff) + prevDistance >= propsStep / 2
    ) {
      // 掉头 && 位移距离 + 上一次步径偏差 >= 步径值一半
      isOver && (isOver = false);
      const step =
        Math.round(diff / propsStep) * propsStep || propsStep * curDirection;
      // console.log('掉头', diff, Math.round(diff / propsStep) * propsStep, step);
      handleStep(step);
      prevDistance =
        Math.abs(diff) >= propsStep * 2
          ? propsStep -
            (Math.abs((diff + prevDistance) % propsStep) || propsStep) -
            prevDistance
          : propsStep - Math.abs(diff) - prevDistance;
      pointStart = point;
      prevDirection = curDirection; // 存储本次移动方向
      // console.log('掉头', Math.abs(diff), prevDistance);
    } else if (Math.abs(diff) - prevDistance >= propsStep / 2) {
      // 位移距离 - 上一次步径偏差 >= 步径值一半
      const step =
        Math.round(diff / propsStep) * propsStep || propsStep * curDirection;
      // console.log('直行', diff, Math.round(diff / propsStep) * propsStep, step);
      handleStep(step);
      prevDistance =
        Math.abs(diff) >= propsStep * 2
          ? propsStep -
            (Math.abs((diff - prevDistance) % propsStep) || propsStep)
          : propsStep - Math.abs(diff) + prevDistance;
      pointStart = point;
      prevDirection = curDirection; // 存储本次移动方向
      // console.log('直行', Math.abs(diff), prevDistance);
    }
  };
  // 滑动事件处理
  const handleMove = (e: MouseEvent) => {
    if (props.direction === DIRECTION[1]) {
      const diff = e.clientX - pointStart;
      handleDistance(diff, e.clientX);
    } else if (props.direction === DIRECTION[0]) {
      const diff = pointStart - e.clientY;
      handleDistance(diff, e.clientY);
    }
  };
  // 鼠标拖拽滑动初始化
  const handlerBtnInit = (e: MouseEvent) => {
    moving.value = true;
    runwayLength = runwayWidth.value;
    prevDistance = 0;
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleMouseUp);
    if (props.direction === DIRECTION[1]) {
      pointStart = e.clientX;
      propsStep = (runwayLength * props.step) / 100;
    } else if (props.direction === DIRECTION[0]) {
      pointStart = e.clientY;
      propsStep = (runwayLength * props.step) / 100;
    }
    // console.log('propsStep', propsStep);
  };
  // 开始按钮 鼠标按下事件
  const handleStartMouseDown = (e: MouseEvent) => {
    if (props.disabled) return;
    handlerBtnInit(e);
    isEndBtn.value = false;
  };
  // 结束按钮 鼠标按下事件
  const handleEndMouseDown = (e: MouseEvent) => {
    if (props.disabled) return;
    handlerBtnInit(e);
    isEndBtn.value = true;
  };
  // 鼠标抬起事件
  const handleMouseUp = () => {
    prevDistance = 0;
    isOver = false;
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
