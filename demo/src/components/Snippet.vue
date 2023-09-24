<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useClipboard } from '@vueuse/core'
import { getHighlighter } from 'shikiji'

defineOptions({ name: 'YkSnippet' })

const { copy } = useClipboard()
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
const normalizeTitle = title.replace(/\s+/g, '-')
const originCode = decodeURIComponent(code)
const showCode = ref(false)
const html = ref('')

const shiki = getHighlighter({
  themes: ['vitesse-light', 'vitesse-dark'],
  langs: ['vue'],
})

shiki.then((highlighter) => {
  html.value = highlighter.codeToHtml(originCode, {
    lang: 'vue',
    themes: {
      dark: 'vitesse-dark',
      light: 'vitesse-light',
    },
  })
})

function onCopy() {
  copy(originCode)
  proxy.$message({
    message: '复制成功',
    type: 'success',
    duration: 1000,
  })
}
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <yk-title :id="normalizeTitle" :level="3">{{ title }}</yk-title>
  <slot name="desc"></slot>
  <div class="demo-block">
    <slot name="demo"></slot>
  </div>
  <yk-space class="flex-end" :size="8">
    <div class="icon" @click="onCopy"><icon-copy-outline /></div>
    <div
      class="icon"
      :class="{ active: showCode }"
      @click="showCode = !showCode"
    >
      <icon-code-outline />
    </div>
  </yk-space>

  <div v-show="showCode" v-html="html"></div>
</template>

<style scoped lang="less">
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

.demo-block {
  margin: 12px 0 8px;
  padding: 20px;
  border: 1px solid @line-color-s;
  border-radius: @radius-m;
  transition: all @animats;
}

.flex-end {
  display: flex;
  justify-content: flex-end;

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

  .active {
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
