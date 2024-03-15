<template>
  <p>
    <yk-tag
      v-for="tag in tags"
      :key="tag.name"
      class="tag"
      type="primary"
      :size="tag.size"
    >
      {{ tag.name }}
    </yk-tag>
  </p>
  <p>
    <yk-tag
      v-for="tag in tags"
      :key="tag.name"
      class="tag"
      type="primary"
      :size="tag.size"
      closeable
    >
      {{ tag.name }}
    </yk-tag>
  </p>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const tags: any = ref([
  { name: 'Tag 1', size: 'l' },
  { name: 'Tag 1', size: 'm' },
  { name: 'Tag 1', size: 's' },
])
</script>
<style lang="less">
.tag {
  margin-right: 10px;
  margin-bottom: 10px;
  max-width: 100px;
}
</style>
