<script setup lang="ts">
import type { UploadUserFile, UploadStatus } from '@/types/upload'
import { getArcPath } from './upload'
import { toRef } from 'vue'

const props = defineProps({
  fileContent: {
    type: Object,
    default: () => {
      return { url: '', name: '', status: 'success' }
    },
  },
  isPicture: {
    // 是否展示图片专属UI
    type: Boolean,
    default: false,
  },
  progress: {
    type: Number,
    default: 0,
  },
})
</script>
<template>
  <div class="yk-file-content">
    <!-- <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: uploadProgress + '%' }"></div>
    </div> -->
    <div class="file-content-main">
      <div class="content-left">
        <Icon
          name="yk-kaobei"
          v-if="!fileContent.uploading"
          class="annex-icon"
        />
        <div>{{ fileContent.name }}</div>
      </div>
      <div class="content-right">
        <Icon
          name="yk-gou1"
          v-if="fileContent.status === 'success' || !fileContent.status"
        />
        <Icon name="yk-shuaxin" v-if="fileContent.status === 'fail'" />

        <svg
          width="21.639"
          height="21.639"
          v-if="fileContent.status === 'uploading'"
        >
          <!-- 背景扇形 -->
          <circle
            cx="10.8195"
            cy="10.8195"
            r="10.8195"
            fill="#2B5AED"
            fill-opacity="0.6"
          />

          <!-- 进度扇形 -->
          <path :d="getArcPath(11, 11, 11, progress)" fill="#2B5AED" />
          <rect width="2" height="6" x="7.819" y="7.819" fill="#FFF" rx="1" />
          <rect width="2" height="6" x="11.819" y="7.819" fill="#FFF" rx="1" />
        </svg>
        <!-- <Icon name="yike-bofang" v-if="fileContent.status === 'uploading'" /> -->
      </div>
    </div>
    <div class="delete-container">
      <Icon
        name="yk-shanchu"
        v-if="!fileContent.uploading"
        class="delete-icon"
      />
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../../assets/style/yk-index.less';

.yk-file-content {
  width: 100%;
  height: 30px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: pcolor;
  .file-content-main {
    width: 100%;
    padding: 0px 8px;
    background-color: @bg-color-m;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .delete-container {
    height: 30px;
    width: 24px;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .content-left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: @pcolor;
    font-size: @size-s;
    font-weight: 400;
  }
  .content-right {
    color: @pcolor;
    font-size: 22px;
  }
  .annex-icon {
    margin-right: 6px;
    width: 14px;
    height: 14px;
  }
  .delete-icon {
    cursor: pointer;
  }
}
</style>
