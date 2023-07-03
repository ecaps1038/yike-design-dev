const SCOPE = 'YkUpload'
export const UploadRequest = (option: any) => {
  const uploadUrl = option.uploadUrl

  const xhr = new XMLHttpRequest()
  const formData = new FormData()

  formData.append('file', option.selectedFile)
  xhr.open('POST', uploadUrl, true)

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('文件上传成功:', xhr.responseText)
      // 处理成功响应
    } else {
      console.error('文件上传错误:', xhr.responseText)
      // 处理错误响应
    }
  }

  xhr.onerror = function () {
    console.error('文件上传出错')
    // 处理请求错误
  }

  xhr.send(formData)
  return xhr
}
