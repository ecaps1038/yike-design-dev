<script setup lang="ts">
const props = defineProps({
  path: {
    type: String,
  }
})
</script>
<template>
  <div class="crumb-item">
    <a :href="path" v-if="path" class="crumb-inner">
      <slot></slot>
    </a>
    <span v-if="!path" class="crumb-inner">
      <slot></slot>
    </span>
    <div class="bias">
      <Icon name="yk-xiexian" />
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../../assets/style/yk-index.less';

.crumb-item {
  display: inline-flex;

  .crumb-inner {
    color: @font-color-m;
  }

  a {
    cursor: pointer;

    &:hover {
      color: @lcolor;
    }
  }

  .bias {
    padding: 0 @space-s;

    .icon {
      font-size: 12px;
      color: @font-color-ss;
    }
  }
}

.last-item {
  .crumb-inner {
    font-weight: 600;
    color: @font-color-l;
  }

  .bias {
    display: none;
  }
}</style>