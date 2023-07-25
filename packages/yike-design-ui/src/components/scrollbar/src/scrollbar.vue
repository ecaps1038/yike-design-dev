<template>
  <div
    class="yk-scrollbar"
    :class="{
      'yk-scrollbar--always': $props.always,
      'yk-scrollbar--native': $props.native,
    }"
    :style="{ height: scrollHeight }"
    @mousemove="moverScroll"
    @mouseup="mouseup"
    @mouseleave="mouseup"
  >
    <div ref="boxRef" class="box" @scroll="scrollChange()">
      <div ref="wrapRef" style="width: fit-content">
        <slot></slot>
      </div>
    </div>
    <div
      v-show="isx && show"
      class="scrollx"
      :style="{ bottom: space + 'px', height: size + 'px' }"
    >
      <thumb
        class="thumb"
        :style="{
          width: scrollBodyWidth + 'px',
          left: (boxScrollLeft * boxWidth) / wrapWidth + 'px',
        }"
        @mousedown="mousedownX"
      ></thumb>
    </div>
    <div
      v-show="isy && show"
      class="scrolly"
      :style="{ right: space + 'px', width: size + 'px' }"
    >
      <thumb
        class="thumb"
        :style="{
          height: scrollBodyHeight + 'px',
          top: (boxScrollTop * boxHeight) / ulHeight + 'px',
        }"
        @mousedown="mousedownY"
      ></thumb>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ScrollbarProps } from './scrollbar'
import '../style'
import thumb from './thumb.vue'

defineOptions({
  name: 'YkScrollbar',
})
const emits = defineEmits(['scroll'])
const props = withDefaults(defineProps<ScrollbarProps>(), {
  size: 5,
  space: 2,
  show: true,
  always: false,
})

//获取dome
const boxRef = ref()
const wrapRef = ref()

//横向变量
const scrollBodyWidth = ref(0)
const boxScrollLeft = ref(0)
const boxWidth = ref(0)
const wrapWidth = ref(0)

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

// 容器高度
const scrollHeight = computed(() => {
  if (props.height) {
    if (typeof props.height == 'number') {
      return props.height + 'px'
    } else {
      return props.height
    }
  } else {
    return '100%'
  }
})

//移动事件
const scrollChange = () => {
  boxScrollLeft.value = boxRef.value.scrollLeft
  boxScrollTop.value = boxRef.value.scrollTop
  if (isy.value) {
    emits('scroll', boxRef.value.scrollTop)
  } else if (isx.value) {
    emits('scroll', boxRef.value.scrollLeft)
  }
}

//鼠标移动事件
const moverScroll = (e: any) => {
  // 横向滚动
  if (scrolling.value == 0) {
    boxRef.value.scrollLeft =
      nowrollP +
      ((e.screenX - nowscreenX.value) * wrapWidth.value) / boxWidth.value
    emits('scroll', boxRef.value.scrollLeft)
  } else if (scrolling.value == 1) {
    boxRef.value.scrollTop =
      nowrollP +
      ((e.screenY - nowscreenY.value) * ulHeight.value) / boxHeight.value
    emits('scroll', boxRef.value.scrollTop)
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
    wrapWidth.value = wrapRef.value.clientWidth
    scrollBodyWidth.value = (boxWidth.value * boxWidth.value) / wrapWidth.value
    isx.value = wrapWidth.value > boxWidth.value
    //console.log(wrapWidth.value, boxWidth.value)

    //纵向滚动
    boxHeight.value = boxRef.value.clientHeight
    ulHeight.value = wrapRef.value.clientHeight
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
