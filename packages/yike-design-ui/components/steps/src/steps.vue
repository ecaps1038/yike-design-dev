<template>
  <ol :class="bem([direction], [size])" role="list">
    <li
      v-for="(step, index) in resolvedSteps"
      :key="index"
      :class="bem('step', [step.status], { clickable })"
      :aria-current="index === current ? 'step' : undefined"
      @click="handleClick(index)"
    >
      <div :class="bem('head')">
        <span :class="bem('icon')">
          <slot name="icon" :step="step" :index="index">
            <IconTickOutline v-if="step.status === 'finish'" />
            <IconCrossOutline v-else-if="step.status === 'error'" />
            <template v-else>{{ index + 1 }}</template>
          </slot>
        </span>
        <span v-if="index < resolvedSteps.length - 1" :class="bem('line')" />
      </div>
      <div :class="bem('content')">
        <div :class="bem('title')">{{ step.title }}</div>
        <div v-if="step.description" :class="bem('description')">
          {{ step.description }}
        </div>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createCssScope } from '../../utils'
import type { ResolvedStep, StepStatus, StepsProps } from './steps'
import { IconTickOutline, IconCrossOutline } from '../../svg-icon'

defineOptions({ name: 'YkSteps' })

const props = withDefaults(defineProps<StepsProps>(), {
  items: () => [],
  current: 0,
  status: 'process',
  direction: 'horizontal',
  size: 'm',
  clickable: false,
})

const emit = defineEmits<{
  (e: 'change', index: number): void
}>()

const bem = createCssScope('steps')

const resolvedSteps = computed<ResolvedStep[]>(() =>
  props.items.map((item, index) => {
    let status: StepStatus
    if (item.status) {
      status = item.status
    } else if (index < props.current) {
      status = 'finish'
    } else if (index === props.current) {
      status = props.status === 'error' ? 'error' : 'process'
    } else {
      status = 'wait'
    }
    return { ...item, status }
  }),
)

function handleClick(index: number) {
  if (!props.clickable) return
  emit('change', index)
}
</script>
