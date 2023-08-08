<template>
  <div :class="nsJumper()">
    <span v-if="!simple" :class="nsJumper('prepend')">{{ jumperLabel }}</span>
    <div
      :class="
        nsJumper('input-wrapper', {
          s: props.size === 's',
          m: props.size === 'm',
          l: props.size === 'l',
          xl: props.size === 'xl',
        })
      "
    >
      <input
        v-model="inputValue"
        type="number"
        :disabled="disabled"
        @blur="handleJump"
        @keyup.enter="handleJump"
      />
    </div>
    <div v-if="simple" :class="nsJumper('tips')">
      <span class="slash">/</span>
      <span>{{ total }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { JumperProps, JumperEmits } from './jumper'
import { createCssScope } from '../../../utils/bem'

const nsJumper = createCssScope(`pagination-jumper`)

const props = defineProps(JumperProps)
const emits = defineEmits<JumperEmits>()

const inputValue = ref<string>('')

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

watch(
  () => props.current,
  (newVal) => {
    if (props.simple) {
      inputValue.value = newVal.toString()
    }
  },
  { immediate: true },
)
</script>
