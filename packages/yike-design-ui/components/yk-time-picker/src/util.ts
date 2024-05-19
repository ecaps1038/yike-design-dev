import { TimeValue } from './time-picker';

export function startWithZero(num: number): string {
  let res = String(num);
  if (num < 10) {
    res = `0${num}`;
  }
  return res;
}

export function getNowTimeData(): TimeValue {
  const date = new Date();
  const hour = startWithZero(date.getHours());
  const minute = startWithZero(date.getMinutes());
  const second = startWithZero(date.getSeconds());
  return {
    hour,
    minute,
    second,
  };
}
