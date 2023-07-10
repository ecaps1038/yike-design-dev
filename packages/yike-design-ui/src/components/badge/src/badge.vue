<template>
  <div id="yk-badge" ref="badge">
    <!-- 徽标 -->
    <slot></slot>
    <transition name="modal">
      <div
        v-if="!status"
        :class="[{ badge: !dot, dot: dot }, type]"
        v-show="count > 0"
        class="yk-badge"
        :style="{
          backgroundColor: color,
          right: !dot ? -rightWidth(count) + 'px' : '',
          borderWidth: border + 'px',
        }"
      >
        <p class="count">{{ nowCount }}</p>
      </div>
    </transition>
    <div v-if="status" class="status">
      <div
        class="status-dot"
        :class="[type]"
        :style="{ backgroundColor: color }"
      ></div>
      <span class="status-text">{{ text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import '../style'
import type { BadgeProps } from './badge'

defineOptions({
  name: 'YkBadge',
})

const props = withDefaults(defineProps<BadgeProps>(), {
  max: 99,
  color: '',
  count: 0,
  border: 1,
})

//关于显示长度控制
let nowCount: any = ref(props.count)
const maxCount = (): void => {
  if (props.count > props.max) {
    nowCount.value = props.max + '+'
  }
}
maxCount()

//关于角标款的的缩进
const rightWidth = (count: number): number => {
  if (count > 9) {
    return 14
  } else {
    return 10
  }
}
//单独使用
const badge = ref(null)

//获取dome元素添加特定样式
const addStyle = () => {
  let boxId: any = badge.value
  //将获取的dome转为数组
  let arr = Array.from(boxId.children)
  // console.log(boxId.children)
  if (arr.length == 1) {
    // console.log(boxId.firstChild)
    arr.map((child: any, index: number) => {
      child.style.right = 'auto'
      child.style.top = 'auto'
      child.style.position = 'relative'
    })
  }
}

onMounted(() => {
  addStyle()
})
</script>
