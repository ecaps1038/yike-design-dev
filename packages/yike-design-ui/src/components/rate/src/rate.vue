<template>
  <div
    class="yk-rate"
    :class="[sizeClass]"
    :aria-valuenow="currentValue"
    aria-valuemin="0"
    :aria-valuemax="max"
  >
    <span
      v-for="(item, index) in max"
      :key="index"
      :class="['yk-rate-item', { disabled: props.disabled }]"
      @mousemove="setCurrentValue($event, item)"
      @mouseleave="resetCurrentValue"
      @click="selectRate(item)"
    >
      <yk-icon
        name="yike-wujiaoxing"
        :class="[
          { hover: hoverIndex === item },
          item <= currentValue ? 'is-active' : '',
        ]"
      ></yk-icon>
    </span>
  </div>
</template>
<script setup lang="ts">
import { YkIcon } from '../../../index'
import { RateProps, RateEmits } from './rate'
import { ref, watch, computed } from 'vue'
import '../style'

defineOptions({
  name: 'YkRate',
})

const props = defineProps(RateProps)
const emit = defineEmits(RateEmits)

const currentValue = ref(props.modelValue)
const hoverIndex = ref(-1)
const rateDisabled = ref(props.disabled)

const sizeClass = computed(() => `yk-rate-${props.size}`)

watch(
  () => props.modelValue,
  (val) => {
    currentValue.value = val
  },
)

const selectRate = (value: number) => {
  if (rateDisabled.value) {
    return
  }

  emit('update:modelValue', value)
  if (props.modelValue !== value) {
    emit('change', value)
  }
}
const setCurrentValue = (event: Event, value: number) => {
  if (rateDisabled.value) {
    return
  }

  currentValue.value = value
  hoverIndex.value = value
}
const resetCurrentValue = () => {
  if (rateDisabled.value) {
    return
  }
  currentValue.value = props.modelValue
  hoverIndex.value = -1
}

defineExpose({
  setCurrentValue,
  resetCurrentValue,
})
</script>
