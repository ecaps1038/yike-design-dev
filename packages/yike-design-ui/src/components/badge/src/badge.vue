<template>
  <div ref="badgeRef" class="yk-badge">
    <div ref="supRef" class="yk-badge__sup">
      <div
        v-if="isShowDot"
        :class="['yk-badge__dot', dotClass]"
        :style="dotStyle"
      ></div>
      <div
        v-if="isShowCount"
        :class="['yk-badge__count', countClass]"
        :style="countStyle"
      >
        {{ showCount }}
      </div>
    </div>
    <!-- 徽标 -->
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { BadgeProps } from './badge'
import '../style'
import { ref, computed, CSSProperties, onMounted } from 'vue'
defineOptions({
  name: 'YkBadge',
})

const props = withDefaults(defineProps<BadgeProps>(), {
  overflowCount: 99,
  showZero: false,
  status: 'danger',
  hidden: false,
})

// 是否是点类型
const isDot = computed(() => props?.isDot ?? false)

// 是否是count类型
const isCount = computed(
  () => !isDot.value && (props?.count !== undefined ? true : false),
)

// 是否展示count
const isShowCount = computed(() => {
  const hiddenZero =
    props.count !== undefined && props.count === 0 && !props.showZero
  const hiddenNegative = props.count !== undefined && props.count < 0
  if (
    hiddenZero ||
    hiddenNegative ||
    props.hidden ||
    isShowDot.value ||
    props.count == undefined
  ) {
    return false
  }
  return true
})

// 是否展示dot
const isShowDot = computed(() => {
  return isDot.value && !props.hidden
})

// 计算徽标是圆还是椭圆
const isRound = () => {
  if (isDot.value) {
    return true
  } else {
    return isCount.value && props.count?.toString().length === 1
  }
}

const dotStyle = computed<CSSProperties>(() => {
  const styles: CSSProperties = {}
  if (props.color) {
    styles.background = props.color
  }
  return styles
})

const dotClass = computed(() => {
  return {
    'yk-badge__dot--outer': props.outDot,
    [`yk-badge__dot--${props.status}`]: props.status !== undefined,
  }
})

const showCount = computed(() => {
  if (props.count && props.count > props.overflowCount) {
    return Math.min(props.count!, props.overflowCount) + '+'
  } else {
    return props.count + ''
  }
})

const badgeRef = ref()
const supRef = ref()

const countStyle = computed<CSSProperties>(() => {
  const styles: CSSProperties = {}
  if (props.color) {
    styles.background = props.color
  }

  if (props.offset && props.offset === 'right') {
    styles.position = 'absolute'
    styles.right = '0'
    styles.top = '0'
    styles.translate = `-50% ${offsetValue.value}px`
  } else if (props.offset && props.offset === 'left') {
    styles.position = 'absolute'
    styles.left = '0'
    styles.top = '0'
    styles.translate = `50% ${offsetValue.value}px`
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

onMounted(() => {
  const badgeDom: HTMLDivElement = badgeRef.value
  const supDomHeight = ref(0)
  if (props.count && props.count > props.overflowCount) {
    supDomHeight.value = 12
  } else {
    supDomHeight.value = 10
  }
  offsetValue.value = badgeDom.offsetHeight / 2 - supDomHeight.value
})

const countClass = computed(() => {
  return {
    isRound: isRound(),
    defaultOffset: props?.offset == undefined ? true : false,
    [`yk-badge__count--${props.status}`]: props.status !== undefined,
  }
})
</script>
