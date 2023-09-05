<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { tryCopy, scrollToElement } from '@/utils/tools'
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

const normalizeTitle = props.title.replace(/\s/g, '')
const html = hljs.highlightAuto(decodeURIComponent(props.code)).value

//复制模块
const codes = ref(null)
//信息模块

//拷贝内容
const onCopy = (): void => {
  tryCopy(codes.value)
  proxy.$message({
    message: '复制成功',
    type: 'success',
    duration: 1000,
  })
}

//关于代码的开关
const showCode = ref(false)
const clickShow = (): void => {
  showCode.value = !showCode.value
}

const scrollToDemo = (ev: MouseEvent) => {
  ev.preventDefault()
  window.history.pushState(
    window.history.state,
    '',
    (ev.target as HTMLAnchorElement).href,
  )
  scrollToElement(ev.target as HTMLElement)
}
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="case-card">
    <!-- id 用于锚点定位 -->
    <yk-title :id="normalizeTitle" :level="3">
      {{ title }}
      <a :href="`#${normalizeTitle}`" @click="scrollToDemo">#</a>
    </yk-title>
    <slot name="desc"></slot>
    <div class="container">
      <slot name="demo"></slot>
    </div>
    <yk-space class="space" :size="8">
      <div class="icons" @click="onCopy">
        <icon-copy-outline />
      </div>
      <div class="icons" :class="{ select: showCode }" @click="clickShow">
        <icon-code-outline />
      </div>
    </yk-space>
    <div v-show="showCode" ref="codes" class="codes">
      <pre class="hljs"><code v-html="html"></code></pre>
    </div>
  </div>
</template>

<style scoped lang="less">
/* stylelint-disable */
.case-card {
  margin-top: 28px;
  max-width: 1200px;

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

  .icons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: @radius-m;
    background-color: @bg-color-m;
    transition: all @animats;
    color: @font-color-m;
    cursor: pointer;

    .yk-icon {
      font-size: @size-m;
      color: @font-color-m;
      transition: all @animats;
    }

    &:hover {
      background-color: @bg-color-s;

      .yk-icon {
        color: @font-color-l;
      }
    }
  }

  .select {
    background-color: @font-color-l;
    .yk-icon {
      color: @bg-color-l;
    }
    &:hover {
      background-color: @font-color-l;
      .yk-icon {
        color: @bg-color-l;
      }
    }
  }

  .yk-title {
    a {
      opacity: 0;
      transition: none;
    }

    &:hover a {
      opacity: 1;
    }

    &:focus-within a {
      opacity: 1;
    }
  }
}
</style>
