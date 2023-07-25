<template>
  <div class="ykcolor-card" :style="{ background: color }">
    <span class="ykcolor-label">{{ label }}</span>
    <span class="ykcolor-value">{{ color }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
})
</script>

<style lang="less" scoped>
.ykcolor-card {
  display: flex;
  padding: 20px;
  width: 208px;
  height: 80;
  border: none;
  border-radius: 5px;
  outline: none;
  flex-direction: column;
  box-sizing: border-box;

  > span {
    font-size: 14px;
    color: #fff;
  }

  .ykcolor-label {
    margin: 5px 0;
  }

  .ykcolor-value {
    font-size: 12px;
  }
}
</style>
