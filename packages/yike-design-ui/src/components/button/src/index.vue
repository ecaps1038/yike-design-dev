<template>
  <button :class="ykButtonClass" :disabled="disabled || loading">
    <template>
      <svg viewBox="25 25 50 50" v-show="loading">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </template>

    <slot name="icon" />
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'YKButton',
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import ButtonProps from './index'

const props = defineProps(ButtonProps)

const ykButtonClass = computed(() => {
  return {
    'yk-button': true,
    'yk-button--long': props.long,
    'yk-button--disabled': props.disabled || props.loading,
    [`yk-button--${props.status}`]: props.status,
    [`yk-button--${props.type}`]: props.type,
    [`yk-button--${props.size}`]: props.size,
    [`yk-button--${props.round}`]: props.round,
  }
})
</script>

<style scoped lang="less">
.automatic(@color, @textColor: #FFF) {
  background-color: @color;
  border-color: @color;
  color: @textColor;
}
.yk-button {
  padding: 6px 16px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: @line-color-s;
  color: @gray;
  box-sizing: border-box;

  // 类型 type
  &--primary {
    .automatic(@pcolor);
  }
  &--sceondary {
    .automatic(@font-color-l, @font-color-l);
    opacity: 0.8;
  }

  &--outline {
    .automatic(@font-color-l, @font-color-l);
    opacity: 0.16;
  }

  // 状态 status
  &--success {
    .automatic(@scolor);
  }
  &--warning {
    .automatic(@wcolor);
  }
  &--danger {
    .automatic(@ecolor);
  }

  // 尺寸 size
  &--s {
    min-width: 24px;
    height: 24px;
    padding: 0px 8px;
  }
  &--m {
    height: 32px;
    padding: 0px 16px;
  }
  &--l {
    height: 36px;
    padding: 0px 16px;
  }
  &--xl {
    height: 48px;
    padding: 0px 24px;
  }
  &--long {
    width: 100%;
    display: block;
  }

  // 禁用
  &--disabled {
    cursor: disabled;
  }

  // 伪类
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.7;
  }
}
</style>
