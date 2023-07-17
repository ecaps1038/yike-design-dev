export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail';
export const ImageTypes = ['image', 'jpeg', 'png', 'gif'];

export const fileTypeIcons = {
  word: 'yike-word',
  pdf: 'yike-pdf',
  excel: 'yike-excel',
  ppt: 'yike-ppt',
  media: 'yike-shipin',
  audio: 'yike-shipin',
  text: 'yike-txt',
};

export interface UploadRawFile extends File {
  uid: number;
}
export interface UploadFile {
  name: string;
  percentage?: number;
  status?: UploadStatus;
  size?: number;
  response?: unknown;
  uid?: number;
  url?: string;
  raw?: UploadRawFile;
}

export type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> &
  Partial<Pick<UploadFile, 'status' | 'uid'>>;

export type UploadProps = {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  preview?: boolean;
  limit?: number;
  uploadUrl: string;
  fileList: Array<UploadUserFile>;
  desc?: string;
};

export type FileItemContent = {
  status: string;
  name: string;
  raw: File;
  uid: number;
  url: string;
};

export interface FileItemProps {
  progress?: number;
  fileContent: FileItemContent;
}
