<template>
  <yk-tag
    v-for="tag in tags"
    :key="tag.name"
    class="tag"
    :type="tag.type"
    disabled
    closeable
  >
    {{ tag.name }}
  </yk-tag>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const tags: any = ref([
  { name: 'Tag 1' },
  { name: 'Tag 1', type: 'success' },
  { name: 'Tag 1', type: 'warning' },
  { name: 'Tag 1', type: 'danger' },
  { name: 'Tag 1', type: 'primary' },
])
</script>
<style lang="less">
.tag {
  margin-right: 10px;
  margin-bottom: 10px;
  max-width: 100px;
}
</style>
