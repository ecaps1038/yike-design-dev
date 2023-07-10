/**
 * 随机生成字符串
 * len 指定生成字符串长度
 */
export const getRandomString = (len: number) => {
  let _charStr =
    'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789',
    min = 0,
    max = _charStr.length - 1,
    _str = '' //定义随机字符串 变量
  //判断是否指定长度，否则默认长度为15
  len = len || 15
  //循环生成字符串
  for (var i = 0, index; i < len; i++) {
    index = (function (randomIndexFunc, i) {
      return randomIndexFunc(min, max, i, randomIndexFunc)
    })(function (min: number, max: number, i: number, _self: any) {
      let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
        numStart = _charStr.length - 10
      if (i == 0 && indexTemp >= numStart) {
        indexTemp = _self(min, max, i, _self)
      }
      return indexTemp
    }, i)
    _str += _charStr[index]
  }
  return _str
}

//拷贝内容
export const tryCopy = (copyWrapper: any): void => {
  // 创建select对象与range对象
  const selection: any = window.getSelection()
  const range = document.createRange()
  // 从当前selection对象中移除所有的range对象,
  // 取消所有的选择只 留下anchorNode 和focusNode属性并将其设置为null。
  // 这里没弄明白为什么需要先remove一下， 也没有太多资料查证 没有这句会复制失败
  if (selection.rangeCount > 0) selection.removeAllRanges()
  // 使 Range 包含某个节点的内容 使用这个 或者下面的selectNode都可以
  // range.selectNodeContents(tx)
  // 使 Range 包含某个节点及其内容
  range.selectNode(copyWrapper)
  // 向选区（Selection）中添加一个区域（Range）
  selection.addRange(range)
  // 已复制文字
  // console.log('selectedText', selection.toString())
  // 执行浏览器复制命令
  document.execCommand('copy')
  //复制完成后取消选区
  selection.removeAllRanges()
}

//自定义$emit和$on函数
const map: any = {}
export const $emit = (name: any, params: any) => {
  if (map[name] == null) {
    console.log('没有找到关于' + name + '的事件，无法触发')
  } else {
    map[name].detail = params
    window.dispatchEvent(map[name])
  }
}
export const $on = (name: any, work: any) => {
  const myEvent = new Event(name)
  map[name] = myEvent
  window.addEventListener(name, (event) => {
    // console.log('得到数据为：', event.detail);
    work(map[name].detail)
  })
}
let zIndex = 2000

export const popupManager = {
  nextIndex() {
    return zIndex++
  }
}