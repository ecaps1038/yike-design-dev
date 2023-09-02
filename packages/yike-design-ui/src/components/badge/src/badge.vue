<template>
  <div ref="badgeRef" class="yk-badge">
    <!-- 徽标 -->
    <div ref="supRef" class="yk-badge__sup">
      <transition name="modal">
        <div
          v-if="isShowDot"
          :class="['yk-badge__dot', dotClass]"
          :style="dotStyle"
        ></div>
      </transition>
      <transition name="modal">
        <div
          v-if="isShowCount"
          :class="['yk-badge__count', countClass]"
          :style="countStyle"
        >
          {{ showCount }}
        </div>
      </transition>
    </div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { BadgeProps } from './badge'
import { ref, computed, CSSProperties, onMounted, useSlots } from 'vue'

defineOptions({
  name: 'YkBadge',
})

// ======================= props ===========================
const props = withDefaults(defineProps<BadgeProps>(), {
  count: 0,
  border: 0,
  overflowCount: 99,
  showZero: false,
  status: 'danger',
  hidden: false,
})

// ======================== dot ============================

// 是否是点类型
const isDot = computed(() => props?.isDot ?? false)

// 是否展示dot
const isShowDot = computed(() => {
  return isDot.value && !props.hidden
})

const dotStyle = computed<CSSProperties>(() => {
  const styles: CSSProperties = {}
  if (props.color) {
    styles.background = props.color
  }

  // 自定义了border时候
  if (props.border !== 2) {
    styles.boxShadow = `#ffffff 0 0 0 ${props.border}px`
  }

  return styles
})

const dotClass = computed(() => {
  return {
    'yk-badge__dot--inner': props.inDot,
    [`yk-badge__dot--${props.status}`]: props.status !== undefined,
    'yk-badge__dot--stand': !!useSlots().default === false,
  }
})

// ======================== count ============================

// 是否展示count
const isShowCount = computed(() => {
  const countZeroHidden = props.count === 0 && !props.showZero
  const countNormalHidden = props.count < 0
  if (props.hidden || isShowDot.value || countZeroHidden || countNormalHidden) {
    return false
  }
  return true
})

// 展示的count
const showCount = computed(() => {
  if (props.count && props.count > props.overflowCount) {
    return Math.min(props.count!, props.overflowCount) + '+'
  } else {
    return props.count + ''
  }
})

// 展示的count，是否是圆形
const isRound = () => {
  if (isDot.value) {
    return true
  } else {
    return showCount.value && showCount.value.toString().length === 1
  }
}

// dom
const badgeRef = ref()
const supRef = ref()

const countStyle = computed<CSSProperties>(() => {
  const styles: CSSProperties = {}

  // 默认右上角
  styles.translate = `50% -50%`

  // count的方位  定位右边，就左移动，左边，就右边移动
  if (props.offset && props.offset === 'right') {
    styles.translate = `-16px ${offsetValue.value}px`
  } else if (props.offset && props.offset === 'left') {
    styles.translate = `16px ${offsetValue.value}px`
  }

  // 自定义border时候
  if (props.border !== 2) {
    styles.boxShadow = `#ffffff 0 0 0 ${props.border}px`
  }

  // 自定义offset时候
  if (Array.isArray(props.offset)) {
    styles.translate = `${props.offset[0]}px ${props.offset[1]}px`
  }

  // color
  if (props.color) {
    styles.background = props.color
  }

  if (!!useSlots().default === false) {
    return { background: props.color }
  }

  return styles
})

let badgeHeight = ref(0)
const offsetValue = computed({
  get() {
    return badgeHeight.value
  },
  set(v) {
    badgeHeight.value = v
  },
})

// ==================== mounted =======================
// 父级高度是字节点撑开的，无法设置height，采用渲染后拿到dom的方式去获取高度
onMounted(() => {
  const badgeDom: HTMLDivElement = badgeRef.value
  const supDomHeight = ref(0)
  if (props.count && props.count > props.overflowCount) {
    supDomHeight.value = 10
  } else {
    supDomHeight.value = 10
  }
  // 移动父级的50% - 自身高度的 50%
  offsetValue.value = badgeDom.offsetHeight / 2 - supDomHeight.value
})

const countClass = computed(() => {
  return {
    isRound: isRound(),
    [`yk-badge__count--${props.status}`]: props.status !== undefined,
    [`yk-badge__count--${props.offset}`]:
      props.offset !== undefined && typeof props.offset == 'string',
    'yk-badge__count--stand': !!useSlots().default === false,
  }
})
</script>
<style scoped></style>
