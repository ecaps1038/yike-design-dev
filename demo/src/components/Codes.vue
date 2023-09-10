<script setup lang="ts">
defineProps({
  code: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="codes">
    <highlightjs :autodetect="false" :code="decodeURIComponent(code)" />
  </div>
</template>

<style scoped lang="less">
@import url('@/style/code-color.less');

.codes {
  padding-bottom: @space-m;
}

pre {
  overflow: hidden;
  max-width: 1200px;
  border-radius: @radius-m;
  text-align: left;

  code.hljs {
    padding: 20px 30px;
  }
}
</style>
