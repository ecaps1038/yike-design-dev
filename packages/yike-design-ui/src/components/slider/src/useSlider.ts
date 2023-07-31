import { Ref, nextTick, ref } from 'vue';
import {
  UseSliderProps,
  DirectionType,
  SliderEmits,
  SliderEmitEvents,
} from './slider';

const checkPercentNum = (num: number): number => {
  return num <= 0 ? 0 : num >= 100 ? 100 : num;
};

const useSlider = (
  props: UseSliderProps,
  runwayRef: Ref,
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
    isEndBtn = 1, // 0 开始按钮 1 结束按钮
    propsStep = 0; // 步法值
  const moving = ref(false); // 是否在移动中
  const emitValue = (event: SliderEmitEvents) => {
    nextTick(() => {
      let percentBarStart = Math.round(
        (barStartPoint.value / runwayLength) * 100,
      );
      let percentBarEnd = Math.round(
        ((barStartPoint.value + barEndPoint.value) / runwayLength) * 100,
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
  const handleStep = (step: number) => {
    // console.log(step);
    let start = barStartPoint.value,
      end = barEndPoint.value;
    if (isRange.value) {
      if (isEndBtn) {
        end += step;
        end = end >= runwayLength - start ? runwayLength - start : end;
        if (end < 0) {
          isEndBtn = 0;
          start += end;
          start = start < 0 ? 0 : start;
          end *= -1;
        }
        isOver = end >= runwayLength - start;
      } else {
        start += step;
        end -= step;
        if (start <= 0) {
          end += start;
          start = 0;
        }
        end = end >= runwayLength - start ? runwayLength - start : end;
        if (end < 0) {
          isEndBtn = 1;
          start += end;
          start = start < 0 ? 0 : start;
          end *= -1;
        }
        isOver = start <= 0;
      }
    } else {
      end += step;
      end = end >= runwayLength ? runwayLength : end;
      end = end <= 0 ? 0 : end;
      isOver = end >= runwayLength || end <= 0;
    }
    if (end < propsStep / 2) {
      end = 0;
    }
    barStartPoint.value = start;
    barEndPoint.value = end;
    emitValue('update:modelValue');
  };
  const handleDistance = (diff: number, point: number) => {
    const curDirection = diff > 0 ? 1 : -1;
    if (
      curDirection !== prevDirection &&
      Math.abs(diff) + prevDistance >= propsStep / 2
    ) {
      // 掉头 && 位移距离 + 上一次步径偏差 >= 步径值一半
      isOver && (isOver = false);
      const step =
        Math.round(diff / propsStep) * propsStep || propsStep * curDirection;
      // console.log('掉头', diff, prevDistance);
      handleStep(step);
      prevDistance =
        Math.abs(diff) >= propsStep * 2
          ? propsStep - (Math.abs(diff % propsStep) || propsStep) - prevDistance
          : propsStep - Math.abs(diff) - prevDistance;
      pointStart = point;
      prevDirection = curDirection; // 存储本次移动方向
    } else if (Math.abs(diff) - prevDistance >= propsStep / 2) {
      // 位移距离 - 上一次步径偏差 >= 步径值一半
      const step =
        Math.round(diff / propsStep) * propsStep || propsStep * curDirection;
      // console.log('直行', diff, prevDistance);
      handleStep(step);
      prevDistance =
        Math.abs(diff) >= propsStep * 2
          ? propsStep - (Math.abs(diff % propsStep) || propsStep) + prevDistance
          : propsStep - Math.abs(diff) + prevDistance;
      pointStart = point;
      prevDirection = curDirection; // 存储本次移动方向
    }
  };
  const handleMove = (e: MouseEvent) => {
    if (props.direction === DirectionType.HORIZONTAL) {
      const diff = e.pageX - pointStart;
      handleDistance(diff, e.pageX);
    } else if (props.direction === DirectionType.VERTICAL) {
      const diff = pointStart - e.pageY;
      handleDistance(diff, e.pageY);
    }
  };
  const handlerBtnInit = (e: MouseEvent) => {
    moving.value = true;
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleMouseUp);
    if (props.direction === DirectionType.HORIZONTAL) {
      runwayLength = runwayRef.value.offsetWidth;
      pointStart = e.pageX;
      propsStep = (runwayLength * props.step) / 100;
    } else if (props.direction === DirectionType.VERTICAL) {
      runwayLength = runwayRef.value.offsetHeight;
      pointStart = e.pageY;
      propsStep = (runwayLength * props.step) / 100;
    }
  };
  const handleStartMouseDown = (e: MouseEvent) => {
    handlerBtnInit(e);
    isEndBtn = 0;
  };
  const handleEndMouseDown = (e: MouseEvent) => {
    handlerBtnInit(e);
    isEndBtn = 1;
  };
  const handleMouseUp = () => {
    prevDistance = 0;
    isOver = false;
    moving.value = false;
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', handleMouseUp);
    emitValue('change');
  };
  return {
    moving,
    handleStartMouseDown,
    handleEndMouseDown,
  };
};

export { useSlider };
