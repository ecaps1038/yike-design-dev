<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
  },
  shape: {
    //按钮形状round/圆角、circle/圆、square/正方形
    type: String,
    default: '',
  },
  status: {
    //按钮状态normal/success/warning/danger/primary
    type: String,
    default: 'normal',
  },
  size: {
    //ss/s/m/l
    type: String,
    default: 'l',
  },
  long: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
  },
})

//获取元素高度
const ykShape = ref(['', ''])

//按钮形状shape设置round/圆角、circle/圆、square/正方
const btShape = (shape: string): [string, string] => {
  switch (shape) {
    case 'round':
      return ['200px', 'auto']
    case 'circle':
      return ['200px', '0']
    case 'square':
      return ['auto', '0']
    default:
      return ['auto', 'auto']
  }
}

//按钮状态normal/success/warning/danger
const btStatus = (status: string): string => {
  switch (status) {
    case 'primary':
      return 'pcolor'
    case 'success':
      return 'success'
    case 'warning':
      return 'warning'
    case 'danger':
      return 'danger'
    default:
      if (props.type == 'primary') {
        return 'pcolor'
      } else {
        return 'fcolor'
      }
  }
}

ykShape.value = btShape(props.shape)
</script>

<template>
  <div
    :class="{ disabled: disabled, loading: loading }"
    :style="{ width: long ? '100%' : 'auto' }"
    class="yk-buttons"
  >
    <div
      class="yk-button"
      :class="[type, size, btStatus(status)]"
      :style="{ width: long ? '100%' : 'auto' }"
    >
      <div class="yk-button-bg" :style="{ borderRadius: ykShape[0] }"></div>
      <p class="yk-buton-name" :style="{ padding: ykShape[1] }">
        <svg viewBox="25 25 50 50" v-show="loading">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.yk-buttons {
  display: inline-block;
}
.yk-button {
  vertical-align: top;
  align-items: center;
  cursor: pointer;
  text-align: center;

  .yk-buton-name {
    width: auto;
    transition: color @animatf;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .yk-button-bg {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    box-sizing: border-box;
    transition: all @animatf;
  }
}

//size
.s {
  .yk-button-bg {
    border-radius: @radius-s;
  }

  height: 24px;

  .yk-buton-name {
    padding: 0 8px;
    min-width: 24px;
    font-size: @size-ss;
  }
}
.m {
  .yk-button-bg {
    border-radius: @radius-s;
  }

  .yk-buton-name {
    padding: 0 16px;
    min-width: 32px;
  }

  height: 32px;
}

.l {
  height: 36px;

  .yk-buton-name {
    min-width: 36px;
    padding: 0 16px;
  }

  .yk-button-bg {
    border-radius: @radius-m;
  }
}

.xl {
  height: 48px;

  .yk-buton-name {
    font-size: @size-m;
    padding: 0 24px;
    min-width: 48px;
  }

  .yk-button-bg {
    border-radius: @radius-m;
  }
}

//按钮状态color
.pcolor {
  .yk-button-bg {
    background-color: @pcolor;
    border-color: @pcolor;
  }

  .yk-buton-name {
    color: @pcolor;
    circle {
      stroke: @pcolor;
    }
  }
}

.fcolor {
  .yk-button-bg {
    background-color: @font-color-l;
    border-color: @font-color-l;
  }

  .yk-buton-name {
    color: @font-color-l;
    circle {
      stroke: @font-color-l;
    }
  }
}

.success {
  .yk-button-bg {
    background-color: @scolor;
    border-color: @scolor;
  }

  .yk-buton-name {
    color: @scolor;
    circle {
      stroke: @scolor;
    }
  }
}

.warning {
  .yk-button-bg {
    background-color: @wcolor;
    border-color: @wcolor;
  }

  .yk-buton-name {
    color: @wcolor;
    circle {
      stroke: @wcolor;
    }
  }
}

.danger {
  .yk-button-bg {
    background-color: @ecolor;
    border-color: @ecolor;
  }

  .yk-buton-name {
    color: @ecolor;
    circle {
      stroke: @ecolor;
    }
  }
}

//type基本样式
.primary {
  .yk-buton-name {
    color: #fff;
    circle {
      stroke: #fff;
    }
  }

  &:hover {
    .yk-button-bg {
      opacity: 0.85;
    }
  }

  &:active {
    .yk-button-bg {
      opacity: 1;
    }
  }
}

.sceondary {
  .yk-button-bg {
    opacity: 0.08;
  }

  &:hover {
    .yk-button-bg {
      opacity: 0.12;
    }
  }

  &:active {
    .yk-button-bg {
      opacity: 0.08;
    }
  }
}

.outline {
  .yk-button-bg {
    background-color: transparent;
    border-width: 1px;
    border-style: solid;
    opacity: 0.16;
  }

  &:hover {
    .yk-button-bg {
      opacity: 0.24;
    }
  }

  &:active {
    .yk-button-bg {
      background-color: transparent;
      opacity: 0.16;
    }
  }
}

//loading动画
svg {
  width: 16px;
  transform-origin: center;
  animation: rotate4 2s linear infinite;
  margin-right: 4px;
}

circle {
  fill: none;
  //  stroke: hsl(214, 97%, 59%);
  stroke-width: 3;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash4 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
