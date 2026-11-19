<template>
  <div
    ref="wrapperRef"
    :class="bem('wrapper')"
    @keydown="handleKeydown"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
  >
    <div
      ref="triggerRef"
      :class="
        bem('trigger', [mergedSize], {
          open: isOpen,
          disabled: mergedDisabled,
          multiple,
          'is-error': isError,
        })
      "
      role="combobox"
      :aria-expanded="isOpen"
      :aria-controls="listboxId"
      :aria-activedescendant="activeDescendant"
      :aria-disabled="mergedDisabled"
      :aria-label="ariaLabel"
      tabindex="0"
      @click="toggleDropdown"
    >
      <template v-if="multiple">
        <span v-if="selectedOptions.length" :class="bem('tags')">
          <span
            v-for="item in selectedOptions"
            :key="String(item.value)"
            :class="bem('tag')"
          >
            {{ item.label }}
            <span
              :class="bem('tag-close')"
              role="button"
              :aria-label="`移除 ${item.label}`"
              @click.stop="removeSelected(item.value)"
            >
              <IconCrossOutline />
            </span>
          </span>
        </span>
        <span v-else :class="bem('placeholder')">{{ placeholder }}</span>
      </template>
      <span v-else :class="[bem('selected'), !hasValue && bem('placeholder')]">
        {{ selectedLabel }}
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
          :class="bem('arrow', { open: isOpen })"
          aria-hidden="true"
        />
      </span>
    </div>

    <Teleport to="body">
      <div
        v-if="isOpen"
        :id="listboxId"
        ref="dropdownRef"
        :class="bem('dropdown')"
        :style="dropdownStyle"
        role="listbox"
        :aria-multiselectable="multiple"
        @keydown="handleKeydown"
      >
        <div v-if="filterable" :class="bem('filter')">
          <input
            ref="filterInputRef"
            v-model="filterText"
            :class="bem('filter-input')"
            type="text"
            :placeholder="filterPlaceholder"
            :aria-label="filterPlaceholder"
          />
        </div>

        <div v-if="loading" :class="bem('empty')" role="status">
          <yk-spinner :size="16" />
          <span>{{ loadingText }}</span>
        </div>
        <ul v-else :class="bem('options')">
          <li
            v-for="(option, index) in filteredOptions"
            :id="optionId(index)"
            :key="String(option.value)"
            :class="
              bem('option', {
                selected: isSelected(option.value),
                disabled: option.disabled,
                active: activeIndex === index,
              })
            "
            role="option"
            :aria-selected="isSelected(option.value)"
            :aria-disabled="option.disabled"
            @click="handleSelect(option)"
            @mouseenter="setActiveIndex(index)"
          >
            <span :class="bem('option-label')">{{ option.label }}</span>
            <IconTickMinOutline
              v-if="isSelected(option.value)"
              :class="bem('option-check')"
              aria-hidden="true"
            />
          </li>
          <li v-if="!filteredOptions.length" :class="bem('empty')">
            {{ emptyText }}
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  toRefs,
  watch,
} from 'vue'
import type { CSSProperties } from 'vue'
import { createCssScope, popupManager , useFormItem } from '../../utils'
import type { SelectOption, SelectOptionValue, SelectProps } from './select'
import { genSelectId } from './select'
import {
  IconCrossOutline,
  IconDownOutline,
  IconTickMinOutline,
} from '../../svg-icon'
import YkSpinner from '../../spinner'

defineOptions({ name: 'YkSelect' })

const bem = createCssScope('select')

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: undefined,
  options: () => [],
  multiple: false,
  disabled: false,
  filterable: false,
  clearable: false,
  loading: false,
  loadingText: '加载中',
  placeholder: '请选择',
  filterPlaceholder: '请输入关键字',
  emptyText: '无匹配数据',
  size: 'l',
  status: undefined,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: SelectProps['modelValue']): void
  (e: 'change', value: SelectProps['modelValue']): void
  (e: 'visible-change', visible: boolean): void
  (e: 'clear'): void
  (e: 'remove-tag', value: SelectOptionValue): void
  (e: 'focus'): void
  (e: 'blur'): void
}>()

const { disabled, status, size } = toRefs(props)
const { mergedDisabled, mergedSize, isError, validate } = useFormItem({
  disabled,
  status,
  size,
})

