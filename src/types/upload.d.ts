export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
export const definePropType = <T>(val: any): PropType<T> => val
export interface UploadRawFile extends File {
  uid: number
}
export interface UploadFile {
  name: string
  percentage?: number
  status?: UploadStatus
  size?: number
  response?: unknown
  uid?: number
  url?: string
  raw?: UploadRawFile
}

export type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> &
  Partial<Pick<UploadFile, 'status' | 'uid'>>

export interface UploadRequestOptions {
  action: string
  method: string
  data: Record<string, string | Blob | [string | Blob, string]>
  filename: string
  file: File
  headers: Headers | Record<string, string | number | null | undefined>
  onError: (evt: UploadAjaxError) => void
  onProgress: (evt: UploadProgressEvent) => void
  onSuccess: (response: any) => void
  withCredentials: boolean
}
