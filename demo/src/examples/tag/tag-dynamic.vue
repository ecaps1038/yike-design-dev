<template>
  <yk-tag
    v-for="tag in dynamicTags"
    :key="tag"
    class="tag"
    closeable
    @close="handleClose(tag)"
  >
    {{ tag }}
  </yk-tag>
  <YkInput
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    class="input-new-tag"
    size="s"
    @submit="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <yk-button v-else class="button-new-tag" size="s" @click="showInput">
    + New Tag
  </yk-button>
</template>
<script lang="ts" setup>
import { ref, shallowRef } from 'vue'
const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const InputRef = shallowRef()
const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
const showInput = () => {
  inputVisible.value = true
}
const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>
<style lang="less">
.tag {
  margin-right: 10px;
  margin-bottom: 10px;
  max-width: 100px;
}
.input-new-tag {
  display: inline-block;
  .yk-input input {
    width: 75px;
  }
}
</style>
