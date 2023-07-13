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
        <!-- <yk-icon :name="icon" class="yk-backtop__icon" /> -->
        <svg
          class="yk-backtop__icon"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            d="M13 19V7.83l4.88 4.88c.39.39 1.03.39 1.42 0a.996.996 0 0 0 0-1.41l-6.59-6.59a.996.996 0 0 0-1.41 0l-6.6 6.58a.996.996 0 1 0 1.41 1.41L11 7.83V19c0 .55.45 1 1 1s1-.45 1-1z"
          ></path>
        </svg>
      </slot>
    </div>
  </Transition>
  <!-- </Teleport> -->
</template>

<script setup lang="ts">
import { PropType, Ref, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
  name: 'YkBackTop',
})

type animationType = 'fade' | 'move'

const props = defineProps({
  animation: {
    type: String as PropType<animationType>,
    default: 'fade',
  },
  right: {
    type: String,
    default: '50',
  },
  bottom: {
    type: String,
    default: '50',
  },
  to: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body',
  },
  target: {
    type: [String, Object] as PropType<string | HTMLElement>,
  },
  visibilityHeight: {
    type: String,
    default: '200',
  },
  icon: {
    type: String,
    default: 'yk-xiangshang',
  },
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
  console.log(scrollTop)
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
const emit = defineEmits(['onClick'])
const clickIt = (e: MouseEvent) => {
  backToTop()
  emit('onClick', e)
}
</script>
<style scoped lang="less">
.yk-backtop {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;

  .yk-backtop__icon {
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
    background-color: @pcolor;
    border-radius: 25%;
    box-shadow: @shadow-s;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.move-enter-active,
.move-leave-active {
  transition: all 0.5s ease;
}

.move-enter-from,
.move-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
