<template>
  <div :class="nsJumper.b()">
    <span :class="nsJumper.e('prepend')">{{ label }}</span>
    <div
      :class="[nsJumper.e('input-wrapper'), nsJumper.em('input-wrapper', size)]"
    >
      <input
        type="number"
        v-model="inputValue"
        :disabled="disabled"
        @blur="handleJump"
        @keyup.enter="handleJump"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, watch } from 'vue'
import { JumperProps, JumperEmits, defaultJumperProps } from './jumper'
import { useNamespace } from '../../../../utils/hooks'

const namespace = inject('namespace', 'pagination')
const nsJumper = useNamespace(`${namespace}-jumper`)

const props = withDefaults(defineProps<JumperProps>(), defaultJumperProps)
const emits = defineEmits<JumperEmits>()

const inputValue = ref<string>('')

const handleJump = () => {
  if (inputValue.value) {
    const value = Number(inputValue.value)
    let page: number = 0
    if (!isNaN(value)) {
      page = Math.trunc(value)
      emits('jump', page)
    }
    inputValue.value = ''
  }
}
</script>

<style scoped></style>
