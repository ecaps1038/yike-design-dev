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
import carouselItem from './ykCarouselItem.vue'

const props = defineProps({
  images: {
    type: Array,
  },
  current: {
    type: Number,
    default: 0,
  },
  width: {
    type: String,
    default: 'auto',
  },
  height: {
    type: String,
    default: 'auto',
  },
  direction: {
    type: String,
    default: 'horizontal',
  },
  showtype: {
    type: String,
    default: 'slide',
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  movetime: {
    type: Number,
    default: 3000,
  },

  arrowshow: {
    type: String,
    default: 'always',
  },
  arrowstyle: {
    type: String,
    default: '',
  },
  indicatortype: {
    type: String,
    default: 'dot',
  },
  indicatorshow: {
    type: String,
    default: 'always',
  },
  indicatorpos: {
    type: String,
    default: 'bottom',
  },
  indicatorstyle: {
    type: String,
    default: '',
  },
  transition: {
    type: String,
    default: 'cubic-bezier(0.34, 0.69, 0.1, 1)',
  },
})

const emit = defineEmits(['change'])

console.log(props)

const instance = getCurrentInstance();
const indicatorsLength = ref<number>(0)

const currentIndext = ref(0);

let carouselStyle = ''

const initCarouselStyle = () => {
  if (props.indicatorpos === 'outer-top') {
    carouselStyle = 'margin-top:32px;'
  } else if (props.indicatorpos === 'outer-bottom') {
    carouselStyle = 'margin-bottom:32px;'
  } else if (props.indicatorpos === 'outer-left') {
    carouselStyle = 'margin-left:32px;'
  } else if (props.indicatorpos === 'outer-right') {
    carouselStyle = 'margin-right:32px;'
  }
  carouselStyle += `width:${props.width}px;height:${props.height}px`
  console.log(carouselStyle)
}
const initIndicators = () => {
  if (typeof (instance?.slots._) !== 'undefined') {
    indicatorsLength.value = instance?.slots.default().length as number;
  } else if (props?.images) {
    indicatorsLength.value = props?.images?.length
  }

  currentIndext.value = props.current
}


onMounted(() => {
  initCarouselStyle()
  initIndicators()
});

onUpdated(() => {

})

onUnmounted(() => {

})

watch(props, () => {

})

const indicatorsLengthArray = computed(() => {
  return Array.from(Array(indicatorsLength.value).keys()).map((_, index) => index); // 创建包含指定长度数字的数组
})

const prevMove = () => {

  if (currentIndext.value <= 0) {
    currentIndext.value = indicatorsLength.value - 1
  } else {
    currentIndext.value -= 1
  }

  console.log('后退', currentIndext.value)

}

const nextMove = () => {
  if (currentIndext.value >= indicatorsLength.value - 1) {
    currentIndext.value = 0
  } else {
    currentIndext.value += 1
  }
  console.log('前进', currentIndext.value)

}

const switchIndicator = (index: number) => {
  currentIndext.value = index
}

</script>

<template>
  <div class="yk-carousel" ref="carousel" :style="carouselStyle"
    :class="['arrows-' + arrowshow, 'indicators-' + indicatorshow]">
    <div class="arrows" :class="['arrows-' + direction]">
      <div :style="arrowstyle" class="arrows-item" :class="direction === 'horizontal' ? 'arrows-left' : 'arrows-top'"
        @click="prevMove">
        <Icon class="arrows-icon" :name="direction === 'horizontal' ? 'yk-xiangzuo' : 'yk-xiangshang'" />
      </div>
      <div class="arrows-item" :class="direction === 'horizontal' ? 'arrows-right' : 'arrows-bottom'" @click="nextMove">
        <Icon class="arrows-icon" :name="direction === 'horizontal' ? 'yk-xiangyou' : 'yk-xiangxia'" />
      </div>
    </div>

    <div v-if="indicatorsLength > 0" class="indicators"
      :class="['indicators-' + indicatortype, arrowshow !== 'never' ? direction === 'horizontal' ? (indicatorpos === 'top' || indicatorpos === 'outer-top' || indicatorpos === 'bottom' || indicatorpos === 'outer-bottom') ? 'indicatorpos-' + indicatorpos : 'indicatorpos-bottom' : (indicatorpos === 'left' || indicatorpos === 'outer-left' || indicatorpos === 'right' || indicatorpos === 'outer-right') ? 'indicatorpos-' + indicatorpos : 'indicatorpos-left' : 'indicatorpos-' + indicatorpos]">
      <div v-for="(item, index) in  indicatorsLengthArray " class="indicators-item" :style="indicatorstyle"
        :class="[{ 'indicators-active': item === currentIndext }]" @click="switchIndicator(item)"></div>
    </div>

    <div class="images" v-if="images">
      <CarouselItem v-for="( item, index ) in  images " :key="index" :src="item"></CarouselItem>
    </div>
    <slot v-else></slot>
  </div>
</template>

<style lang="less">
@import '../../assets/style/yk-index.less';

.yk-carousel {
  position: relative;
  background-color: #2B5AED;

  .arrows {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;


    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      pointer-events: all;
      padding: 8px;
      border-radius: 50%;
      z-index: 999;
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

    &-icon {
      color: #FFFFFF;
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
  }

  .indicators-dot {
    .indicators-item {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      pointer-events: all;
      cursor: pointer;
      z-index: 999;
    }

    .indicators-active {
      width: 9px;
      height: 9px;
      background: rgba(255, 255, 255, 1);
    }
  }

  .indicators-line {
    .indicators-item {
      width: 12px;
      height: 4px;
      border-radius: 30%;
      background-color: rgba(255, 255, 255, 0.3);
      pointer-events: all;
      cursor: pointer;
      z-index: 999;
    }

    .indicators-active {
      width: 15px;
      height: 5px;
      background: rgba(255, 255, 255, 1);
    }
  }

  .indicatorpos-bottom {
    width: 100%;
    bottom: 16px;

    .indicators-item {
      margin: 0 4px;
    }

  }

  .indicatorpos-top {
    width: 100%;
    top: 16px;

    .indicators-item {
      margin: 0 4px;
    }
  }

  .indicatorpos-left {
    height: 100%;
    flex-direction: column;
    left: 16px;

    .indicators-item {
      margin: 4px 0;
    }
  }

  .indicatorpos-right {
    height: 100%;
    flex-direction: column;
    right: 16px;

    .indicators-item {
      margin: 4px 0;
    }
  }


  .indicatorpos-outer-top {
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

  .indicatorpos-outer-bottom {
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

  .indicatorpos-outer-left {
    height: 100%;
    flex-direction: column;
    left: -16px;
    padding-right: 8px;

    .indicators-item {
      margin: 4px 0;
      background: rgba(163, 162, 162, 0.5);
    }

    .indicators-active {
      background: rgb(80, 80, 80);
    }
  }

  .indicatorpos-outer-right {
    height: 100%;
    flex-direction: column;
    right: -16px;

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
    transition: opacity 0.3s;
  }

  &:hover>.arrows {
    opacity: 1;
  }
}

.arrows-never {
  .arrows {
    display: none;
  }
}

.indicators-always {}



.indicators-hover {
  .indicators {
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover>.indicators {
    opacity: 1;
  }
}

.indicators-never {
  .indicators {
    display: none;
  }
}
</style>
