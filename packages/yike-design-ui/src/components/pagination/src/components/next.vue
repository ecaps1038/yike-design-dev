<template>
  <button :class="nextCls" @click="handleClick">
    <yk-icon name="yk-xiangyou"></yk-icon>
  </button>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useNamespace } from '../../../../utils/hooks'
import YkIcon from '../../../icon'
import { NextProps, NextEmits, defaultNextProps } from './next'

defineOptions({
  name: 'YkPaginationNext',
})

const props = withDefaults(defineProps<NextProps>(), defaultNextProps)
const emits = defineEmits<NextEmits>()

const namespace = inject('namespace', 'pagination')
const nsNext = useNamespace(namespace)

const handleClick = () => {
  if (!props.disabled) {
    emits('next')
  }
}

const nextCls = computed(() => [
  nsNext.b('next'),
  nsNext.bm('next', props.size),
  nsNext.is('disabled', props.disabled),
])
</script>
