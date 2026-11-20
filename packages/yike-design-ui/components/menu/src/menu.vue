<template>
  <ul
    :class="bem([mode], { dark: theme === 'dark' })"
    role="menu"
    :aria-orientation="mode"
  >
    <MenuItemNode
      v-for="item in items"
      :key="String(item.key)"
      :item="item"
      :level="0"
    />
  </ul>
</template>

<script setup lang="ts">
import { computed, provide, ref, toRef, watch } from 'vue'
import { createCssScope } from '../../utils'
import type { MenuItem, MenuKey, MenuProps } from './menu'
import { menuContextKey } from './menu'
import MenuItemNode from './menu-item.vue'

defineOptions({ name: 'YkMenu' })

const props = withDefaults(defineProps<MenuProps>(), {
  items: () => [],
  modelValue: undefined,
  openKeys: undefined,
  defaultOpenKeys: () => [],
  mode: 'vertical',
  theme: 'light',
  selectable: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', key: MenuKey): void
  (e: 'change', key: MenuKey, item: MenuItem): void
  (e: 'select', key: MenuKey, item: MenuItem): void
  (e: 'update:openKeys', keys: MenuKey[]): void
  (e: 'open-change', keys: MenuKey[]): void
}>()

const bem = createCssScope('menu')
const innerOpenKeys = ref<MenuKey[]>([...props.defaultOpenKeys])

watch(
  () => props.openKeys,
  (keys) => {
    if (keys) innerOpenKeys.value = [...keys]
  },
)

const mode = toRef(props, 'mode')
const theme = toRef(props, 'theme')
const openKeys = computed(() => props.openKeys ?? innerOpenKeys.value)

function isOpen(key: MenuKey) {
  return openKeys.value.includes(key)
}

function isSelected(key: MenuKey) {
  return props.modelValue === key
}

function select(item: MenuItem) {
  if (!props.selectable || item.disabled) return
  emit('update:modelValue', item.key)
  emit('change', item.key, item)
  emit('select', item.key, item)
}

function toggleOpen(key: MenuKey) {
  const next = openKeys.value.includes(key)
    ? openKeys.value.filter((item) => item !== key)
    : [...openKeys.value, key]
  if (!props.openKeys) innerOpenKeys.value = next
  emit('update:openKeys', next)
  emit('open-change', next)
}

provide(menuContextKey, {
  mode: computed(() => mode.value),
  theme: computed(() => theme.value),
  isOpen,
  isSelected,
  select,
  toggleOpen,
})
</script>
