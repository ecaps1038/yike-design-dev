<script setup lang="ts">
import { getArcPath } from './upload'

const props = defineProps({
  fileContent: {
    type: Object,
    default: () => {
      return {}
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
const emits = defineEmits(['handleAbort', 'handleRemove', 'handleReUpload'])
const handlePause = () => {
  emits('handleAbort')
}
const handleRemove = (fileContent: any) => {
  emits('handleRemove', fileContent)
}
const handleReUpload = (fileContent: any) => {
  emits('handleReUpload', fileContent)
}
</script>
<template>
  <div class="yk-file-content">
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
        <Icon
          class="re-upload-icon"
          name="yk-shuaxin"
          v-if="fileContent.status === 'fail'"
          @click="handleReUpload(fileContent)"
        />
        <div @click="handlePause" class="abort-icon-container">
          <svg
            width="21.639"
            height="21.639"
            v-if="fileContent.status === 'uploading'"
          >
            <!-- 背景圆形 -->
            <circle
              cx="10.8195"
              cy="10.8195"
              r="10.8195"
              class="default-bg"
              fill-opacity="0.6"
            />
            <!-- 进度扇形 -->
            <path :d="getArcPath(11, 11, 11, progress)" class="default-bg" />
            <rect width="2" height="6" x="7.819" y="7.819" fill="#FFF" rx="1" />
            <rect
              width="2"
              height="6"
              x="11.819"
              y="7.819"
              fill="#FFF"
              rx="1"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="delete-container" @click="handleRemove(fileContent)">
      <Icon
        name="yk-shanchu"
        v-if="fileContent.status !== 'uploading'"
        class="delete-icon"
      />
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../../assets/style/yk-index.less';

.yk-file-content {
  width: 100%;
  min-height: 30px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: pcolor;
  .file-content-main {
    width: 100%;
    padding: 5px 8px;
    background-color: @bg-color-m;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .delete-container {
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
    min-width: 14px;
    min-height: 14px;
  }
  .yk-kaobei {
    min-width: 14px;
    min-height: 14px;
  }
  .delete-icon {
    cursor: pointer;
  }
  .re-upload-icon {
    color: @ecolor;
    cursor: pointer;
  }
  .default-bg {
    fill: @pcolor;
  }
  .abort-icon-container {
    cursor: pointer;
  }
}
</style>
