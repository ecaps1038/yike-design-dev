<template>
  <Transition name="zoom-in-top">
    <div v-if="visible" :class="cls">
      <div v-if="props.showIcon" :class="`${prefixCls}-icon`">
        <slot name="icon">
          <component :is="getIconName(props.type)"></component>
        </slot>
      </div>

      <div :class="`${prefixCls}-content`">
        <div v-if="props.title" :class="`${prefixCls}-title`">
          {{ props.title }}
        </div>
        <div :class="`${prefixCls}-description`">{{ props.message }}</div>
      </div>

      <button
        v-if="props.closable"
        type="button"
        :class="`${prefixCls}-close-icon`"
        @click="handleClose"
      >
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
import type { AlertEmits, AlertProps } from './alert'
import { IconCrossOutline } from '../../svg-icon'
defineOptions({
  name: 'YkAlert',
})

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  closable: false,
  showIcon: true,
  center: false,
  banner: false,
})

const emit = defineEmits<AlertEmits>()

const visible = ref(true)

const prefixCls = 'yk-alert'

const cls = computed(() => [
  prefixCls,
  `${prefixCls}-${props.type}`,
  {
    [`${prefixCls}-with-title`]: props.title,
    [`${prefixCls}-center`]: props.center,
    [`${prefixCls}-banner`]: props.banner,
  },
])

const handleClose = (ev: MouseEvent) => {
  visible.value = false
  emit('close', ev)
}
</script>
