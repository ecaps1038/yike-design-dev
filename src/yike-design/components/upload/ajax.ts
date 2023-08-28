const SCOPE = 'YkUpload'
import { watch, type Ref } from 'vue'
export const UploadRequest = (
  option: any,
  uploadProgress: Ref<number>,
  abortController: Ref<boolean>,
) => {
  const xhr = new XMLHttpRequest()

  const uploadUrl = option.uploadUrl
  const formData = new FormData()
  return new Promise((resolve, reject) => {
    watch(
      () => abortController.value,
      () => {
        if (abortController.value === true) {
          xhr.abort()
          reject({ err: '中断上传' })
        }
      },
      {
        deep: true,
        immediate: true,
      },
    )
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
