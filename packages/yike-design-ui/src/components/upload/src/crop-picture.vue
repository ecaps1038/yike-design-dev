<template>
  <div class="canvas-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { CropImageProps } from './upload'
import { onMounted } from 'vue'

const props = defineProps<CropImageProps>()

const canvasRef = ref()

const scale = ref(1)
const rotation = ref(0)

// 初始化canvas
const initDrawer = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  const image = new Image()
  image.src = (props.url || props.blobRaw) ?? '' // 替换为你的图片URL

  image.onload = () => {
    const aspectRatio = image.width / image.height
    const canvasHeight = 300
    const canvasWidth =
      canvasHeight * aspectRatio <= 700 ? canvasHeight * aspectRatio : 700

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    const scaleFactor = canvasHeight / image.height

    context.drawImage(
      image,
      0,
      0,
      image.width * scaleFactor,
      image.height * scaleFactor,
    )
    initCropArea()
  }
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

onMounted(() => {
  initDrawer()
})
</script>
