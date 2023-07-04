import type { UploadUserFile } from '@/types/upload'
export function getArcPath(
  cx: number,
  cy: number,
  r: number,
  progress: number,
) {
  const endAngle = (progress / 100) * Math.PI * 2 // 结束角度（弧度）
  const x = cx + r * Math.sin(endAngle)
  const y = cy - r * Math.cos(endAngle)

  return `M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 ${
    endAngle < Math.PI ? '0' : '1'
  },1 ${x},${y} Z`
}
export function generateUid() {
  const randomPart = Math.floor(Math.random() * 10000) // 生成 0-9999 之间的随机数
  const timestampPart = Date.now() // 获取当前时间戳
  return parseInt(`${randomPart}${timestampPart}`, 10) // 将随机数和时间戳拼接为一个整数类型的 UID
}
export function generateListUid(list: any) {
  list = list.map((item: any) => {
    return { uid: generateUid(), ...item } // 在每个元素上添加 uid 属性并将其赋值为生成的 uid
  })
  return list
}

export function findFile(
  file: UploadUserFile,
  fileList: Array<UploadUserFile>,
): number {
  return fileList.findIndex((fileIt) => file.uid === fileIt.uid)
}
export function findFileByUid(
  uid: number,
  fileList: Array<UploadUserFile>,
): number {
  return fileList.findIndex((fileIt) => uid === fileIt.uid)
}
