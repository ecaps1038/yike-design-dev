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

:::snippet
回调函数
目前支持上传前、上传成功、上传失败、删除文件四个钩子
<UploadCallback/>
:::

### API

| 参数      | 描述                 | 类型                             | 默认值            |
| --------- | -------------------- | -------------------------------- | ----------------- |
| accept    | 接受文件类型         | accept                           | \*                |
| maxSize   | 文件大小限制         | number                           | 3\*1024\*1024(3M) |
| multiple  | 是否允许多文件上传   | boolean                          | true              |
| limit     | 控制文件上传数量      | number                           | 0                  |
| shape     | 图片列表形状         | 'default' \| 'circle'            | 'default'         |
| uploadUrl | 文件上传路径         | string                           | ''                |
| fileList  | 当前文件列表         | `{name:'file-name',url:'url'}[]` | []                |
| desc      | 文件上传提示         | string                           | ''                |
| avatar    | 是否上传头像         | boolean                          | false             |
| draggable | 是否采用拖拽上传交互 | boolean                          | false             |

### 钩子

| 方法               | 描述       | 出参类型                          |
| ------------------ | ---------- | --------------------------------- |
| handleSuccess      | 成功回调   | (res:response,currentList:File[]) |
| handleDelete       | 删除回调   | (currentList:File[])              |
| handleError        | 错误回调   | (err:response,currentList:File[]) |
| handleBeforeUpload | 上传前回调 | (file:File)                       |
