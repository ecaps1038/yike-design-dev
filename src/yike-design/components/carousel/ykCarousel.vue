<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  watch,
} from 'vue'
const props = defineProps({
  images: {
    type: Array,
  },
  current: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  direction: {
    type: String,
    default: 'horizontal',
  },
  showType: {
    type: String,
    default: 'slide',
  },
  autoPlay: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    default: 2000,
  },

  arrowShow: {
    type: String,
    default: 'always',
  },
  arrowStyle: {
    type: String,
    default: '',
  },
  indicatorType: {
    type: String,
    default: 'dot',
  },
  indicatorShow: {
    type: String,
    default: 'always',
  },
  indicatorPosition: {
    type: String,
    default: 'bottom',
  },
  indicatorStyle: {
    type: String,
    default: '',
  },
  indicatorActiveStyle: {
    type: String,
    default: '',
  },
  transition: {
    type: String,
    default: 'all 0.3s cubic-bezier(0.34, 0.69, 0.1, 1)',
  },
})

const emit = defineEmits(['change'])

console.log(props)

const instance = getCurrentInstance()
const indicatorsLength = ref<number>(0)

const currentIndex = ref(0)
const prevIndex = ref(0)
const nextIndex = ref(0)

const imagesRef = ref(null)

let carouselStyle = ''
let carouselWidth = ''
let carouselHeight = ''

let ARROWSCLICK = true
/**
 * @description 轮播图组件样式初始化
 */
const initCarouselStyle = () => {
  if (props.indicatorPosition === 'outer-top') {
    carouselStyle = 'margin-top:32px;'
  } else if (props.indicatorPosition === 'outer-bottom') {
    carouselStyle = 'margin-bottom:32px;'
  } else if (props.indicatorPosition === 'outer-left') {
    carouselStyle = 'margin-left:32px;'
  } else if (props.indicatorPosition === 'outer-right') {
    carouselStyle = 'margin-right:32px;'
  }
  carouselWidth = `${parseInt(props.width)}px`
  carouselHeight = `${parseInt(props.height)}px`
  if (isNaN(parseInt(props.width))) {
    carouselWidth = '100%'
  }
  if (isNaN(parseInt(props.height))) {
    carouselHeight = '100%'
  }
  carouselStyle += `width:${carouselWidth};height:${carouselHeight};`

  // console.log(carouselStyle)
}

/**
 * @description 轮播图指示器初始化
 */
const initIndicators = () => {
  indicatorsLength.value = imagesRef.value.children.length

  imagesRef.value.children[props.current].classList.add('active')
}

/**
 * @description 初始化轮播图片位置
 */
const initImagesPos = () => {
  let prevEl = imagesRef.value.children[indicatorsLength.value - 1]
  let nextEl = imagesRef.value.children[currentIndex.value + 1]
  let curEl = imagesRef.value.children[currentIndex.value]
  if (props.direction === 'horizontal') {
    if (props.showType === 'slide' || props.showType === 'multiSlide') {
      prevEl.style.left = -props.width + 'px'
      nextEl.style.left = props.width + 'px'
      curEl.style.left = 0 + 'px'
    }
  } else if (props.direction === 'vertical') {
    if (props.showType === 'slide' || props.showType === 'multiSlide') {
      prevEl.style.top = -props.height + 'px'
      nextEl.style.top = props.height + 'px'
      curEl.style.top = 0 + 'px'
    }
  }
}

/**
 * @description 自动播放
 */
const initAutoPlay = () => {
  let timer;
  if (props.autoPlay === true) {
    timer = setInterval(() => {
      nextMove()
    }, props.duration)
  } else if (props.autoPlay === false) {
    timer = null;
  }
}

/**
 * @description 初始化播放动画曲线
 */
const initTransition = () => {
  let images = imagesRef.value.children
  for (let item of images) {
    item.style.transition = props.transition
  }
}
onMounted(() => {
  initCarouselStyle()
  initIndicators()
  initImagesPos()
  initAutoPlay()
  initTransition()
})

