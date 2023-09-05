export type UploadStatus =
  | 'ready'
  | 'uploading'
  | 'success'
  | 'error'
  | 'pause';
export const ImageTypes = ['image', 'jpeg', 'png', 'gif'];

export const IMAGESHAPE = ['default', 'circle'] as const;
export type Shape = (typeof IMAGESHAPE)[number];

export const fileTypeIcons = {
  word: 'yike-word',
  pdf: 'yike-pdf',
  excel: 'yike-excel',
  ppt: 'yike-ppt',
  media: 'yike-shipin',
  audio: 'yike-shipin',
  text: 'yike-txt',
};

export interface UserFile {
  name: string;
  url: string;
}

export interface UploadFile {
  name: string;
  progress?: number;
  status: UploadStatus;
  size?: number;
  response?: unknown;
  uid: number;
  url?: string;
  raw?: File;
}

export type UploadProps = {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  limit?: number;
  uploadUrl: string;
  shape?: Shape;
  fileList: Array<UserFile>;
  desc?: string;
  avatar?: boolean;
  draggable?: boolean;
};

export interface FileItemProps {
  progress?: number;
  fileContent: UploadFile;
  shape?: Shape;
  avatar?: boolean;
}

export type RequestOptions = {
  uid: number;
  uploadUrl: string;
  selectedFile: File;
  fileName: string;
  onSuccess: (uid: number, res: string) => void;
  onError: (uid: number, err: string) => void;
  onProgress: (uid: number, progress: number) => void;
};

export type RequestInstance = {
  abort: () => void;
};

export type DraggleProps = {
  desc?: string;
  disabled?: boolean;
  accept?: string;
};

export interface CropImageProps {
  fileContent: UploadFile;
}
