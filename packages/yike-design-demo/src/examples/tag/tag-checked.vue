<template>
  <div>
    <yk-tag checked style="margin-right: 8px">Checked</yk-tag>
    <yk-tag :checked="checked" @change="onChange">
      <template #default="{ isChecked }">
        {{ isChecked ? '选中状态' : '未选中状态' }}
      </template>
    </yk-tag>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const checked = ref(false)
const onChange = (status: boolean) => {
  checked.value = status
}
</script>