onUpdated(() => { })

onUnmounted(() => { })

watch(props, (newVal, oldVal) => {
  initAutoPlay()
})

const indicatorsLengthArray = computed(() => {
  return Array.from(Array(indicatorsLength.value).keys()).map(
    (_, index) => index,
  ) // 创建包含指定长度数字的数组
})

const prevMove = () => {
  if (ARROWSCLICK === true) {
    ARROWSCLICK = false
    prevIndex.value = currentIndex.value
    currentIndex.value =
      currentIndex.value > 0
        ? currentIndex.value - 1
        : indicatorsLength.value - 1
    nextIndex.value =
      currentIndex.value > 0
        ? currentIndex.value - 1
        : indicatorsLength.value - 1
    arrowsSwitchIndex(
      'prev',
      prevIndex.value,
      currentIndex.value,
      nextIndex.value,
    )
    setTimeout(() => {
      ARROWSCLICK = true
    }, 300)
  }
}

const nextMove = () => {
  if (ARROWSCLICK === true) {
    ARROWSCLICK = false
    prevIndex.value = currentIndex.value
    currentIndex.value =
      currentIndex.value < indicatorsLength.value - 1
        ? currentIndex.value + 1
        : 0
    nextIndex.value =
      currentIndex.value < indicatorsLength.value - 1
        ? currentIndex.value + 1
        : 0
    arrowsSwitchIndex(
      'next',
      prevIndex.value,
      currentIndex.value,
      nextIndex.value,
    )
    setTimeout(() => {
      ARROWSCLICK = true
    }, 300)
  }
}

const arrowsSwitchIndex = (
  arrow: string,
  prev: number,
  cur: number,
  next: number,
) => {
  // console.log(arrow, prev, cur, next)
  let prevEl = imagesRef.value.children[prev]
  let curEl = imagesRef.value.children[cur]
  let nextEl = imagesRef.value.children[next]
  if (props.direction === 'horizontal') {
    if (props.showType === 'slide' || props.showType === 'multiSlide') {
      prevEl.style.opacity = 1
      curEl.style.opacity = 1
      nextEl.style.opacity = 0
      if (arrow === 'prev') {
        prevEl.style.left = props.width + 'px'
        curEl.style.left = 0 + 'px'
        nextEl.style.left = -props.width + 'px'
      } else if (arrow === 'next') {
        prevEl.style.left = -props.width + 'px'
        curEl.style.left = 0 + 'px'
        nextEl.style.left = props.width + 'px'
      }
    }
  } else if (props.direction === 'vertical') {
    if (props.showType === 'slide' || props.showType === 'multiSlide') {
      prevEl.style.zIndex = '1000'
      curEl.style.zIndex = '1000'
      nextEl.style.zIndex = '1000'
      prevEl.style.opacity = 1
      curEl.style.opacity = 1
      nextEl.style.opacity = 0
      if (arrow === 'prev') {
        prevEl.style.top = props.height + 'px'
        curEl.style.top = 0 + 'px'
        nextEl.style.top = -props.height + 'px'
      } else if (arrow === 'next') {
        prevEl.style.top = -props.height + 'px'
        curEl.style.top = 0 + 'px'
        nextEl.style.top = props.height + 'px'
      }
    }
  }

  imagesRef.value.children[cur].classList.add('active')
  imagesRef.value.children[prev].classList.remove('active')
}

const switchIndicator = (index: number) => {
  if (ARROWSCLICK === true) {
    ARROWSCLICK = false
    prevIndex.value = currentIndex.value
    currentIndex.value = index
    imagesRef.value.children[prevIndex.value].classList.add('active')
    imagesRef.value.children[currentIndex.value].classList.remove('active')
    setTimeout(() => {
      ARROWSCLICK = true
    }, 300)
  }
}
</script>

