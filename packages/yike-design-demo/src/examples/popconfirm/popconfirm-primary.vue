<template>
  <yk-space>
    <yk-popconfirm
      title="我自定义的标题"
      content="不吃学习的苦，就要吃生活的苦。书山有路勤为径，学海无涯苦作舟"
      :arrow="false"
      @cancel="cancel"
      @confirm="confirm"
    >
      <yk-button>自定义内容</yk-button>
    </yk-popconfirm>
    <yk-popconfirm
      title="我自定义的标题"
      content="不吃学习的苦，就要吃生活的苦。书山有路勤为径，学海无涯苦作舟"
      :show-cancel="false"
    >
      <yk-button>隐藏取消按钮</yk-button>
    </yk-popconfirm>
  </yk-space>
</template>
<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
function cancel() {
  proxy.$message({ type: 'warning', message: '你点击了取消按钮' })
}
function confirm() {
  proxy.$message({ type: 'primary', message: '你点击了确认按钮' })
}
</script>
