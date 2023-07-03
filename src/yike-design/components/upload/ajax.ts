const SCOPE = 'YkUpload'
export const UploadRequest = (option: any) => {
  return new Promise((resolve, reject) => {
    const uploadUrl = option.uploadUrl

    const xhr = new XMLHttpRequest()
    const formData = new FormData()

    formData.append('file', option.selectedFile)
    xhr.open('POST', uploadUrl, true)

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('文件上传成功:', xhr.responseText)
        resolve({ res: xhr.responseText })
      }
    }
    xhr.onerror = function () {
      reject({ err: xhr.responseText })
    }

    xhr.send(formData)
  })
}
