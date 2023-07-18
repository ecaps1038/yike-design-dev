<template>
  <button :class="prevCls" @click="handleClick">
    <yk-icon name="yk-xiangzuo"></yk-icon>
  </button>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useNamespace } from '../../../../utils/hooks'
import YkButton from '../../../button'
import YkIcon from '../../../icon'

import { PrevProps, PrevEmits, defaultPrevProps } from './prev'

defineOptions({
  name: 'YkPaginationPrev',
})

const props = withDefaults(defineProps<PrevProps>(), defaultPrevProps)
const emits = defineEmits<PrevEmits>()

const namespace = inject('namespace', 'pagination')
const nsNext = useNamespace(namespace)

const handleClick = () => {
  if (!props.disabled) {
    emits('prev')
  }
}

const prevCls = computed(() => [
  nsNext.b('prev'),
  nsNext.bm('prev', props.size),
  nsNext.is('disabled', props.disabled),
])
</script>
