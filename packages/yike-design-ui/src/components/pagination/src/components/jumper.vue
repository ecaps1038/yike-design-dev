<template>
  <div :class="nsJumper.b()">
    <span v-if="!simple" :class="nsJumper.e('prepend')">{{ jumperLabel }}</span>
    <div
      :class="[nsJumper.e('input-wrapper'), nsJumper.em('input-wrapper', size)]"
    >
      <input
        v-model="inputValue"
        type="number"
        :disabled="disabled"
        @blur="handleJump"
        @keyup.enter="handleJump"
      />
    </div>
    <div v-if="simple" :class="nsJumper.e('jumper-tips')">
      <span class="slash">/</span>
      <span>{{ total }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, watch, onMounted } from 'vue'
import { JumperProps, JumperEmits } from './jumper'
import { useNamespace } from '../utils'

const namespace = inject('namespace', 'pagination')
const nsJumper = useNamespace(`${namespace}-jumper`)

const props = defineProps(JumperProps)
const emits = defineEmits<JumperEmits>()

const inputValue = ref<string>('')

onMounted(() => {
  if (props.simple) {
    watch(
      () => props.current,
      (newVal) => {
        inputValue.value = newVal.toString()
      },
      { immediate: true },
    )
  }
})

const handleJump = () => {
  if (inputValue.value) {
    const value = Number(inputValue.value)
    let page = 0
    if (!isNaN(value)) {
      page = Math.trunc(value)
      emits('jump', page)
    }
    if (!props.simple) {
      inputValue.value = ''
    }
  }
}
</script>
