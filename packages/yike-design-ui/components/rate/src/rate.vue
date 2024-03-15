<template>
  <div
    :class="bem([size], { disabled: disabled, readonly: readonly })"
    @mouseleave="handleLeave()"
  >
    <div
      v-for="n in numberCount"
      :key="n"
      :class="ykRateItemClass(n)"
      :style="animationStyle(n)"
      @animationend="handleAnimationEnd(n)"
    >
      <div
        v-show="allowHalf"
        :class="halfClass(n)"
        :style="{ color: color }"
        @mouseenter="handleEnter(n - 0.5)"
        @click="handleClick(n - 0.5)"
      >
        <!-- <slot name="character"></slot> -->
        <component
          :is="icon"
          :class="halfIconClass"
          :style="{ color: color }"
        ></component>
      </div>
      <!-- <slot name="character"></slot> -->
      <component
        :is="icon"
        :class="iconClass(n)"
        :style="{ color: showValue >= n && color ? color : '' }"
        @mouseenter="handleEnter(n)"
        @click="handleClick(n)"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RateProps } from './rate'
import { computed, onMounted, ref } from 'vue'
import { createCssScope } from '../../utils'

defineOptions({
  name: 'YkRate',
})

const showValue = ref(0) // 显示的星星数
const value = ref(0) // 实际的星星数
const animation = ref(false) // 动画开关
const props = withDefaults(defineProps<RateProps>(), {
  count: 5, // 最大星星数
  modelValue: 0, // 双向绑定
  defaultValue: 0, // 默认值
  allowHalf: false, // 是否可以半选
  allowClear: false, // 是否可以清除
  grading: false, //
  readonly: false, // 只读
  disabled: false, // 禁用
  color: '',
  icon: 'IconStarFill',
  size: 'l',
})

const bem = createCssScope('rate')
const emits = defineEmits(['update:modelValue', 'change', 'hover-change'])

onMounted(() => {
  if (props.defaultValue) {
    showValue.value = Number(props.defaultValue)
    value.value = Number(props.defaultValue)
  }
  if (props.modelValue) {
    showValue.value = Number(props.modelValue)
    value.value = Number(props.modelValue)
  }
})

// eslint-disable-next-line unused-imports/no-unused-vars
const rateClass = computed(() => {
  return {
    'yk-rate-disabled': props.disabled,
    'yk-rate-readonly': props.readonly,
  }
})
const numberCount = computed(() => Number(props.count))

const writeabled = computed(() => props.disabled || props.readonly)

const animationStyle = computed(() => {
  return (n: number) =>
    animation.value ? { animationDelay: `${50 * n}ms` } : undefined
})

const ykRateItemClass = computed(() => {
  return (n: number) => {
    const classList = [
      ' yk-rate-item',
      animation.value && value.value > n ? 'yk-rate-item--animation' : '',
    ]
    return classList.join(' ')
  }
})

const ykIconSizeClass = computed(() => {
  return `yk-rate-icon-${props.size}`
})

const halfClass = computed(() => {
  return (n: number) => {
    const classList = [
      'yk-rate-half',
      showValue.value + 0.5 === n ? 'yk-rate-half--select' : '',
    ]
    return classList.join(' ')
  }
})

const halfIconClass = computed(() => {
  const classList = ['yk-rate-half-icon', ykIconSizeClass.value]
  return classList.join(' ')
})

const iconClass = computed(() => {
  return (n: number) => {
    const classList = [
      'yk-rate-icon',
      showValue.value >= n ? 'yk-rate-icon--select' : '',
      ykIconSizeClass.value,
    ]
    return classList.join(' ')
  }
})

// 鼠标移出
const handleLeave = () => {
  showValue.value = value.value
}

//鼠标移入
const handleEnter = (n: number) => {
  if (writeabled.value) {
    return
  }
  showValue.value = n
  emits('hover-change', n)
}

//点击确定分数
const handleClick = (n: number) => {
  if (writeabled.value) {
    return
  }
  animation.value = true

  // 可以清空，并且点击的是已经选中的星星，清空真实的星星数（显示星星数等鼠标移出时更新）
  if (props.allowClear && value.value === n) {
    value.value = 0
    return
  }
  value.value = n
  updateModelValue(n)
}
const handleAnimationEnd = (n: number) => {
  if (animation.value && n == Math.ceil(value.value) - 1) {
    animation.value = false
  }
}

// 更新
const updateModelValue = (n: number) => {
  if (props.modelValue) {
    emits('update:modelValue', n)
    emits('change', n)
  }
}
</script>
