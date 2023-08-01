<template>
  <div :class="bem()">
    <div class="canvas-container">
      <canvas ref="canvasRef"></canvas>
    </div>
    <div :class="bem('operate')">
      <div :class="bem('operate-left')">
        <IconMinusOutline @click="zoomOut" />
        <YkSlider v-model="scalePercent" :class="bem('scale-bar')" />
        <IconPlusOutline @click="zoomIn" />
      </div>
      <div :class="bem('operate-right')">
        <IconRotateLeftOutline @click="rotateCounterClockwise" />
        <YkSlider v-model="rotationPercent" :class="bem('scale-bar')" />
        <IconRotateRightOutline @click="rotateClockwise" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { CropImageProps } from './upload'
import { onMounted } from 'vue'
import { YkSlider } from '../../../index'
import { createCssScope } from '../../utils'

const bem = createCssScope('image-crop')
const props = defineProps<CropImageProps>()

const MINAVATARWIDTH = 20

const canvasRef = ref()

// 缩放比率
const scale = ref(0.5)
const rotation = ref(0)

// slider百分比
const scalePercent = ref(50)
const rotationPercent = ref(50)
// image缩放比率
const scaleFactor = ref(0)

const image = new Image()

const canvasWidth = ref(0)
const canvasHeight = ref(0)

// 初始化canvas
const initDrawer = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  image.src = (props.url || props.blobRaw) ?? '' // 替换为你的图片URL

  image.onload = () => {
    // image aspect ratio
    const aspectRatio = image.width / image.height
    scale.value = Math.max((300 - MINAVATARWIDTH) / image.height, 0)
    scalePercent.value = scale.value * 100

    canvasHeight.value = 300
    canvasWidth.value = Math.min(canvasHeight.value * aspectRatio, 700)
    canvas.width = canvasWidth.value
    canvas.height = canvasHeight.value

    scaleFactor.value = canvasHeight.value / image.height

    context.drawImage(
      image,
      0,
      0,
      image.width * scaleFactor.value,
      image.height * scaleFactor.value,
    )
    initCropArea()
  }
}

watch(
  () => scalePercent.value,
  (val) => {
    console.log('value-change', val)
  },
)
const reDraw = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
  context.drawImage(
    image,
    0,
    0,
    image.width * scaleFactor.value,
    image.height * scaleFactor.value,
  )
  initCropArea()
}

// 绘制裁剪框
const initCropArea = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  const rectSize = 240
  const rectX = (canvas.width - rectSize) / 2
  const rectY = (canvas.height - rectSize) / 2

  context.strokeStyle = 'rgba(255,255,255,0.5)' // 设置边框颜色为白色
  context.lineWidth = 2 // 设置边框线宽度

  context.strokeRect(rectX, rectY, rectSize, rectSize)

  // 绘制遮罩
  context.fillStyle = 'rgba(0, 0, 0, 0.5)'
  context.fillRect(0, 0, canvas.width, rectY) // 上方遮罩
  context.fillRect(
    0,
    rectY + rectSize,
    canvas.width,
    canvas.height - (rectY + rectSize),
  ) // 下方遮罩
  context.fillRect(0, rectY, rectX, rectSize) // 左侧遮罩
  context.fillRect(
    rectX + rectSize,
    rectY,
    canvas.width - (rectX + rectSize),
    rectSize,
  ) // 右侧遮罩
}

// 顺时针旋转图像
const rotateClockwise = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
}

// 逆时针旋转图像
const rotateCounterClockwise = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
}

// 缩小图像
const zoomOut = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  console.log('out', scaleFactor.value)
  scaleFactor.value += 0.05
  reDraw()
}

// 放大图像
const zoomIn = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
}

onMounted(() => {
  initDrawer()
})
</script>
