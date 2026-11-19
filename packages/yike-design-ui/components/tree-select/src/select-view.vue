<template>
  <div
    :class="bem()"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div
      :class="
        bem('trigger', {
          focused,
          disabled,
          'no-border': !bordered,
        })
      "
      role="combobox"
      :aria-expanded="focused"
      :aria-disabled="disabled"
      tabindex="0"
      @click="handleToggle"
      @keydown="handleKeydown"
    >
      <template v-if="multiple">
        <span v-if="currentItems.length" :class="bem('tags')">
          <span
            v-for="item in currentItems"
            :key="String(item.key)"
            :class="bem('tag')"
          >
            {{ item.label }}
            <span
              :class="bem('tag-close')"
              role="button"
              :aria-label="`移除 ${item.label}`"
              @click.stop="handleRemove(item.key)"
            >
              <IconCrossOutline />
            </span>
          </span>
        </span>
        <span v-else :class="bem('placeholder')">{{ placeholder }}</span>
      </template>
      <span v-else :class="[bem('value'), !displayText && bem('placeholder')]">
        {{ displayText || placeholder }}
      </span>

      <span :class="bem('suffix')">
        <span
          v-if="showClear"
          :class="bem('clear')"
          role="button"
          aria-label="清空选择"
          @click.stop="handleClear"
        >
          <IconCrossOutline />
        </span>
        <IconDownOutline
          v-else
          :class="bem('arrow', { open: focused })"
          aria-hidden="true"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { createCssScope } from '../../utils'
import type { Key } from '../../utils'
import type { TreeOption } from '../../tree/src/tree'
import { IconCrossOutline, IconDownOutline } from '../../svg-icon'

defineOptions({ name: 'YkTreeSelectView' })

const props = withDefaults(
  defineProps<{
    currentItems: TreeOption[]
    multiple?: boolean
    displayText?: string
    placeholder?: string
    allowClear?: boolean
    bordered?: boolean
    disabled?: boolean
    focused?: boolean
  }>(),
  {
    currentItems: () => [],
    multiple: false,
    displayText: '',
    placeholder: '请选择',
    allowClear: true,
    bordered: true,
    disabled: false,
    focused: false,
  },
)

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'clear'): void
  (e: 'remove', key: Key): void
  (e: 'close'): void
}>()

const bem = createCssScope('select-view')
const hovering = ref(false)

const hasValue = computed(() => props.currentItems.length > 0)
const showClear = computed(
  () =>
    props.allowClear &&
    hasValue.value &&
    !props.disabled &&
    (hovering.value || props.focused),
)

function handleToggle() {
  if (props.disabled) return
  emit('toggle')
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  const { key } = event
  if (key === 'Enter' || key === ' ' || key === 'ArrowDown') {
    event.preventDefault()
    emit('toggle')
    return
  }
  if (key === 'Escape') {
    event.preventDefault()
    emit('close')
  }
}

function handleClear() {
  if (props.disabled) return
  emit('clear')
}

function handleRemove(key: Key) {
  if (props.disabled) return
  emit('remove', key)
}

defineExpose({ hovering })
</script>
