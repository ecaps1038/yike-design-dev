const SCOPE = 'YkUpload'
import type { Ref } from 'vue'
export const UploadRequest = (option: any, uploadProgress: Ref<number>) => {
  console.log('🚀 ~ file: ajax.ts:4 ~ UploadRequest ~ option:', option)
  return new Promise((resolve, reject) => {
    const uploadUrl = option.uploadUrl

    const xhr = new XMLHttpRequest()
    const formData = new FormData()

    formData.append('file', option.selectedFile)
    xhr.open('POST', uploadUrl, true)
    // 监听上传进度事件
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        uploadProgress.value = (event.loaded / event.total) * 100
      }
    })
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText)
        if (!response.error) resolve({ res: xhr.responseText })
        reject({ err: response.error })
      }
    }

    xhr.onerror = function () {
      reject({ err: xhr.responseText })
    }

    xhr.send(formData)
  })
}
