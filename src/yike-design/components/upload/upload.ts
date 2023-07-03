import axios from 'axios'

export default {
  data() {
    return {
      selectedFile: null,
    }
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0]
    },
    uploadFile() {
      if (this.selectedFile) {
        const formData = new FormData()
        formData.append('file', this.selectedFile)

        axios
          .post('/upload-url', formData)
          .then((response) => {
            console.log('File uploaded successfully')
            // 处理成功响应
          })
          .catch((error) => {
            console.error('Error uploading file:', error)
            // 处理错误响应
          })
      }
    },
  },
}
