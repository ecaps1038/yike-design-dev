## YkUpload 文件上传

:::snippet
基本用法
文件列表上传
<UploadPrimary/>
:::

:::snippet
单文件上传
通过 `multiple` 控制是否能够上传多文件，默认为 true
<UploadSingleFile/>
:::

:::snippet
文件数量限制
通过 `limit` 控制文件上传数量限制
<UploadLimit/>
:::

:::snippet
图片上传
通过 `accept` 判断是否仅上传图片，若接受对象包含 `image` 、 `png` 、 `jpg/jpeg` ，则采用图片列表上传 UI
<UploadPicture/>
:::

:::snippet
图片列表样式及限制数量
通过 `limit` 控制图片上限、通过 `shape` 修改列表风格
<UploadPictureCircle/>
:::

:::snippet
头像上传
通过传入 `avatar` 进行头像上传，只允许上传一张图片且上传后允许通过裁剪重新上传
<UploadAvatar/>
:::

:::snippet
拖拽上传
通过传入 `draggle` 将 UI 变更为拖拽区，文件列表与常规文件一致，允许通过拖拽上传文件
<UploadDraggle/>
:::
