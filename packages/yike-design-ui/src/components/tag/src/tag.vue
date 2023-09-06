<template>
  <span
    :class="className"
    :style="styleList"
    @click.stop="isCheckMode && checkTagHander($event)"
  >
    <span v-if="$slots.default" :class="bem('content')">
      <slot :is-checked="isChecked"></slot>
    </span>
    <IconCloseOutline
      v-if="closeable"
      :class="bem('close')"
      @click.stop="closeTagHander"
    />
  </span>
</template>

<script setup lang="ts">
import { toRefs, computed, ref, watch } from 'vue'
import { TagProps, TagShape, TagEmits } from './tag'
import { createCssScope } from '../../utils'
import { IconCloseOutline } from '../../svg-icon'

defineOptions({
  name: 'YkTag',
})

const bem = createCssScope('tag')
const emit = defineEmits<TagEmits>()
const props = withDefaults(defineProps<TagProps>(), {
  type: 'defualt',
  closeable: false,
  hit: false,
  color: '',
  bgColor: '',
  checked: undefined,
  size: 'm',
  disabled: false,
  shape: TagShape.square,
})

let { type, closeable, bgColor, color, size, shape, disabled, checked } =
  toRefs(props)

let isChecked = ref(checked.value)

const setCheckState = (v: any) => {
  isChecked.value = !!v
}
const isBoolean = (v: any) => typeof v === 'boolean'

const isCheckMode = computed(() => {
  return isBoolean(checked.value)
})
const className = computed(() => {
  return [
    bem(['', shape.value, size.value, !isCheckMode.value && type.value], {
      disabled: !!disabled.value,
      check: isCheckMode.value,
      checked: isChecked.value,
    }),
  ]
})

const styleList = computed(() => {
  return {
    backgroundColor: bgColor.value,
    color: color.value,
  }
})

const closeTagHander = (e: MouseEvent) => {
  if (disabled.value) return
  emit('close', e)
}

const checkTagHander = (e: MouseEvent) => {
  if (disabled.value) return
  setCheckState(!isChecked.value)
  emit('change', isChecked.value, e)
}

watch(
  () => checked.value,
  (v) => {
    setCheckState(v)
  },
)
</script>