<template>
  <div class="yk-carousel" ref="carousel" :style="carouselStyle"
    :class="['arrows-' + arrowShow, 'indicators-' + indicatorShow]">
    <div class="arrows" :class="['arrows-' + direction]">
      <div :style="arrowStyle" class="arrows-item" :class="direction === 'horizontal' ? 'arrows-left' : 'arrows-top'"
        @click="prevMove">
        <Icon class="arrows-icon" :name="direction === 'horizontal' ? 'yk-xiangzuo' : 'yk-xiangshang'" />
      </div>
      <div :style="arrowStyle" class="arrows-item" :class="direction === 'horizontal' ? 'arrows-right' : 'arrows-bottom'"
        @click="nextMove">
        <Icon class="arrows-icon" :name="direction === 'horizontal' ? 'yk-xiangyou' : 'yk-xiangxia'" />
      </div>
    </div>

    <div v-if="indicatorsLength > 0" class="indicators" :class="[
      arrowShow !== 'hidden'
        ? direction === 'horizontal'
          ? indicatorPosition === 'top' ||
            indicatorPosition === 'outer-top' ||
            indicatorPosition === 'bottom' ||
            indicatorPosition === 'outer-bottom'
            ? 'indicatorPosition-' + indicatorPosition
            : 'indicatorPosition-bottom'
          : indicatorPosition === 'left' ||
            // eslint-disable-next-line prettier/prettier
            indicatorPosition === 'outer-left' ||
            indicatorPosition === 'right' ||
            indicatorPosition === 'outer-right'
            ? 'indicatorPosition-' + indicatorPosition
            : 'indicatorPosition-left'
        : 'indicatorPosition-' + indicatorPosition,
    ]">
      <div :class="['indicators-' + indicatorType]">
        <div v-for="(item, index) in indicatorsLengthArray" :key="index" class="indicators-item"
          :style="[item === currentIndex ? indicatorActiveStyle : indicatorStyle]"
          :class="[{ 'indicators-active': item === currentIndex }]" @click="switchIndicator(item)"></div>
      </div>
    </div>
    <div class="images" :class="'showType-' + showType">
      <div class="images-container" :class="`showType-` + showType + '-' + direction" ref="imagesRef">
        <CarouselItem v-if="images" v-for="(item, index) in images" :key="index">
          <img :src="item" alt="" />
        </CarouselItem>
        <slot v-if="!images"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '../../assets/style/yk-index.less';

