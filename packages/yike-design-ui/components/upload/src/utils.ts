import type { UploadFile, UserFile } from './upload';
import { generateUid } from '../../utils';
export const imageTypes = ['image', 'jpeg', 'png', 'gif'];

/**
 * 获取弧线路径
 * @param cx 中心点的 x 坐标
 * @param cy 中心点的 y 坐标
 * @param r 半径
 * @param progress 进度（0-1）
 */
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

/**
 * 初始化文件列表
 * @param {UserFile} list 用户文件列表
 */
export function generateListUid(list: UserFile[]) {
  const uploadList = list.map((item: any) => {
    return { uid: generateUid(), status: 'success', ...item }; // 在每个元素上添加 uid 属性并将其赋值为生成的 uid
  });
  return uploadList;
}

/**
 * 列表中定位下标
 * @param file 当前文件
 * @param fileList 当前文件列表
 */
export function findFile(
  file: UploadFile,
  fileList: Array<UploadFile>,
): number {
  return fileList.findIndex((fileIt) => file.uid === fileIt.uid);
}

/**
 * 列表中根据uid定位下标
 * @param uid 当前文件uid
 * @param fileList 当前文件列表
 */
export function findFileByUid(
  uid: number,
  fileList: Array<UploadFile>,
): number {
  return fileList.findIndex((fileIt) => uid === fileIt.uid);
}

/**
 * 根据文件名返回文件对应类型的图标
 * @param fileName 当前文件名
 */
export function getFileTypeIconName(fileName: string): string | undefined {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  const fileTypeIcons = {
    word: 'IconWordFileOutline',
    pdf: 'IconPdfOutline',
    excel: 'IconExcelFileOutline',
    ppt: 'IconPptFileOutline',
    mp4: 'IconVideoOutline',
    audio: 'IconAudioFileOutline',
    text: 'IconTxtFileOutline',
    png: 'IconImageOutline',
    jpg: 'IconImageOutline',
    video: 'IconVideoOutline',
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
      return 'IconFileOutline';
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

/**
 * 将 Base64 数据转换为 File 对象
 * @param {string} base64Data - Base64 编码的数据
 * @param {string} fileName - 文件名
 * @returns {File} - 转换后的 File 对象
 */
export function base64ToFile(base64Data: string, fileName: string) {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const file = new File(byteArrays, fileName, { type: 'image/jpeg' });
  return file;
}

/**
 * 将 Blob 对象转换为 File 对象
 * @param {Blob} blob - Blob 对象
 * @param {string} fileName - 文件名
 * @returns {File} - 转换后的 File 对象
 */
export function blobToFile(blob: Blob, fileName: string) {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}
