/**
 * 自定义主题方案
 **/

//引入less变量
import variables from '../style/theme.module.less'

// 将十六进制转为rgba值
const hexToRgba = (hex: string, a: number) => {
  // 首先使用正则表达式将十六进制字符串分解为 RGB 分量
  let result
  if (hex.length === 4) {
    result = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex)
    // 将分解出的分量转换为十进制数，并将它们扩展为 6 位十六进制字符串
    const r = parseInt(result[1] + result[1], 16)
    const g = parseInt(result[2] + result[2], 16)
    const b = parseInt(result[3] + result[3], 16)
    // return "rgba(" + r + ", " + g + ", " + b + ", e)";
    return `rgba(${r},${g},${b},${a})`
  } else {
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    // 将分解出的分量转换为十进制数
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    return `rgba(${r},${g},${b},${a})`
  }
}

export const menusModel = {
  themeLight: {
    pcolor: variables.pcolorLight,
    lcolor: variables.lcolorLight,
    scolor: variables.scolorLight,
    wcolor: variables.wcolorLight,
    ecolor: variables.ecolorLight,
    fontcolorl: variables.gray1,
    fontcolorm: hexToRgba(variables.gray1, 0.8),
    fontcolors: hexToRgba(variables.gray1, 0.5),
    fontcolorss: hexToRgba(variables.gray1, 0.3),
    bgcolorl: variables.gray10,
    bgcolorm: variables.gray9,
    bgcolors: variables.gray8,
    bgcolorss: variables.gray7,
    linecolors: hexToRgba(variables.gray1, 0.08),
    linecolorm: hexToRgba(variables.gray1, 0.16),
    linecolorl: hexToRgba(variables.gray1, 0.24),
  },

  themeDark: {
    pcolor: variables.pcolorDark,
    lcolor: variables.lcolorDark,
    scolor: variables.scolorDark,
    wcolor: variables.wcolorDark,
    ecolor: variables.ecolorDark,
    fontcolorl: hexToRgba(variables.gray10, 0.92),
    fontcolorm: hexToRgba(variables.gray10, 0.72),
    fontcolors: hexToRgba(variables.gray10, 0.48),
    fontcolorss: hexToRgba(variables.gray10, 0.26),
    bgcolorl: variables.gray1,
    bgcolorm: variables.gray2,
    bgcolors: variables.gray3,
    bgcolorss: variables.gray4,
    linecolors: hexToRgba(variables.gray10, 0.08),
    linecolorm: hexToRgba(variables.gray10, 0.16),
    linecolorl: hexToRgba(variables.gray10, 0.24),
  },
}
