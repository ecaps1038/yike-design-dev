<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { tryCopy } from '@/utils/tools'
import hljs from 'highlight.js'

defineOptions({ name: 'YkSnippet' })

const proxy: any = getCurrentInstance()?.proxy
const props = defineProps({
  title: {
    type: String,
    default: '标题',
  },
  code: {
    type: String,
    default: '',
  },
})

const { title, code } = props
const normalizeTitle = title.replace(/\s/g, '')
const html = hljs.highlightAuto(decodeURIComponent(code)).value
const codeRef = ref(null)
const showCode = ref(false)

function onCopy() {
  tryCopy(codeRef.value)

  proxy.$message({
    message: '复制成功',
    type: 'success',
    duration: 1000,
  })
}

function toggleShowCodeBlock() {
  showCode.value = !showCode.value
}
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="snippet">
    <yk-title :id="normalizeTitle" :level="3">{{ title }}</yk-title>

    <slot name="desc"></slot>

    <div class="container">
      <slot name="demo"></slot>
    </div>

    <yk-space class="space" :size="8">
      <div class="icon" @click="onCopy"><icon-copy-outline /></div>
      <div
        class="icon"
        :class="{ selected: showCode }"
        @click="toggleShowCodeBlock"
      >
        <icon-code-outline />
      </div>
    </yk-space>

    <pre v-show="showCode" ref="codeRef"><code v-html="html"></code></pre>
  </div>
</template>

<style scoped lang="less">
.snippet {
  margin-top: 28px;
  max-width: 1200px;

  .yk-title {
    &:hover::after {
      opacity: 1;
    }

    &::after {
      content: '#';
      margin-left: 12px;
      color: rgb(var(--lcolor));
      opacity: 0;
      vertical-align: bottom;
      transition: opacity 0.2s;
    }
  }

  .container {
    margin: 12px 0 8px;
    padding: 20px;
    border: 1px solid @line-color-s;
    border-radius: @radius-m;
    transition: all @animats;
  }

  .space {
    display: flex;
    justify-content: flex-end;
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: @radius-m;
    color: @font-color-m;
    background-color: @bg-color-m;
    transition: all @animats;
    cursor: pointer;

    &:hover {
      background-color: @bg-color-s;
    }

    .yk-icon {
      font-size: @size-m;
      color: @font-color-m;
      transition: all @animats;
    }
  }

  .selected {
    background-color: @font-color-l;

    &:hover {
      background-color: @font-color-l;
    }

    .yk-icon {
      color: @bg-color-l;
    }
  }
}
</style>
