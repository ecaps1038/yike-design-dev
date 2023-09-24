<template>
  <yk-radio-group v-model="justify" type="button">
    <yk-radio value="start">start</yk-radio>
    <yk-radio value="center">center</yk-radio>
    <yk-radio value="end">end</yk-radio>
    <yk-radio value="between">between</yk-radio>
    <yk-radio value="around">around</yk-radio>
    <yk-radio value="evenly">evenly</yk-radio>
  </yk-radio-group>
  <yk-space :justify="justify" style="margin-top: 12px">
    <yk-button>按钮1</yk-button>
    <yk-button>按钮2</yk-button>
    <yk-button shape="circle"><IconPlusOutline /></yk-button>
  </yk-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const justify = ref('start') as any
</script>
