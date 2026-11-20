<template>
  <div :class="bem([status])" role="status">
    <div :class="bem('icon')">
      <slot name="icon">
        <component :is="iconComponent" aria-hidden="true" />
      </slot>
    </div>

    <div v-if="title || $slots.title" :class="bem('title')">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="subtitle || $slots.subtitle" :class="bem('subtitle')">
      <slot name="subtitle">{{ subtitle }}</slot>
    </div>

    <div v-if="$slots.default" :class="bem('content')">
      <slot />
    </div>
    <div v-if="$slots.extra" :class="bem('extra')">
      <slot name="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { createCssScope } from '../../utils'
import type { ResultProps, ResultStatus } from './result'
import {
  IconCircleCrossOutline,
  IconInformationOutline,
  IconTickCircleOutline,
  IconWarningOutline,
} from '../../svg-icon'

defineOptions({ name: 'YkResult' })

const props = withDefaults(defineProps<ResultProps>(), {
  status: 'info',
  title: undefined,
  subtitle: undefined,
})

const bem = createCssScope('result')

const ICON_MAP: Record<ResultStatus, Component> = {
  success: IconTickCircleOutline,
  error: IconCircleCrossOutline,
  warning: IconWarningOutline,
  info: IconInformationOutline,
}

const iconComponent = computed(() => ICON_MAP[props.status])
</script>
