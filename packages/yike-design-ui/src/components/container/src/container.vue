<template>
  <div
    class="yk-content"
    @mousemove="moverScroll"
    @mouseup="mouseup"
    @mouseleave="mouseup"
  >
    <div ref="boxRef" class="box" @scroll="scrollChange()">
      <div ref="ulRef">
        <slot></slot>
      </div>
    </div>
    <div
      v-show="isx && show"
      class="scrollx"
      :style="{ bottom: space + 'px', height: size + 'px' }"
    >
      <div
        class="scroll-body"
        :style="{
          width: scrollBodyWidth + 'px',
          left: (boxScrollLeft * boxWidth) / ulWidth + 'px',
        }"
        @mousedown="mousedownX"
      ></div>
    </div>
    <div
      v-show="isy && show"
      class="scrolly"
      :style="{ right: space + 'px', width: size + 'px' }"
    >
      <div
        class="scroll-body"
        :style="{
          height: scrollBodyHeight + 'px',
          top: (boxScrollTop * boxHeight) / ulHeight + 'px',
        }"
        @mousedown="mousedownY"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import '../style'

defineOptions({
  name: 'YkContainer',
})

defineProps({
  size: {
    //滚动条宽度
    type: Number,
    default: 5,
  },
  space: {
    //与边间距
    type: Number,
    default: 2,
  },
  show: {
    //是否显示
    type: Boolean,
    default: true,
  },
})

//获取dome
const boxRef = ref()
const ulRef = ref()

//横向变量
const scrollBodyWidth = ref(0)
const boxScrollLeft = ref(0)
const boxWidth = ref(0)
const ulWidth = ref(0)

//当前鼠标x轴位置
const nowscreenX = ref(0)
//横向是否出现滚动条
const isx = ref(false)

//纵向变量
const scrollBodyHeight = ref(0)
const boxScrollTop = ref(0)
const boxHeight = ref(0)
const ulHeight = ref(0)

//当前鼠标y轴位置
const nowscreenY = ref(0)
//纵向是否出现滚动条
const isy = ref(false)

//当前滚动位置
let nowrollP = 0

//是否触发滚动 -1不滚动、0横向滚动、1纵向滚动
const scrolling = ref(-1)

//移动事件
const scrollChange = () => {
  boxScrollLeft.value = boxRef.value.scrollLeft
  boxScrollTop.value = boxRef.value.scrollTop
}

//鼠标移动事件
const moverScroll = (e: any) => {
  // 横向滚动
  if (scrolling.value == 0) {
    boxRef.value.scrollLeft =
      nowrollP +
      ((e.screenX - nowscreenX.value) * ulWidth.value) / boxWidth.value
  } else if (scrolling.value == 1) {
    boxRef.value.scrollTop =
      nowrollP +
      ((e.screenY - nowscreenY.value) * ulHeight.value) / boxHeight.value
  }
}

//鼠标点击横向
const mousedownX = (e: any) => {
  // console.log(e.screenX);
  scrolling.value = 0
  nowscreenX.value = e.screenX
  //深拷贝
  nowrollP = JSON.parse(JSON.stringify(boxRef.value.scrollLeft))
}

//鼠标点击纵向
const mousedownY = (e: any) => {
  // console.log(e.screenX);
  scrolling.value = 1
  nowscreenY.value = e.screenY
  //深拷贝
  nowrollP = JSON.parse(JSON.stringify(boxRef.value.scrollTop))
}

//鼠标离开/抬起
const mouseup = () => {
  scrolling.value = -1
}

let resizeTimer: number | null = null

function onWindowResize() {
  // 清除之前的计时器
  if (resizeTimer) {
    cancelAnimationFrame(resizeTimer)
  }

  // 创建一个新的计时器
  resizeTimer = requestAnimationFrame(() => {
    boxWidth.value = boxRef.value.clientWidth
    ulWidth.value = ulRef.value.clientWidth
    scrollBodyWidth.value = (boxWidth.value * boxWidth.value) / ulWidth.value
    isx.value = ulWidth.value > boxWidth.value

    //纵向滚动
    boxHeight.value = boxRef.value.clientHeight
    ulHeight.value = ulRef.value.clientHeight
    scrollBodyHeight.value =
      (boxHeight.value * boxHeight.value) / ulHeight.value
    // console.log(ulHeight.value, boxHeight.value)
    isy.value = ulHeight.value > boxHeight.value
  })
}

onMounted(() => {
  onWindowResize()
  // boxRef.value.addEventListener("scroll", scrollLeft);
  window.addEventListener('resize', onWindowResize)
})
</script>
