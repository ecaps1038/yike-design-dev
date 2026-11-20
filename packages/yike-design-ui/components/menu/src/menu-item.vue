<template>
  <li
    :class="
      bem('item', [mode], {
        selected,
        disabled: item.disabled,
        open: opened,
        child: level > 0,
      })
    "
    role="none"
  >
    <div
      :class="bem('title')"
      role="menuitem"
      :aria-selected="selected"
      :aria-expanded="hasChildren ? opened : undefined"
      :aria-disabled="item.disabled"
      tabindex="0"
      @click="handleClick"
      @keydown.enter.prevent="handleClick"
      @keydown.space.prevent="handleClick"
    >
      <component
        :is="item.icon"
        v-if="item.icon"
        :class="bem('icon')"
        aria-hidden="true"
      />
      <span :class="bem('label')">{{ item.label }}</span>
      <IconRightOutline
        v-if="hasChildren"
        :class="bem('arrow', { open: opened })"
        aria-hidden="true"
      />
    </div>

    <ul
      v-if="hasChildren"
      v-show="mode === 'horizontal' || opened"
      :class="
        bem('sub', [mode], {
          popup: level === 0 && mode === 'horizontal',
          open: opened,
        })
      "
      role="menu"
    >
      <MenuItem
        v-for="child in item.children"
        :key="String(child.key)"
        :item="child"
        :level="level + 1"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { createCssScope } from '../../utils'
import type { MenuItem } from './menu'
import { menuContextKey } from './menu'
import { IconRightOutline } from '../../svg-icon'

defineOptions({ name: 'YkMenuItem' })

const props = withDefaults(
  defineProps<{
    item: MenuItem
    level?: number
  }>(),
  {
    level: 0,
  },
)

const context = inject(menuContextKey)
if (!context) {
  throw new Error('YkMenuItem must be used inside YkMenu')
}

const bem = createCssScope('menu-item')
const mode = computed(() => context.mode.value)
const hasChildren = computed(
  () => !!props.item.children && props.item.children.length > 0,
)
const opened = computed(() => context.isOpen(props.item.key))
const selected = computed(() => context.isSelected(props.item.key))

function handleClick() {
  if (props.item.disabled) return
  if (hasChildren.value) {
    context.toggleOpen(props.item.key)
    return
  }
  context.select(props.item)
}
</script>
