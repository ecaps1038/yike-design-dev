<template>
  <!-- <Teleport :to="to"> -->
  <Transition :name="animation">
    <div
      v-show="visible"
      class="yk-backtop"
      :style="{
        right: right + 'px',
        bottom: bottom + 'px',
      }"
      @click="clickIt"
    >
      <slot>
        <yk-icon :name="icon" class="yk-backtop__icon" />
      </slot>
    </div>
  </Transition>
  <!-- </Teleport> -->
</template>

<script setup lang="ts">
import { Ref, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import '../style'
import { BackTopProps } from './back-top'

defineOptions({
  name: 'YkBackTop',
})

const props = withDefaults(defineProps<BackTopProps>(), {
  animation: 'fade',
  right: '50',
  bottom: '50',
  visibilityHeight: '200',
  icon: 'yk-xiangshang',
})

const typeOfTest = (type: string) => (thing: unknown) => typeof thing === type
const isString = typeOfTest('string')
const getTarget = (target: string | HTMLElement | undefined) => {
  if (isString(target)) {
    return document.querySelector(target as string) as HTMLElement
  }
  return target
}

const visible = ref<boolean>(false)
const el: Ref = ref<HTMLElement | undefined>()

onMounted(async () => {
  await nextTick()
  el.value = getTarget(props.target) as HTMLElement | undefined
  ;(el.value || document).addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  ;(el.value || document).removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  const scrollTop = (el.value || document.documentElement).scrollTop
  if (scrollTop >= props.visibilityHeight) {
    visible.value = true
  } else {
    visible.value = false
  }
}

const backToTop = () => {
  ;(el.value || document.documentElement).scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
const emit = defineEmits(['on-click'])
const clickIt = (e: MouseEvent) => {
  backToTop()
  emit('on-click', e)
}
</script>
