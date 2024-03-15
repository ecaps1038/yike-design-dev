/**
 * 防抖函数
 * @param func 需要防抖的函数
 * @param delay 延迟时间
 * @param immediate 是否立即执行
 * @returns {execute: T; cancel: () => void}
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
  immediate: boolean = false,
): { execute: T; cancel: () => void } {
  let timer: NodeJS.Timeout | null;

  const debounced: (...args: Parameters<T>) => void = (...args) => {
    if (timer) clearTimeout(timer);
    if (immediate && !timer) func(...args);

    timer = setTimeout(() => {
      if (!immediate) func(...args);
      timer = null;
    }, delay);
  };

  const cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return {
    execute: debounced as T,
    cancel,
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 随机生成字符串
 * len 指定生成字符串长度
 */
export const getRandomString = (len: number) => {
  const _charStr =
      'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789',
    min = 0,
    max = _charStr.length - 1;

  let _str = ''; //定义随机字符串 变量
  //判断是否指定长度，否则默认长度为15
  len = len || 15;
  //循环生成字符串
  for (let i = 0, index; i < len; i++) {
    index = (function (randomIndexFunc, i) {
      return randomIndexFunc(min, max, i, randomIndexFunc);
    })(function (min: number, max: number, i: number, _self: any) {
      let indexTemp = Math.floor(Math.random() * (max - min + 1) + min);
      const numStart = _charStr.length - 10;
      if (i == 0 && indexTemp >= numStart) {
        indexTemp = _self(min, max, i, _self);
      }
      return indexTemp;
    }, i);
    _str += _charStr[index];
  }
  return _str;
};

//拷贝内容
export const tryCopy = (copyWrapper: any): void => {
  // 创建select对象与range对象
  const selection: any = window.getSelection();
  const range = document.createRange();
  // 从当前selection对象中移除所有的range对象,
  // 取消所有的选择只 留下anchorNode 和focusNode属性并将其设置为null。
  // 这里没弄明白为什么需要先remove一下， 也没有太多资料查证 没有这句会复制失败
  if (selection.rangeCount > 0) selection.removeAllRanges();
  // 使 Range 包含某个节点的内容 使用这个 或者下面的selectNode都可以
  // range.selectNodeContents(tx)
  // 使 Range 包含某个节点及其内容
  range.selectNode(copyWrapper);
  // 向选区（Selection）中添加一个区域（Range）
  selection.addRange(range);
  // 已复制文字
  // console.log('selectedText', selection.toString())
  // 执行浏览器复制命令
  document.execCommand('copy');
  //复制完成后取消选区
  selection.removeAllRanges();
};

export const copyText = (copyStr: string) => {
  const textarea = document.createElement('textarea');
  textarea.value = copyStr;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

//自定义$emit和$on函数
const map: any = {};
export const $emit = (name: any, params: any) => {
  if (map[name] == null) {
    console.log('没有找到关于' + name + '的事件，无法触发');
  } else {
    map[name].detail = params;
    window.dispatchEvent(map[name]);
  }
};
export const $on = (name: any, work: any) => {
  const myEvent = new Event(name);
  map[name] = myEvent;
  window.addEventListener(name, () => {
    // console.log('得到数据为：', event.detail);
    work(map[name].detail);
  });
};

let zIndex = 2000;

export const popupManager = {
  nextIndex() {
    return zIndex++;
  },
};

/**
 * 将 px 单位转换为 number
 * @param measurement 长度 '20px' | 20
 */
export const transformPxToNumber = (measurement: number | string) => {
  if (typeof measurement === 'string') {
    return Number(measurement.replace('px', ''));
  } else {
    return measurement;
  }
};

/** 数字 => px 字符串 */
export const toPx = (px?: string | number) => {
  if (typeof px === 'number') {
    return `${px}px`;
  }
  return px;
};

/** 生成唯一ID */
export function generateUid() {
  const randomPart = Math.floor(Math.random() * 10000); // 生成 0-9999 之间的随机数
  const timestampPart = Date.now(); // 获取当前时间戳
  return parseInt(`${randomPart}${timestampPart}`, 10); // 将随机数和时间戳拼接为一个整数类型的 UID
}