const uid = genSelectId()
const listboxId = `yk-select-listbox-${uid}`

const wrapperRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const dropdownRef = ref<HTMLElement>()
const filterInputRef = ref<HTMLInputElement>()

const isOpen = ref(false)
const filterText = ref('')
const activeIndex = ref(-1)
const dropdownStyle = ref<CSSProperties>({})
let zIndex = popupManager.nextIndex()

const ariaLabel = computed(() => (props.multiple ? '多选选择器' : '选择器'))

const selectedValues = computed<SelectOptionValue[]>(() => {
  const value = props.modelValue
  if (Array.isArray(value)) return value
  return value === undefined || value === null ? [] : [value]
})

const selectedOptions = computed<SelectOption[]>(() =>
  props.options.filter((option) => selectedValues.value.includes(option.value)),
)

const hasValue = computed(() => selectedValues.value.length > 0)

const selectedLabel = computed(
  () => selectedOptions.value[0]?.label ?? props.placeholder,
)

const showClear = computed(
  () => props.clearable && hasValue.value && !mergedDisabled.value,
)

const filteredOptions = computed(() => {
  const keyword = filterText.value.trim().toLowerCase()
  if (!keyword) return props.options
  return props.options.filter((option) =>
    option.label.toLowerCase().includes(keyword),
  )
})

const activeDescendant = computed(() => {
  if (!isOpen.value || activeIndex.value < 0) return undefined
  return optionId(activeIndex.value)
})

function optionId(index: number) {
  return `yk-select-option-${uid}-${index}`
}

function isSelected(value: SelectOptionValue) {
  return selectedValues.value.includes(value)
}

function setActiveIndex(index: number) {
  const option = filteredOptions.value[index]
  if (!option || option.disabled) return
  activeIndex.value = index
}

function initActiveIndex() {
  const selectedIndex = filteredOptions.value.findIndex(
    (option) => !option.disabled && isSelected(option.value),
  )
  const firstEnabledIndex = filteredOptions.value.findIndex(
    (option) => !option.disabled,
  )
  activeIndex.value = selectedIndex > -1 ? selectedIndex : firstEnabledIndex
  scrollActiveIntoView()
}

function moveActiveIndex(step: number) {
  const options = filteredOptions.value
  if (!options.length) return
  let index = activeIndex.value
  for (let count = 0; count < options.length; count++) {
    index += step
    if (index < 0) index = options.length - 1
    if (index >= options.length) index = 0
    if (!options[index].disabled) {
      activeIndex.value = index
      scrollActiveIntoView()
      return
    }
  }
}

function scrollActiveIntoView() {
  nextTick(() => {
    if (activeIndex.value < 0) return
    const el = dropdownRef.value?.querySelector(
      `#${optionId(activeIndex.value)}`,
    ) as HTMLElement | null
    el?.scrollIntoView?.({ block: 'nearest' })
  })
}

function getDropdownStyle(dropdownHeight: number): CSSProperties {
  const trigger = triggerRef.value
  const rect = trigger?.getBoundingClientRect()
  if (!rect) {
    return {
      position: 'fixed',
      left: '0px',
      top: '0px',
      width: '160px',
      zIndex,
    }
  }
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight
  const gap = 4
  const canPlaceBottom =
    rect.bottom + gap + dropdownHeight <= viewportHeight ||
    rect.top - gap - dropdownHeight < 0
  const base: CSSProperties = {
    position: 'fixed',
    left: `${Math.max(rect.left, 8)}px`,
    width: `${Math.max(rect.width, 160)}px`,
    zIndex,
  }
  // 向上弹出时必须只设置 bottom，不能同时保留 top，否则 fixed 元素会被拉伸
  return canPlaceBottom
    ? { ...base, top: `${rect.bottom + gap}px` }
    : { ...base, bottom: `${viewportHeight - rect.top + gap}px` }
}

function updatePosition() {
  dropdownStyle.value = getDropdownStyle(dropdownRef.value?.offsetHeight || 240)
}

const handleReposition = () => updatePosition()

function addGlobalListeners() {
  window.addEventListener('scroll', handleReposition, true)
  window.addEventListener('resize', handleReposition)
}

function removeGlobalListeners() {
  window.removeEventListener('scroll', handleReposition, true)
  window.removeEventListener('resize', handleReposition)
}

