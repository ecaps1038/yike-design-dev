<template>
  <Transition name="zoom-in-top">
    <div v-if="visible" :class="classList">
      <div v-if="showIcon" :class="ns('icon')">
        <slot name="icon">
          <component :is="getIconName(type)"></component>
        </slot>
      </div>

      <div :class="ns('content')">
        <div v-if="title" :class="ns('title')">
          {{ title }}
        </div>
        <div :class="ns('description')">{{ message }}</div>
      </div>

      <button v-if="closable" :class="ns('close-icon')" @click="handleClose">
        <slot name="closeElement">
          <IconCrossOutline />
        </slot>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getIconName } from './util'
import { createCssScope } from '../../utils'
import type { AlertEmits, AlertProps } from './alert'

defineOptions({ name: 'YkAlert' })

// prettier-ignore
const props = withDefaults(
  defineProps<AlertProps>(),
  {
    type: 'info',
    closable: false,
    showIcon: true,
    center: false,
    banner: false,
  }
)

const emit = defineEmits<AlertEmits>()
const ns = createCssScope('alert')
const hasTitle = props.title ? 'with-title' : ''

const classList = computed(() => {
  return [
    ns([props.type, hasTitle]),
    {
      center: props.center,
      banner: props.banner,
    },
  ]
})

const visible = ref(true)
function handleClose(ev: MouseEvent) {
  visible.value = false
  emit('close', ev)
}
</script>
