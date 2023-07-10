<template>
  <div class="case-card">
    <yk-title :level="3">{{ title }}</yk-title>
    <slot name="desc"></slot>
    <div class="container">
      <slot name="demo"></slot>
    </div>

    <yk-space class="space" :size="8">
      <div class="icons" @click="onCopy" v-show="showCode">
        <yk-icon name="yk-kaobei"></yk-icon>
      </div>
      <div class="icons" :class="{ select: showCode }" @click="clickShow">
        <yk-icon name="yk-daima"></yk-icon>
      </div>
    </yk-space>
    <div class="codes" ref="codes" v-show="showCode">
      <slot name="code"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'

import { tryCopy } from '@/utils/tools'

const props = defineProps({
  title: {
    type: String,
    default: '标题',
  },
})

//复制模块
const codes = ref(null)
//信息模块
const { proxy }: any = getCurrentInstance()
//拷贝内容
const onCopy = (): void => {
  tryCopy(codes.value)
  proxy.$message({ type: 'success', message: '拷贝成功' })
}

//关于代码的开关
const showCode = ref(false)
const clickShow = (): void => {
  showCode.value = !showCode.value
}
</script>

<style scoped lang="less">
.case-card {
  max-width: 800px;

  .container {
    margin: 12px 0 8px;
    border-radius: @radius-m;
    border: 1px solid @line-color-s;
    padding: 20px;
    transition: all @animats;
  }

  .space {
    display: flex;
    justify-content: flex-end;
  }

  .icons {
    height: 28px;
    width: 28px;
    border-radius: @radius-m;
    background-color: @bg-color-m;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all @animats;

    .icon {
      color: @font-color-m;
      font-size: 16px;
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
    border-radius: @radius-m;
    overflow: hidden;
    text-align: left;
    max-width: 800px;

    code.hljs {
      padding: 20px 30px;
    }
  }
}
</style>
