import type { UploadFile, UserFile } from './upload';
export const imageTypes = ['image', 'jpeg', 'png', 'gif'];
export function getArcPath(
  cx: number,
  cy: number,
  r: number,
  progress: number,
) {
  const endAngle = (progress / 100) * Math.PI * 2; // 结束角度（弧度）
  const x = cx + r * Math.sin(endAngle);
  const y = cy - r * Math.cos(endAngle);

  return `M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 ${
    endAngle < Math.PI ? '0' : '1'
  },1 ${x},${y} Z`;
}
export function generateUid() {
  const randomPart = Math.floor(Math.random() * 10000); // 生成 0-9999 之间的随机数
  const timestampPart = Date.now(); // 获取当前时间戳
  return parseInt(`${randomPart}${timestampPart}`, 10); // 将随机数和时间戳拼接为一个整数类型的 UID
}
export function generateListUid(list: UserFile[]) {
  const uploadList = list.map((item: any) => {
    return { uid: generateUid(), status: 'success', ...item }; // 在每个元素上添加 uid 属性并将其赋值为生成的 uid
  });
  return uploadList;
}

export function findFile(
  file: UploadFile,
  fileList: Array<UploadFile>,
): number {
  return fileList.findIndex((fileIt) => file.uid === fileIt.uid);
}
export function findFileByUid(
  uid: number,
  fileList: Array<UploadFile>,
): number {
  return fileList.findIndex((fileIt) => uid === fileIt.uid);
}

export function getFileTypeIconName(fileName: string): string | undefined {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  const fileTypeIcons = {
    word: 'yike-word',
    pdf: 'yike-pdf',
    excel: 'yike-excel',
    ppt: 'yike-ppt',
    mp4: 'yike-shipin',
    audio: 'yike-shipin',
    text: 'yike-txt',
    png: 'yike-tupian',
    jpg: 'yike-tupian',
    video: 'yike-video',
  };

  switch (fileExtension) {
    case 'jpg':
    case 'png':
    case 'jpeg':
    case 'gif':
      return fileTypeIcons.png;
    case 'pdf':
      return fileTypeIcons.pdf;
    case 'mp4':
    case 'mkv':
      return fileTypeIcons.mp4;
    case 'doc':
    case 'docx':
      return fileTypeIcons.word;
    case 'xls':
    case 'xlsx':
      return fileTypeIcons.excel;
    case 'ppt':
    case 'pptx':
      return fileTypeIcons.ppt;
    case 'txt':
      return fileTypeIcons.text;
    default:
      return 'yike-wenjian';
  }
}

export function filesFiltered(files: File[], accept: string) {
  files.filter((file) => {
    const { type, name } = file;
    const extension = name.includes('.') ? `.${name.split('.').pop()}` : '';
    const baseType = type.replace(/\/.*$/, '');
    return accept
      .split(',')
      .map((type) => type.trim())
      .filter((type) => type)
      .some((acceptedType) => {
        if (acceptedType.startsWith('.')) {
          return extension === acceptedType;
        }
        if (/\/\*$/.test(acceptedType)) {
          return baseType === acceptedType.replace(/\/\*$/, '');
        }
        if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
          return type === acceptedType;
        }
        return false;
      });
  });
}
