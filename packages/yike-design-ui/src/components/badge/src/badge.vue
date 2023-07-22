<template>
  <div ref="badgeRef" class="yk-badge">
    <div ref="supRef" class="yk-badge__sup">
      <div
        v-if="isDot"
        :class="['yk-badge__dot', dotClass]"
        :style="dotStyle"
      ></div>
      <div
        v-if="isCount"
        :class="['yk-badge__count', countClass]"
        :style="countStyle"
      >
        {{ showCout }}
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
})

// 是否是点类型
const isDot = computed(() => props?.isDot ?? false)

// 是否是count类型
const isCount = computed(
  () => !isDot.value && (props?.count !== undefined ? true : false),
)

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
  }
})

const showCout = ref<string>('')
if (props.count && props.count > props.overflowCount) {
  showCout.value = Math.min(props.count!, props.overflowCount) + '+'
} else {
  showCout.value = props.count + ''
}

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
    styles.translate = `-50% ${offsetVal.value}px`
  } else if (props.offset && props.offset === 'left') {
    styles.position = 'absolute'
    styles.left = '0'
    styles.top = '0'
    styles.translate = `50% ${offsetVal.value}px`
  }

  return styles
})

let offsetVal = ref(0)

const offsetValue = computed({
  get() {
    return offsetVal.value
  },
  set(v) {
    offsetVal.value = v
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
  }
})
</script>
