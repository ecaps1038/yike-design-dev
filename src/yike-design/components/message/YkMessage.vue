<template>
  <transition name="down">
    <div
      class="Yk-message"
      v-if="isShow"
      :style="{ top: offset + 'px' }"
      :class="style[type].icon"
    >
      <div :class="'yk-m-i ' + typeClass[props.type]">
        <Icon :name="style[type].name" :class="style[type].icon" />
        <span class="text">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import type { TType } from './Message.type'
import { Icon } from '@/yike-design'
// 定义一个数据控制显示隐藏，默认是隐藏，组件挂载完毕显示
const isShow = ref<boolean>(false)
const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String as () => TType,
    default: 'success',
  },
  offset: {
    type: Number,
    default: 20,
  },
  onClose: {
    type: Function,
    default: () => ({}),
  },
  id: {
    type: String,
    defaule: '',
  },
  onDestroy: {
    type: Function,
    default: () => ({}),
  },
  duration: {
    type: Number,
    default: 3000,
  },
})
const typeClass = computed(() => {
  return {
    success: 'success',
    error: 'error',
    warning: 'warning',
  }
})
// 定义一个对象，包含三种情况的样式，对象key就是类型字符串
const style: any = {
  warning: {
    icon: 'icon-warning',
    name: 'yike-jinggao',
  },
  error: {
    icon: 'icon-error',
    name: 'yike-cha',
  },
  success: {
    icon: 'icon-success',
    name: 'yike-gou',
  },
}

onMounted(() => {
  // 需调用钩子函数，等dom渲染完成后，再进行赋值，如果在setup中直接赋值，则会被直接渲染成true
  isShow.value = true
  setTimeout(() => {
    close()
    setTimeout(() => {
      props.onDestroy()
    }, 300)
  }, props.duration)
})
const close = () => {
  isShow.value = false
  props.onClose()
}
</script>
<style scoped lang="less">
@import '../../assets/style/yk-index.less';
// 动画效果
.down {
  &-enter {
    &-from {
      transform: translateY(-30px);
      opacity: 0;
    }

    &-active {
      transition: all 0.3s;
    }

    &-to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  &-leave {
    &-from {
      transform: translateY(0px);
      opacity: 1;
    }

    &-active {
      transition: all 0.3s;
    }

    &-to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
}

.Yk-message {
  user-select: none;
  height: 40px;
  position: fixed;
  z-index: 9999;
  line-height: 40px;
  display: flex;
  justify-content: center;
  transition: all 0.3s;
  left: 0;
  right: 0;
  margin: auto;
  width: max-content;
  .yk-m-i {
    padding: 0 20px;
    border-radius: 8px;
    // color: @font-color-l;
    // background: @bg-color-l;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  //   box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  i {
    margin-right: 6px;
    vertical-align: middle;
  }

  .text {
    vertical-align: middle;
    margin-left: 8px;
  }
}

//icon颜色
.icon-success {
  color: @scolor;
}

.icon-warning {
  color: @wcolor;
}

.icon-error {
  color: @ecolor;
}
.success {
  background-color: @scolor-9;
  color: @scolor;
}
.warning {
  background-color: @wcolor-9;
  color: @wcolor;
}
.error {
  background-color: @ecolor-9;
  color: @ecolor;
}
</style>
