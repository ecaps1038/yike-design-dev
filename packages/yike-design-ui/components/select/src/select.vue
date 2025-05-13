<template>
  <div :class="bem('wrapper', { disabled })">
    <div
      :class="
        bem('trigger', {
          open: isOpen,
          disabled,
          multiple,
          'has-value': hasValue,
        })
      "
      @click="toggleDropdown"
    >
      <span v-if="!multiple" :class="bem('selected-value')">
        {{ selectedLabel }}
      </span>
      <template v-else>
        <span
          v-for="(item, index) in selectedOptions"
          :key="index"
          :class="bem('tag')"
        >
          {{ item.label }}
          <span
            :class="bem('tag-close')"
            @click.stop="removeSelected(item.value)"
          >
            ×
          </span>
        </span>
      </template>
      <span :class="bem('arrow', { open: isOpen })">
        <IconDownOutline />
      </span>
    </div>

    <transition name="yk-select-dropdown">
      <div v-show="isOpen" :class="bem('dropdown')" @click.stop>
        <div v-if="filterable" :class="bem('filter')">
          <input
            v-model="filterText"
            type="text"
            :placeholder="filterPlaceholder"
            @input="handleFilter"
          />
        </div>
        <ul :class="bem('options')">
          <li
            v-for="option in filteredOptions"
            :key="option.value"
            :class="
              bem('option', {
                selected: isSelected(option.value),
                disabled: option.disabled,
                hover: hoverIndex === option.value,
              })
            "
            @click="handleSelect(option)"
            @mouseenter="hoverIndex = option.value"
          >
            <span v-if="multiple" :class="bem('checkbox')">
              <input
                type="checkbox"
                :checked="isSelected(option.value)"
                :disabled="option.disabled"
              />
            </span>
            <span :class="bem('option-label')">{{ option.label }}</span>
          </li>
          <li v-if="filteredOptions.length === 0" :class="bem('option')">
            {{ emptyText }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { createCssScope } from '../../utils'
import { SelectProps } from './select'
import { IconDownOutline } from '../../svg-icon'
defineOptions({ name: 'YkSelect' })

const bem = createCssScope('select')

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: undefined,
  options: () => [],
  multiple: false,
  disabled: false,
  filterable: false,
  filterPlaceholder: '请选择',
  emptyText: '无匹配数据',
  size: 'm',
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'visible-change', visible: boolean): void
}>()

const isOpen = ref(false)
const hoverIndex = ref<string | number | boolean | null>(null)
const filterText = ref('')
const filteredOptions = ref<typeof props.options>([])

// 初始化过滤选项
filteredOptions.value = props.options

// 计算属性
const selectedLabel = computed(() => {
  if (props.multiple) return ''
  const selected = props.options.find(
    (option) => option.value === props.modelValue,
  )
  return selected?.label || props.filterPlaceholder
})

const selectedOptions = computed(() => {
  if (!props.multiple || !Array.isArray(props.modelValue)) return []
  return props.options.filter((option) =>
    props.modelValue.includes(option.value),
  )
})

const hasValue = computed(() => {
  return props.multiple
    ? Array.isArray(props.modelValue) && props.modelValue.length > 0
    : props.modelValue !== undefined && props.modelValue !== null
})

// 方法
const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  emit('visible-change', isOpen.value)
}

const handleSelect = (option: (typeof props.options)[0]) => {
  if (option.disabled) return

  if (props.multiple) {
    const currentValue = Array.isArray(props.modelValue)
      ? [...props.modelValue]
      : []
    const index = currentValue.indexOf(option.value)

    if (index > -1) {
      currentValue.splice(index, 1)
    } else {
      currentValue.push(option.value)
    }

    emit('update:modelValue', currentValue)
    emit('change', currentValue)
  } else {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    isOpen.value = false
    emit('visible-change', false)
  }
}

const removeSelected = (value: string | number | boolean) => {
  if (props.disabled || !props.multiple) return

  const currentValue = Array.isArray(props.modelValue)
    ? [...props.modelValue]
    : []
  const index = currentValue.indexOf(value)

  if (index > -1) {
    currentValue.splice(index, 1)
    emit('update:modelValue', currentValue)
    emit('change', currentValue)
  }
}

const isSelected = (value: string | number | boolean) => {
  return props.multiple
    ? Array.isArray(props.modelValue) && props.modelValue.includes(value)
    : props.modelValue === value
}

const handleFilter = () => {
  if (!filterText.value) {
    filteredOptions.value = props.options
    return
  }

  filteredOptions.value = props.options.filter((option) =>
    option.label.toLowerCase().includes(filterText.value.toLowerCase()),
  )
}

// 点击外部关闭下拉
const handleClickOutside = (event: MouseEvent) => {
  const el = document.querySelector(`.${bem('wrapper')}`)
  if (el && !el.contains(event.target as Node)) {
    isOpen.value = false
    emit('visible-change', false)
  }
}

// 生命周期
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 监听
watch(
  () => props.options,
  (newOptions) => {
    filteredOptions.value = newOptions
  },
  { deep: true },
)
</script>
