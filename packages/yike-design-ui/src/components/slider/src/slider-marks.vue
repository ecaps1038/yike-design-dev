<template>
  <div class="yk-slider__marks">
    <div
      v-for="item in renderMarks"
      :key="item.key"
      class="yk-slider__mark-item"
      :class="{
        'yk-slider__mark-item--over': item.isOver,
        'yk-slider__mark-item--overed': item.isOvered,
      }"
      :style="{
        left: item.percent + '%',
      }"
    >
      <div
        class="yk-slider__mark-item--pointer"
        @click="emits('position', item.percent)"
      ></div>
      <div
        class="yk-slider__mark-item--box"
        @click="emits('position', item.percent)"
      >
        <component :is="item.markInfo"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, createVNode } from 'vue'
import { SliderMarksProps, SliderMarkRenderItem } from './slider-marks'
defineOptions({
  inheritAttrs: false,
})
const props = withDefaults(defineProps<SliderMarksProps>(), {
  modelValue: () => [],
  percentStart: 0,
  percentEnd: 0,
  rangeMin: 0,
  rangeMax: 100,
})
const emits = defineEmits(['position'])

const renderMarks = computed<SliderMarkRenderItem[]>(() => {
  const runwayLen = props.rangeMax - props.rangeMin
  return props.modelValue.map((item) => {
    const value = item.key - props.rangeMin
    const percent = Math.round((value / runwayLen) * 100) || 0
    console.log(value, runwayLen)
    const percentRatio = percent / 100
    return {
      ...item,
      percent,
      isOver:
        percentRatio === props.percentStart ||
        percentRatio === props.percentEnd,
      isOvered:
        percentRatio > props.percentStart && percentRatio < props.percentEnd,
      markInfo:
        item.labelNode ||
        createVNode('span', { style: item.style }, item.label),
    }
  })
})
</script>

<style lang="scss" scoped></style>
