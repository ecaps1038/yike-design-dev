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
    [`yk-button--${props.status}`]: true,
    [`yk-button--${props.type}`]: props.type,
    [`yk-button--${props.size}`]: props.size,
    [`yk-button--${props.round}`]: props.round,
  }
})
</script>

<style scoped lang="less">
@import 'index.less';

.automatic(@color, @textColor: #FFF) {
  background-color: @color;
  border-color: transparent;
  color: @textColor;
}
.yk-button {
  padding: 6px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  white-space: nowrap;
  outline: none;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: @line-color-s;
  color: @font-color-l;
  cursor: pointer;
  transition: all @animatb ease-in-out;
  user-select: none;

  // .btn-type(@type: primary) {
  //   .normal() {
  //     color: ~'@{btn-text-@{type}-default}';
  //     background-color: ~'@{btn-bg-@{type}-default}';
  //     border-color: ~'@{btn-line-@{type}-default}';
  //   }
  //   &--@{type} {
  //     .normal();
  //   }
  // }

  // .btn-status(@type: primary, @status: primary) {
  //   .normal() {
  //     color: ~'@{btn-text-@{type}-@{status}}';
  //     background-color: ~'@{btn-bg-@{type}-@{status}}';
  //     border-color: ~'@{btn-line-@{type}-@{status}}';
  //   }
  //   &--@{status} {
  //     .normal();
  //   }
  // }

  // .btn-type(primary);
  // .btn-type(sceondary);
  // .btn-type(outline);

  // .btn-status(outline);
  // .btn-status(outline, success);
  // .btn-status(outline, warning);
  // .btn-status(outline, danger);

  // .btn-status(sceondary, success);
  // .btn-status(sceondary, success);
  // .btn-status(sceondary, warning);
  // .btn-status(sceondary, danger);

  // // 类型 type
  &--primary {
    .automatic(@pcolor);
  }
  &--sceondary {
    opacity: 0.08;
    background-color: transparent;
    color: transparent;
  }
  &--outline {
    opacity: 0.16;
    background-color: transparent;
    color: transparent;
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
    opacity: 0.4;
    cursor: not-allowed;
  }

  // 伪类
  &:not(:disabled):hover {
    opacity: 0.9;
  }
  &:not(:disabled):active {
    opacity: 0.7;
  }
}
</style>
