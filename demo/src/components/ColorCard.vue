<template>
  <div class="ykcolor-card">
    <div
      ref="ccRef"
      class="ykcolor-main"
      :class="{ step }"
      :style="{ background: colorHex }"
    >
      <span class="ykcolor-label">{{ label }}</span>
      <span class="ykcolor-value">{{ colorHex }}</span>
    </div>
    <div v-if="step" class="ykcolor-step" :data-theme="theme">
      <div
        v-for="i in 10"
        :key="i"
        :style="{ background: style[`${step}-${i}`] }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import style from '../../../packages/yike-design-ui/src/components/styles/color/color.module.less'
import { upperColor } from '../utils/tools'
import { ref, computed } from 'vue'

const props = defineProps(['label', 'theme', 'color', 'step'])

const ccRef = ref(null)

const getHex = () => {
  let color = style[props.color]
  if (color.includes('var')) {
    // let result = color
    // .replace(/[a-z]+var(/, '')
    // .replace(/)/g, '')
    // .split(',')

    //let result = color.match(/(var\()(--.+?)(\).?)/)
    // let hex = (color = getComputedStyle(document.documentElement)
    //   .getPropertyValue(result[2])
    //   .trim())
    // color = color.replace(/var\(.+?\)/, hex)
    // if (ccRef.value) {-m
    //   color = getComputedStyle(ccRef.value).getPropertyValue('background-color')
    // }

    return color
  }
  return upperColor(color)
}

let colorHex: any = computed(() => {
  if (props.color) {
    return getHex()
  } else if (props.theme && props.step) {
    return upperColor(style[`${props.step}-${props.theme}`])
  } else if (props.step) {
    return upperColor(style[props.step])
  }
  return ''
})
</script>

<style lang="less" scoped>
.ykcolor-card {
  display: flex;
  width: 240px;
  font-size: 14px;
  border-radius: 5px;
  color: #fff;
  outline: none;
  flex-direction: column;
  box-sizing: border-box;

  .ykcolor-main {
    display: flex;
    padding: 15px;
    border: none;
    border-radius: 5px;
    flex-direction: column;

    > span {
      margin-bottom: 5px;
    }

    &.step {
      border-radius: 5px 5px 0 0;
    }
  }

  .ykcolor-value {
    font-size: 12px;
  }

  .ykcolor-step {
    display: flex;
    overflow: hidden;
    border: none;
    border-radius: 0 0 5px 5px;

    > div {
      height: 24px;
      flex: 1;
    }
  }
}
</style>
