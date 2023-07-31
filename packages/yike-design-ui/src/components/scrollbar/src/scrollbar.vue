<template>
  <div
    :class="{
      'yk-scrollbar': true,
      'yk-scrollbar--always': props.always,
      'yk-scrollbar--native': props.native,
    }"
    :style="{ height: scrollHeight }"
  >
    <div ref="boxRef" class="yk-scrollbar__container" @scroll="scrollChange()">
      <div ref="wrapRef">
        <slot></slot>
      </div>
    </div>
    <div
      v-show="isx && show"
      class="yk-scrollbar__x"
      :style="{ bottom: space + 'px', height: size + 'px' }"
    >
      <div
        class="thumb"
        :style="{
          width: scrollBodyWidth + 'px',
          left: (boxScrollLeft * boxWidth) / wrapWidth + 'px',
        }"
        @mousedown="mousedownX"
      ></div>
    </div>
    <div
      v-show="isy && show"
      class="yk-scrollbar__y"
      :style="{ right: space + 'px', width: size + 'px' }"
    >
      <div
        class="thumb"
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
import { ref, computed, onMounted } from 'vue'
import { ScrollbarProps } from './scrollbar'

import { useEventListener } from '@vueuse/core'

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
const mouseX = ref(0)
//当前鼠标y轴位置
const mouseY = ref(0)
//横向是否出现滚动条
const isx = ref(false)

//纵向变量
const scrollBodyHeight = ref(0)
const boxScrollTop = ref(0)
const boxHeight = ref(0)
const ulHeight = ref(0)

//纵向是否出现滚动条
const isy = ref(false)

//当前滚动位置
let scrollPos = 0

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

// 鼠标移动事件
const moverScroll = (e: MouseEvent) => {
  if (scrolling.value == 0) {
    // 计算横向滚动位置
    const delta = e.screenX - mouseX.value
    const newScrollLeft = scrollPos + (delta * wrapWidth.value) / boxWidth.value
    boxRef.value.scrollLeft = newScrollLeft
    emits('scroll', newScrollLeft)
  } else if (scrolling.value == 1) {
    // 计算纵向滚动位置
    const delta = e.screenY - mouseY.value
    const newScrollTop = scrollPos + (delta * ulHeight.value) / boxHeight.value
    boxRef.value.scrollTop = newScrollTop
    emits('scroll', newScrollTop)
  }
}

//鼠标点击横向
const mousedownX = (e: MouseEvent) => {
  scrolling.value = 0
  mouseX.value = e.screenX
  scrollPos = boxRef.value.scrollLeft
  window.addEventListener('mousemove', moverScroll)
  window.addEventListener('mouseup', mouseup)
}

//鼠标点击纵向
const mousedownY = (e: MouseEvent) => {
  scrolling.value = 1
  mouseY.value = e.screenY
  scrollPos = boxRef.value.scrollTop
  window.addEventListener('mousemove', moverScroll)
  window.addEventListener('mouseup', mouseup)
}

//鼠标离开/抬起
const mouseup = () => {
  scrolling.value = -1
  window.removeEventListener('mousemove', moverScroll)
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

    //纵向滚动
    boxHeight.value = boxRef.value.clientHeight
    ulHeight.value = wrapRef.value.clientHeight
    scrollBodyHeight.value =
      (boxHeight.value * boxHeight.value) / ulHeight.value
    isy.value = ulHeight.value > boxHeight.value
  })
}

onMounted(() => {
  if (props.native) {
    return
  }
  onWindowResize()
})
props.native ? null : useEventListener(window, 'resize', onWindowResize)
</script>
