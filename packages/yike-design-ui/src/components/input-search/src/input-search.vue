<template>
  <yk-input
    :id="id"
    v-model="value"
    :name="name"
    :clearable="clearable"
    :size="size"
    :placeholder="placeholder"
    :loading="loading"
    @keydown.enter="search"
  >
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template #append>
      <slot name="suffix">
        <yk-button @click="search">搜索</yk-button>
      </slot>
    </template>
  </yk-input>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { InputSearchProps } from './input-search'
defineOptions({
  name: 'YkInputSearch',
})
const props = withDefaults(defineProps<InputSearchProps>(), {
  name: '',
  size: 'l',
  placeholder: '',
  clearable: true,
  loading: false,
})
const value = ref<string>()
const emits = defineEmits(['search', 'change'])
const search = () => {
  emits('search', value.value)
}
</script>
