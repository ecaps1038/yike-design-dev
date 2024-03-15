<template>
  <yk-affix :offset="80" position="bottom" @change="change">
    <yk-button>offset bottom 80px</yk-button>
  </yk-affix>
</template>
<script lang="ts" setup>
const change = (v: any) => {
  console.log(v)
}
</script>
