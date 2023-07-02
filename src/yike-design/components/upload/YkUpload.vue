<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const props = defineProps({
    accept: {
      type: String,
      default: '*',
    },
    maxSize: {
      // 最大文件大小，单位字节，0代表不限制
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
    uploadTag: {
      type: String,
      default: null,
    },
    preview: {
      // 是否开启预览
      type: Boolean,
      default: true,
    },
    transcode: {
      // 是否开启视频转码按钮
      type: Boolean,
      default: false,
    },
    downloadable: {
      // 是否可下载
      type: Boolean,
      default: false,
    },
    equalProportion: {
      // 是否等比例限制文件宽高
      type: Boolean,
      default: false,
    },
    uploadUrl: {
      // 图片上传URL
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: 'normal',
      validator: value => ['small', 'normal', 'large'].includes(value),
    },
  });
  const isPicture = ref(false);
  isPicture.value = props.accept.includes('image');
</script>
<template>
  <div class="yk-upload-list">
    <div class="yk-uploader-file">123</div>
    <div class="yk-uplodaer-picture">123123</div>
  </div>
</template>
<style scoped lang="less"></style>
