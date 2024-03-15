import { RequestOptions } from './upload';
export const UploadRequest = ({
  uid,
  uploadUrl,
  selectedFile,
  onSuccess,
  onError,
  onProgress,
}: RequestOptions) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append('file', selectedFile);
  try {
    xhr.open('POST', uploadUrl, true);
  } catch {
    onError(uid, '上传失败、请求地址有误');
  }
  xhr.upload.onprogress = (event: ProgressEvent) => {
    if (event.lengthComputable) {
      const uploadProgress = (event.loaded / event.total) * 100;
      onProgress(uid, uploadProgress);
    }
  };
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.error || response.err) {
        onError(uid, response);
      } else {
        onSuccess(uid, response);
      }
    }
  };
  xhr.onerror = function () {
    onError(uid, xhr.responseText);
  };
  xhr.send(formData);
  return {
    abort() {
      xhr.abort();
    },
  };
};