async function openDropdown() {
  if (mergedDisabled.value || isOpen.value) return
  zIndex = popupManager.nextIndex()
  // 首帧就给出 fixed 定位，避免下拉以文档流渲染后 focus 触发页面滚动
  dropdownStyle.value = getDropdownStyle(240)
  isOpen.value = true
  filterText.value = ''
  emit('visible-change', true)
  addGlobalListeners()
  await nextTick()
  updatePosition()
  initActiveIndex()
  if (props.filterable) {
    await nextTick()
    filterInputRef.value?.focus({ preventScroll: true })
  }
}

function closeDropdown(restoreFocus = false) {
  if (!isOpen.value) return
  isOpen.value = false
  filterText.value = ''
  activeIndex.value = -1
  removeGlobalListeners()
  emit('visible-change', false)
  if (restoreFocus) triggerRef.value?.focus({ preventScroll: true })
}

function toggleDropdown() {
  if (mergedDisabled.value) return
  if (isOpen.value) closeDropdown()
  else openDropdown()
}

function triggerChange(value: SelectProps['modelValue']) {
  validate('change')
  emit('update:modelValue', value)
  emit('change', value)
}

function handleSelect(option: SelectOption) {
  if (option.disabled) return
  if (props.multiple) {
    const nextValue = [...selectedValues.value]
    const index = nextValue.indexOf(option.value)
    if (index > -1) nextValue.splice(index, 1)
    else nextValue.push(option.value)
    triggerChange(nextValue)
    // 多选保持展开，便于连续选择
    filterText.value = ''
    initActiveIndex()
    return
  }
  triggerChange(option.value)
  closeDropdown()
}

function removeSelected(value: SelectOptionValue) {
  if (mergedDisabled.value || !props.multiple) return
  const nextValue = selectedValues.value.filter((item) => item !== value)
  triggerChange(nextValue)
  emit('remove-tag', value)
}

function handleClear() {
  if (mergedDisabled.value) return
  triggerChange(props.multiple ? [] : undefined)
  emit('clear')
}

function handleKeydown(event: KeyboardEvent) {
  if (mergedDisabled.value) return
  const { key } = event
  switch (key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        openDropdown()
      } else {
        moveActiveIndex(1)
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) {
        openDropdown()
      } else {
        moveActiveIndex(-1)
      }
      break
    case 'Home':
      if (!isOpen.value) return
      event.preventDefault()
      activeIndex.value = -1
      moveActiveIndex(1)
      break
    case 'End':
      if (!isOpen.value) return
      event.preventDefault()
      activeIndex.value = filteredOptions.value.length
      moveActiveIndex(-1)
      break
    case 'Enter': {
      event.preventDefault()
      if (!isOpen.value) {
        openDropdown()
        return
      }
      const option = filteredOptions.value[activeIndex.value]
      if (option) handleSelect(option)
      break
    }
    case 'Escape':
      if (!isOpen.value) return
      event.preventDefault()
      closeDropdown(true)
      break
    case 'Tab':
      if (isOpen.value) closeDropdown()
      break
    default:
      break
  }
}

function handleFocusIn() {
  emit('focus')
}

function handleFocusOut(event: FocusEvent) {
  const nextTarget = event.relatedTarget as Node | null
  if (nextTarget && wrapperRef.value?.contains(nextTarget)) return
  if (nextTarget && dropdownRef.value?.contains(nextTarget)) return
  validate('blur')
  emit('blur')
}

watch(
  () => props.options,
  () => {
    if (isOpen.value) initActiveIndex()
  },
  { deep: true },
)

watch(
  () => filterText.value,
  () => {
    activeIndex.value = -1
    if (isOpen.value) {
      nextTick(initActiveIndex)
    }
  },
)

watch(
  () => mergedDisabled.value,
  (value) => {
    if (value) closeDropdown()
  },
)

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node
  if (wrapperRef.value?.contains(target)) return
  if (dropdownRef.value?.contains(target)) return
  closeDropdown()
}

onMounted(() => {
  document.addEventListener('mousedown', handleDocumentClick, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleDocumentClick, true)
  removeGlobalListeners()
})

defineExpose({
  focus: () => triggerRef.value?.focus(),
  blur: () => (document.activeElement as HTMLElement | null)?.blur?.(),
  open: openDropdown,
  close: () => closeDropdown(),
})
</script>
