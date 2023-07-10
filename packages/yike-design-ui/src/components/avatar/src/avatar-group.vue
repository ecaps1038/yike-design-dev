<template>
  <div class="yk-avatar-group" ref="avator">
    <slot></slot>
    <div
      class="more-avatar"
      :style="{
        width: getSize(size) + 'px',
        height: getSize(size) + 'px',
        lineHeight: getSize(size) - 4 + 'px',
        borderRadius: getShape(shape) + 'px',
        display: overstep > 1 ? 'block' : 'none',
      }"
    >
      +{{ overstep - 1 }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, provide, onMounted, h } from 'vue'
import { getSize, getShape } from './util'
import { AvatarGroupProps } from './avatar'
import '../style'

defineOptions({
  name: 'YkAvatarGroup',
})

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  max: 3,
  shape: 'circle',
  size: 40,
})
//传递给头像信息
provide('size', props.size)
provide('shape', props.shape)

//获取dome元素
const avator = ref(null)
const overstep = ref(0) //是否超出max
//获取dome元素添加特定样式
const addStyle = () => {
  let boxid: any = avator.value
  //将获取的dome转为数组
  let arr = Array.from(boxid.children)

  arr.map((child: any, index: number) => {
    child.style.marginRight = -getSize(props.size) / 3 + 'px'
    if (index >= props.max) {
      overstep.value++
      //如果大于最大值隐藏
      child.style.display = 'none'
    }
  })
}

onMounted(() => {
  addStyle()
})
</script>
