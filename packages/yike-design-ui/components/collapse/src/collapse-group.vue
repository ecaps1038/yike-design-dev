<template>
  <div
    :class="[
      bem(),
      bem({
        noborder: !border,
      }),
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, toRefs, watch } from 'vue'
import type { CollapseGroupProps, CollapseItemKey } from './collapse'
import { collapseInjectKey } from './collapse'
import { createCssScope } from '../../utils'

defineOptions({
  name: 'YkCollapseGroup',
})

const props = withDefaults(defineProps<CollapseGroupProps>(), {
  border: true,
  accordion: false,
  modelValue: undefined,
  defaultValue: undefined,
})

const emit = defineEmits<{
  (
    e: 'update:modelValue',
    value: CollapseItemKey | CollapseItemKey[] | undefined,
  ): void
  (e: 'change', value: CollapseItemKey | CollapseItemKey[] | undefined): void
}>()

const bem = createCssScope('collapse-group')
const { border, accordion, modelValue, defaultValue } = toRefs(props)

const normalize = (value?: CollapseItemKey | CollapseItemKey[]) => {
  if (Array.isArray(value)) return [...value]
  return value === undefined ? [] : [value]
}

const openedKeys = ref<CollapseItemKey[]>(
  normalize(modelValue.value ?? defaultValue.value),
)

watch(
  () => modelValue.value,
  (value) => {
    if (value !== undefined) {
      openedKeys.value = normalize(value)
    }
  },
)

const isOpened = (name: CollapseItemKey) => openedKeys.value.includes(name)

const toggle = (name: CollapseItemKey) => {
  if (accordion.value) {
    openedKeys.value = openedKeys.value.includes(name) ? [] : [name]
  } else {
    const next = [...openedKeys.value]
    const index = next.indexOf(name)
    if (index > -1) next.splice(index, 1)
    else next.push(name)
    openedKeys.value = next
  }

  const value = accordion.value ? openedKeys.value[0] : [...openedKeys.value]
  emit('update:modelValue', value)
  emit('change', value)
}

provide(collapseInjectKey, {
  accordion: accordion.value,
  isOpened,
  toggle,
})
</script>
