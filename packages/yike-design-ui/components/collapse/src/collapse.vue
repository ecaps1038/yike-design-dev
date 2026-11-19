<template>
  <div :class="bem()">
    <div
      role="button"
      :aria-disabled="disabled"
      :aria-expanded="opened"
      :aria-controls="contentId"
      tabindex="0"
      :class="[
        bem('header'),
        bem({
          opened,
          disabled,
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
      <div
        v-show="opened"
        :id="contentId"
        :class="bem('content')"
        :aria-hidden="!opened"
        role="region"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { CollapseProps, CollapseItemKey , collapseInjectKey, genCollapseId } from './collapse'
import { createCssScope } from '../../utils'
import { computed, inject, ref, watch } from 'vue'
import { IconRightOutline } from '../../svg-icon'

defineOptions({
  name: 'YkCollapse',
})

const bem = createCssScope('collapse')
const props = withDefaults(defineProps<CollapseProps>(), {
  title: '',
  active: false,
  disabled: false,
  name: undefined,
})

const emit = defineEmits<{
  (e: 'update:active', active: boolean): void
  (e: 'change', active: boolean): void
}>()

const groupContext = inject(collapseInjectKey, null)

const itemName: CollapseItemKey = props.name ?? genCollapseId('yk-collapse')
const contentId = genCollapseId('yk-collapse-content')

const isActive = ref<boolean>(props.active)

watch(
  () => props.active,
  (active) => {
    if (!groupContext) isActive.value = active
  },
)

const opened = computed(() =>
  groupContext ? groupContext.isOpened(itemName) : isActive.value,
)

const toggle = () => {
  if (props.disabled) return
  if (groupContext) {
    groupContext.toggle(itemName)
    emit('change', groupContext.isOpened(itemName))
    return
  }
  isActive.value = !isActive.value
  emit('update:active', isActive.value)
  emit('change', isActive.value)
}

const toggleByKeyboard = (ev: KeyboardEvent) => {
  if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
    ev.preventDefault()
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
