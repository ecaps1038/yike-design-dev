<template>
  <div class="yk-drop-item" @click="clickDrop" :class="{ disabled: disabled }">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import {inject} from "vue"
import { $emit } from "../../utils/yikeFunc"

const props = defineProps({
  value: {
    type: [String, Number, Object],
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const dCode = inject("dcode")
const clickDrop = () => {
  $emit("dropitem", {code:dCode,data:props.value})
}

</script>
<style lang="less" scoped>
.yk-drop-item {
  //文字不换行
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  font-size: @size-s;
  line-height: 32px;
  padding: 0 12px;
  border-radius: @radius-s;
  cursor: pointer;

  &:hover {
    background-color: @bg-color-s;
  }
}

.disabled {

  &:hover {
    background-color: @bg-color-l;
  }
}</style>