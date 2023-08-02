<template>
  <YkInput v-model:value="realValue" :class="bem()" v-bind="{ ...$attrs }">
    <template v-if="buttons === 'right'" #suffix>
      <div :class="bem('buttons-r')">
        <YkButton type="secondary"><IconUpOutline /></YkButton>
        <YkButton type="secondary"><IconDownOutline /></YkButton>
      </div>
    </template>
  </YkInput>
</template>
<script setup lang="ts">
import { createCssScope } from '../../utils/bem'
import { YkInput } from '../../input'
import { InputNumberProps } from './input-number'
import YkButton from '../../button'
import { ref } from 'vue'

const bem = createCssScope('input-number')
const realValue = ref<string>('123')

defineOptions({
  name: 'YkInputNumber',
})

const props = withDefaults(defineProps<InputNumberProps>(), {
  buttons: 'right',
  step: 1,
})
</script>
