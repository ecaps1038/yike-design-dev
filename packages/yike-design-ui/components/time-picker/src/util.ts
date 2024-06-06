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

// 校验时间字符串是否符合格式化占位字符串
// todoxx：xx：：xx剩下多余部分的校验问题
export function checkTimeStr(time: string, formatStr: string): boolean {
  if (/hh:mm:ss$/gi.test(formatStr)) {
    // format：时分秒
    return /\d{2}:[0-5]?\d:[0-5]?\d$/g.test(time);
  } else if (/hh:mm$/gi.test(formatStr)) {
    // format：时分
    return /\d{2}:[0-5]?\d$/g.test(time);
  } else if (/mm:ss$/gi.test(formatStr)) {
    // format：分秒
    return /[0-5]?\d:[0-5]?\d$/g.test(time);
  }
  return false;
}
