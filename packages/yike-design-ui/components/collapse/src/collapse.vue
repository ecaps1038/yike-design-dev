<template>
  <div :class="bem()">
    <div
      role="button"
      :aria-disabled="disabled"
      tabindex="0"
      :class="[
        bem('header'),
        bem({
          opened: isActive,
          disabled: disabled,
        }),
      ]"
      @keydown="toggleByKeyboard"
      @click="toggle"
    >
      <div :class="bem('title')">
        <IconRightOutline />
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
      </div>
      <div :class="bem('slot')">
        <slot name="right" />
      </div>
    </div>
    <Transition
      name="collapse"
      @enter="onOpen"
      @after-enter="onAfterOpen"
      @before-leave="onBeforeClose"
      @leave="onClosed"
    >
      <div v-show="isActive" :class="bem('content')" :aria-hidden="!isActive">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { CollapseProps } from './collapse'
import { createCssScope } from '../../utils'
import { onMounted, ref } from 'vue'
import { IconRightOutline } from '../../svg-icon'
defineOptions({
  name: 'YkCollapse',
})

const bem = createCssScope('collapse')
const props = withDefaults(defineProps<CollapseProps>(), {
  title: '',
  active: false,
  disabled: false,
})

const isActive = ref<boolean>(props.active)

onMounted(() => {
  // isActive.value = props.active
})

const toggle = () => {
  if (!props.disabled) {
    isActive.value = !isActive.value
  }
}

const toggleByKeyboard = (ev: KeyboardEvent) => {
  if (ev.key === 'Enter') {
    toggle()
  }
}

const onOpen = (el: Element) => {
  ;(el as HTMLElement).style.height = `${el.scrollHeight}px`
}

const onAfterOpen = (el: Element) => {
  ;(el as HTMLElement).style.height = 'auto'
}

const onBeforeClose = (el: Element) => {
  ;(el as HTMLElement).style.height = `${el.scrollHeight}px`
}

const onClosed = (el: Element) => {
  ;(el as HTMLElement).style.height = '0px'
}
</script>
