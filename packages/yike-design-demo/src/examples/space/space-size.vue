<template>
  <p>内置尺寸：</p>
  <yk-radio-group v-model="size" type="button">
    <yk-radio value="ss">ss</yk-radio>
    <yk-radio value="s">s</yk-radio>
    <yk-radio value="m">m</yk-radio>
    <yk-radio value="l">l</yk-radio>
    <yk-radio value="xl">xl</yk-radio>
  </yk-radio-group>
  <yk-space :size="size" class="margin">
    <yk-button>按钮1</yk-button>
    <yk-button>按钮2</yk-button>
    <yk-button>按钮3</yk-button>
  </yk-space>

  <p>
    自定义间距：
    <yk-input v-model="inputSize" style="width: 80px" />
  </p>
  <yk-space :size="`${inputSize}px`" class="margin">
    <yk-button>按钮1</yk-button>
    <yk-button>按钮2</yk-button>
    <yk-button>按钮3</yk-button>
  </yk-space>

  <p>自定义水平和竖直间距：[10, 30]</p>
  <yk-space wrap :size="[10, 20]" class="margin" style="width: 300px">
    <yk-button v-for="item in 10" :key="item">按钮</yk-button>
  </yk-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const size = ref('l') as any
const inputSize = ref('10') as any
</script>

<style>
.margin {
  margin: 12px 0 24px;
}
</style>
