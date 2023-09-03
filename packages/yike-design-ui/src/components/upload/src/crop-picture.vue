<template>
  <div :class="bem()">
    <div
      ref="canvasContainer"
      :class="bem('canvas-container')"
      @mousedown.prevent="handleMouseDown"
      @mousemove.prevent="handleMouseMove"
      @mouseup.prevent="handleMouseUp"
      @wheel.stop="scrollHandler"
      @mousewheel.stop="scrollHandler"
    >
      <canvas ref="canvasRef"></canvas>
    </div>
    <div :class="bem('operate')">
      <div :class="bem('operate-left')">
        <IconMinusOutline @click.stop="zoomOut" />
        <YkSlider v-model="scalePercent" :class="bem('scale-bar')" />
        <IconPlusOutline @click.stop="zoomIn" />
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
import { ref, watch, onMounted, toRefs, computed } from 'vue'
import { CropImageProps } from './upload'
import { YkSlider } from '../../slider'
import { createCssScope } from '../../utils'
import { useDebounceFn } from '@vueuse/core'

// start{X,Y}: mouse down location
// client{X,Y}: current Picture location
// delta{X,Y}: movement
const dragData = {
  isDragging: false,
  startX: 0,
  startY: 0,
  clientX: 0,
  clientY: 0,
  deltaX: 0,
  deltaY: 0,
}

const bem = createCssScope('image-crop')
const props = defineProps<CropImageProps>()

const { fileContent } = toRefs(props)

const canvasRef = ref()
const canvasContainer = ref()

// 缩放比率 0-1
const scale = ref(0.5)
// slider百分比 0-100
const scalePercent = ref(50)
const rotationPercent = ref(50)
// image缩放比率
const scaleFactor = ref(0)
const rotationFactor = ref(0)
const image = new Image()
image.crossOrigin = 'Anonymous'
const canvasWidth = ref(0)
const canvasHeight = ref(0)

const blobRaw = computed(() => {
  const rawValue = fileContent.value?.raw
  if (rawValue) {
    const blobUrl = URL.createObjectURL(rawValue)
    return blobUrl
  }
  return ''
})

watch(
  () => scalePercent.value,
  (val) => {
    scaleFactor.value = val / 100
    reDraw()
  },
)

watch(
  () => rotationPercent.value,
  (val) => {
    rotationFactor.value = Math.max(Math.min(180, (val - 50) * 3.8), -180)
    reDraw()
  },
)

// 初始化canvas
const initDrawer = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  image.src = (fileContent.value?.url || blobRaw.value) ?? '' // 替换为你的图片URL

  image.onload = () => {
    // image aspect ratio
    const aspectRatio = image.width / image.height

    canvasHeight.value = 300
    canvasWidth.value = Math.min(canvasHeight.value * aspectRatio, 700)
    canvas.width = canvasWidth.value
    canvas.height = canvasHeight.value
    scaleFactor.value = Math.min(canvasHeight.value / image.height, 1)
    scale.value = scaleFactor.value
    scalePercent.value = scale.value * 100
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

const reDraw = () => {
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  const currentX = dragData.clientX + dragData.deltaX
  const currentY = dragData.clientY + dragData.deltaY
  // 设置旋转中心点
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const rotationAngle = (rotationFactor.value * Math.PI) / 180 // 角度度转换为弧度
  context.translate(centerX, centerY)
  context.rotate(rotationAngle)
  context.translate(-centerX, -centerY)

  context.drawImage(
    image,
    currentX,
    currentY,
    image.width * scaleFactor.value,
    image.height * scaleFactor.value,
  )
  // 恢复画布坐标系
  context.setTransform(1, 0, 0, 1, 0, 0)
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
  rotationFactor.value = Math.min(180, 15 + rotationFactor.value)
  rotationPercent.value = Math.max(
    Math.min(50 + (rotationFactor.value * 3.8) / 15, 100),
    0,
  )
}

// 逆时针旋转图像
const rotateCounterClockwise = () => {
  rotationFactor.value = Math.max(-180, rotationFactor.value - 15)
  rotationPercent.value = Math.max(
    Math.min(50 + (rotationFactor.value * 3.8) / 15, 100),
    0,
  )
}

// 缩小图像
const zoomOut = () => {
  scalePercent.value = Math.max(scalePercent.value - 1, 0)
  reDraw()
}

// 放大图像
const zoomIn = () => {
  scalePercent.value = Math.min(scalePercent.value + 1, 100)
  reDraw()
}

// Handle mouse down event
const handleMouseDown = (event: MouseEvent) => {
  const { clientX, clientY } = event
  dragData.isDragging = true
  dragData.startX = clientX
  dragData.startY = clientY
}

// Handle mouse move event
const handleMouseMove = (event: MouseEvent) => {
  if (!dragData.isDragging) return
  const { clientX, clientY } = event
  dragData.deltaX = clientX - dragData.startX
  dragData.deltaY = clientY - dragData.startY
  reDraw()
}
const scrollHandler = useDebounceFn((event) => {
  // 获取滚动方向和速度
  var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail))
  // 根据滚动方向执行相应操作
  if (delta < 0) {
    // 向下滚动
    zoomOut()
  } else {
    // 向上滚动
    zoomIn()
  }
}, 5)
// Handle mouse up event
const handleMouseUp = (event: MouseEvent) => {
  dragData.isDragging = false
  const { clientX, clientY } = event
  const deltaX = clientX - dragData.startX
  const deltaY = clientY - dragData.startY
  dragData.clientX += deltaX
  dragData.clientY += deltaY
  dragData.deltaX = 0
  dragData.deltaY = 0
}
onMounted(() => {
  initDrawer()
})
// 截取canvas获取blob
const handleCrop = async () => {
  const canvas = canvasRef.value
  const rectSize = 240
  const rectX = (canvas.width - rectSize) / 2
  const rectY = (canvas.height - rectSize) / 2
  const newCanvas = document.createElement('canvas')
  newCanvas.width = rectSize
  newCanvas.height = rectSize
  // 获取2D上下文对象
  const tempContext: any = newCanvas.getContext(
    '2d',
  ) as CanvasRenderingContext2D

  // 在新的Canvas上绘制裁剪区域
  tempContext.drawImage(
    canvas,
    rectX,
    rectY,
    rectSize,
    rectSize,
    0,
    0,
    rectSize,
    rectSize,
  )
  let blobRawValue
  await getBlobAsync(newCanvas).then(function (blob) {
    blobRawValue = blob
  })
  // 在这里使用blobRaw
  return { blobRaw: blobRawValue, uid: fileContent.value.uid }
}

const getBlobAsync = (newCanvas: HTMLCanvasElement) => {
  return new Promise(function (resolve, reject) {
    newCanvas.toBlob(
      function (blob) {
        resolve(blob)
      },
      'image/jpeg',
      0.8,
    )
  })
}

defineExpose({
  handleCrop,
})
</script>
