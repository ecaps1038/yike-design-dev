<template>
  <aside
    :class="bem([theme], { collapsed: isCollapsed })"
    :style="{ width: currentWidth, flex: `0 0 ${currentWidth}` }"
  >
    <div :class="bem('children')">
      <slot />
    </div>
    <div
      v-if="collapsible"
      :class="bem('trigger')"
      role="button"
      :aria-label="isCollapsed ? '展开侧边栏' : '收起侧边栏'"
      :aria-expanded="!isCollapsed"
      tabindex="0"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <slot name="trigger">{{ isCollapsed ? '»' : '«' }}</slot>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { createCssScope, toPx } from '../../utils'
import type { LayoutSiderProps } from './layout'
import { layoutContextKey } from './layout'

defineOptions({ name: 'YkLayoutSider' })

const props = withDefaults(defineProps<LayoutSiderProps>(), {
  width: 200,
  collapsedWidth: 64,
  collapsible: false,
  collapsed: undefined,
  theme: 'light',
})

const emit = defineEmits<{
  (e: 'update:collapsed', collapsed: boolean): void
  (e: 'collapse', collapsed: boolean): void
}>()

const bem = createCssScope('layout-sider')
const layoutContext = inject(layoutContextKey, null)
const innerCollapsed = ref(props.collapsed ?? false)

watch(
  () => props.collapsed,
  (collapsed) => {
    if (collapsed !== undefined) innerCollapsed.value = collapsed
  },
)

const isCollapsed = computed(() => props.collapsed ?? innerCollapsed.value)
const currentWidth = computed(() =>
  toPx(isCollapsed.value ? props.collapsedWidth : props.width),
)

function toggle() {
  const next = !isCollapsed.value
  innerCollapsed.value = next
  emit('update:collapsed', next)
  emit('collapse', next)
}

onMounted(() => layoutContext?.registerSider())
onBeforeUnmount(() => layoutContext?.unregisterSider())
</script>
