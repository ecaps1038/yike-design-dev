<template>
  <Transition :name="animation">
    <div
      v-show="visible"
      class="yk-backtop"
      :style="backTopStyle"
      @click="clickIt"
    >
      <slot>
        <div
          class="yk-backtop-container"
          :class="{ secondary: theme === 'secondary' }"
        >
          <IconTopOutline size="20" />
        </div>
      </slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { IconTopOutline } from '../../svg-icon'
import { transformPxToNumber } from '../../utils'
import { BackTopProps } from './back-top'

defineOptions({
  name: 'YkBackTop',
})

const props = withDefaults(defineProps<BackTopProps>(), {
  animation: 'upward',
  theme: 'primary',
  right: '24px',
  bottom: '40px',
  visibleHeight: '200px',
  icon: 'yk-top',
  behavior: 'smooth',
})

const getTarget = (target: string | HTMLElement | undefined) => {
  if (typeof target === 'string') {
    const targetEl = document.querySelector(target) as HTMLElement
    if (!targetEl)
      throw new Error(`yk-back-top target props is not exist: ${props.target}`)
    return targetEl
  }
  return target
}

const visible = ref<boolean>(false)
const el = ref<HTMLElement | undefined>()

const backTopStyle = computed(() => {
  const right = transformPxToNumber(props.right)
  const bottom = transformPxToNumber(props.bottom)
  return {
    right: `${right}px`,
    bottom: `${bottom}px`,
  }
})

onMounted(async () => {
  await nextTick()
  el.value = getTarget(props.target) as HTMLElement | undefined
  ;(el.value || document).addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  ;(el.value || document).removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  const visibleHeight = transformPxToNumber(props.visibleHeight)
  const scrollTop = (el.value || document.documentElement).scrollTop
  if (scrollTop >= visibleHeight) {
    visible.value = true
  } else {
    visible.value = false
  }
}

const backToTop = () => {
  ;(el.value || document.documentElement).scrollTo({
    top: 0,
    behavior: props.behavior,
  })
}

const emit = defineEmits(['on-click'])

const clickIt = (e: MouseEvent) => {
  backToTop()
  emit('on-click', e)
}
</script>
