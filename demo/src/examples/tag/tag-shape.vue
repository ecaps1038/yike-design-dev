<template>
  <p>
    <yk-tag
      v-for="tag in tags"
      :key="tag.name"
      class="tag"
      shape="square"
      :closeable="tag.closeable"
      :type="tag.type"
    >
      {{ tag.name }}
    </yk-tag>
  </p>
  <p>
    <yk-tag
      v-for="tag in tags"
      :key="tag.name"
      class="tag"
      shape="round"
      :closeable="tag.closeable"
      :type="tag.type"
    >
      {{ tag.name }}
    </yk-tag>
  </p>
  <p>
    <yk-tag
      v-for="tag in tags"
      :key="tag.name"
      shape="mark"
      class="tag"
      :closeable="tag.closeable"
      :type="tag.type"
    >
      {{ tag.name }}
    </yk-tag>
  </p>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const tags: any = ref([
  { name: 'Tag 1' },
  { name: 'Tag 1', type: 'success' },
  { name: 'Tag 1', type: 'warning', closeable: true },
  { name: 'Tag 1', type: 'danger', closeable: true },
  { name: 'Tag 1', type: 'primary', closeable: true },
])
</script>
<style lang="less">
.tag {
  margin-right: 10px;
  margin-bottom: 10px;
  max-width: 100px;
}
</style>
