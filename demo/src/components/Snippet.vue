<template>
  <div class="case-card">
    <yk-title :level="3">{{ title }}</yk-title>
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
      <slot name="code"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { tryCopy } from '@/utils/tools'
const proxy: any = getCurrentInstance()?.proxy
const props = defineProps({
  title: {
    type: String,
    default: '标题',
  },
})

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
.case-card {
  max-width: 800px;
  margin-top: 28px;
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
      font-size: @size-m;
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
  }
}
</style>
