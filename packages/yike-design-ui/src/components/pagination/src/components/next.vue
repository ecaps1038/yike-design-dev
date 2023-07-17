<template>
  <button :class="nextCls">
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

const nextCls = computed(() => [
  nsNext.b('next'),
  nsNext.bm('next', props.size),
  props.disabled ? 'disabled' : '',
])
</script>
