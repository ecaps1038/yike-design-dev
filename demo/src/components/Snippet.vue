<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="case-card">
    <!-- id 用于锚点定位 -->
    <yk-title :id="title" :level="3">{{ title }}</yk-title>
    <slot name="desc"></slot>
    <div class="container">
      <slot name="demo"></slot>
    </div>
    <yk-space class="space" :size="8">
      <div v-show="showCode" class="icons" @click="onCopy">
        <yk-icon name="yk-kaobei"></yk-icon>
      </div>
      <div class="icons" :class="{ select: showCode }" @click="clickShow">
        <yk-icon name="yk-daima"></yk-icon>
      </div>
    </yk-space>
    <div v-show="showCode" ref="codes" class="codes">
      <pre class="hljs"><code v-html="html"></code></pre>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { tryCopy } from '@/utils/tools'
import hljs from 'highlight.js'
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

const html = hljs.highlightAuto(decodeURIComponent(props.code)).value

//复制模块
const codes = ref(null)
//信息模块

//拷贝内容
const onCopy = (): void => {
  tryCopy(codes.value)
  proxy.$message({ message: '复制成功', type: 'success', duration: 1000 })
}

//关于代码的开关
const showCode = ref(false)
const clickShow = (): void => {
  showCode.value = !showCode.value
}
</script>

<style scoped lang="less">
/* stylelint-disable */
.case-card {
  margin-top: 28px;
  max-width: 800px;

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
    cursor: pointer;

    .icon {
      font-size: @size-m;
      color: @font-color-m;
      transition: all @animats;
    }

    &:hover {
      background-color: @bg-color-s;

      .icon {
        color: @font-color-l;
      }
    }
  }

  .select {
    background-color: @font-color-l;

    .icon {
      color: @bg-color-l;
    }

    &:hover {
      background-color: @font-color-l;

      .icon {
        color: @bg-color-l;
      }
    }
  }

  .codes {
    padding-top: @space-m;
  }

  pre {
    overflow: hidden;
    max-width: 800px;
    border-radius: @radius-m;
    text-align: left;
  }
}
</style>
