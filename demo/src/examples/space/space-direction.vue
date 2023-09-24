<template>
  <p>内置尺寸：</p>
  <yk-radio-group v-model="dir" type="button">
    <yk-radio value="horizontal">horizontal</yk-radio>
    <yk-radio value="vertical">vertical</yk-radio>
    <yk-radio value="horizontal-reverse">horizontal-reverse</yk-radio>
    <yk-radio value="vertical-reverse">vertical-reverse</yk-radio>
  </yk-radio-group>
  <yk-space :dir="dir" class="margin" inline>
    <yk-button>按钮1</yk-button>
    <yk-button>按钮2</yk-button>
    <yk-button>按钮3</yk-button>
  </yk-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dir = ref('horizontal') as any
</script>
