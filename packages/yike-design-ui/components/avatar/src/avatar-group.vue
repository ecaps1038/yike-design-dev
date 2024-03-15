<template>
  <div ref="$avatarGroup" class="yk-avatar-group">
    <slot></slot>
    <div
      class="yk-avatar-group-more"
      :style="{
        width: size,
        height: size,
        borderRadius: shape,
        display: overstep > 1 ? 'flex' : 'none',
      }"
    >
      <span>+{{ overstep - 1 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import { getSize, getShape } from './util'
import { AvatarGroupProps } from './avatar'

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

const size = getSize(props.size) + 'px'
const shape = getShape(props.shape) + 'px'

//获取dome元素
const $avatarGroup = ref()
const overstep = ref(0) //是否超出max
//获取dome元素添加特定样式
const addStyle = () => {
  let boxId: HTMLDivElement = $avatarGroup.value
  //将获取的dome转为数组

  Array.from(boxId.children).map((child, index) => {
    const avatar: HTMLDivElement = child as HTMLDivElement
    avatar.style.marginRight = -getSize(props.size) / 3 + 'px'
    if (index >= props.max) {
      overstep.value++
      //如果大于最大值隐藏
      avatar.style.display = 'none'
    }
  })
}

onMounted(addStyle)
</script>