.yk-carousel {
  position: relative;
  background-color: #2b5aed;

  .arrows {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
    z-index: 999;

    &-item {
      cursor: pointer;
      pointer-events: all;

      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      color: #ffffff;
    }

    &-left {
      margin-left: 16px;
    }

    &-right {
      margin-right: 16px;
    }

    &-top {
      margin-top: 16px;
    }

    &-bottom {
      margin-bottom: 16px;
    }
  }

  .arrows-horizontal {}

  .arrows-vertical {
    flex-direction: column;
  }

  .indicators {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    transition: all 0.5s;
    z-index: 999;
  }

  .indicators-dot {
    display: flex;
    justify-content: center;
    align-items: center;

    .indicators-item {
      pointer-events: all;
      cursor: pointer;

      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
    }

    .indicators-active {
      background: rgba(255, 255, 255, 1);
    }
  }

  .indicators-line {
    display: flex;
    justify-content: center;
    align-items: center;

    .indicators-item {
      pointer-events: all;
      cursor: pointer;

      width: 12px;
      height: 4px;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.3);
    }

    .indicators-active {
      background: rgba(255, 255, 255, 1);
    }
  }

  .indicators-slider {
    display: flex;
    justify-content: center;
    align-items: center;

    .indicators-item {
      pointer-events: all;
      cursor: pointer;

      width: 12px;
      height: 4px;
      background-color: rgba(255, 255, 255, 0.3);
      margin: 0 !important;
      transition: all 0.3s ease-in-out;
    }

    :first-child {
      border-radius: 8px 0 0 8px;
    }

    :last-child {
      border-radius: 0 8px 8px 0;
    }

    .indicators-active {
      background: rgba(255, 255, 255, 1);
    }
  }

  .indicatorPosition-bottom {
    width: 100%;
    bottom: 16px;

    .indicators-item {
      margin: 0 4px;
    }
  }

  .indicatorPosition-top {
    width: 100%;
    top: 16px;

    .indicators-item {
      margin: 0 4px;
    }
  }

  .indicatorPosition-left {
    height: 100%;
    left: 16px;

    .indicators-dot,
    .indicators-line,
    .indicators-slider {
      flex-direction: column;
    }

    .indicators-slider {
      .indicators-item {
        width: 4px;
        height: 12px;
      }
    }

    .indicators-item {
      margin: 4px 0;
    }
  }

  .indicatorPosition-right {
    height: 100%;
    right: 16px;

    .indicators-dot,
    .indicators-line,
    .indicators-slider {
      flex-direction: column;
    }

    .indicators-slider {
      .indicators-item {
        width: 4px;
        height: 12px;
      }
    }

    .indicators-item {
      margin: 4px 0;
    }
  }

  .indicatorPosition-outer-top {
    width: 100%;
    top: -16px;

    .indicators-item {
      margin: 0 4px;
      background: rgba(163, 162, 162, 0.5);
    }

    .indicators-active {
      background: rgb(80, 80, 80);
    }
  }

  .indicatorPosition-outer-bottom {
    width: 100%;
    bottom: -16px;

    .indicators-item {
      margin: 0 4px;
      background: rgba(163, 162, 162, 0.5);
    }

    .indicators-active {
      background: rgb(80, 80, 80);
    }
  }

  .indicatorPosition-outer-left {
    height: 100%;
    left: -16px;
    padding-right: 8px;

    .indicators-dot,
    .indicators-line,
    .indicators-slider {
      flex-direction: column;
    }

    .indicators-slider {
      .indicators-item {
        width: 4px;
        height: 12px;
      }
    }

    .indicators-item {
      margin: 4px 0;
      background: rgba(163, 162, 162, 0.5);
    }

    .indicators-active {
      background: rgb(80, 80, 80);
    }
  }

  .indicatorPosition-outer-right {
    height: 100%;
    right: -16px;

    .indicators-dot,
    .indicators-line,
    .indicators-slider {
      flex-direction: column;
    }

    .indicators-slider {
      .indicators-item {
        width: 4px;
        height: 12px;
      }
    }

    .indicators-item {
      margin: 4px 0;
      background: rgba(163, 162, 162, 0.5);
    }

    .indicators-active {
      background: rgb(80, 80, 80);
    }
  }
}

.arrows-always {}

.arrows-hover {
  .arrows {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover>.arrows {
    opacity: 1;
  }
}

.arrows-hidden {
  .arrows {
    display: none;
  }
}

.indicators-always {}

.indicators-hover {
  .indicators {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover>.indicators {
    opacity: 1;
  }
}

.indicators-hidden {
  .indicators {
    display: none;
  }
}

.images {
  z-index: 888;
  overflow: hidden;
}

.showType-slide {
  width: 100%;
  height: 100%;

  .images-container {
    width: 100%;
    height: 100%;
  }

  .yk-carouselItem {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 998;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .active {
    z-index: 999;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-horizontal {
    .yk-carouselItem {
      transition: left 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
    }
  }

  &-vertical {
    .yk-carouselItem {
      transition: top 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
    }
  }
}

.showType-fade {
  width: 100%;
  height: 100%;

  .images-container {
    width: 100%;
    height: 100%;
  }

  .yk-carouselItem {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
    opacity: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .active {
    opacity: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-horizontal {}

  &-vertical {}
}
</style>
