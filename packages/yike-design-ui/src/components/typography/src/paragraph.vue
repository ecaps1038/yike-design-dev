<template>
  <div class="yk-typography">
    <div class="yk-paragraph">
      <p ref="getDivRef" :class="[type, { strong: strong }]">
        <slot></slot>
        <IconCopyOutline v-show="copyable" @click="onCopy" />
      </p>
      <div v-show="isMore" class="more" @click="getMore">展开</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { IconCopyOutline } from '../../svg-icon'
import { paragraphProps, ellipsisType } from './typography'
import { tryCopy } from '../../utils'

defineOptions({
  name: 'YkParagraph',
})

const props = withDefaults(defineProps<paragraphProps>(), {
  strong: false,
  type: 'default',
  ellipsis: (): ellipsisType => {
    return { rows: 0, showMore: false }
  },
})

const extraContent = ref<string>('')
const isMore = ref(false)
//获取dome元素
const getDivRef = ref<HTMLElement>()

const moreLine = (rows: number | undefined) => {
  if (!rows) return

  const boxId: HTMLElement | undefined = getDivRef.value
  if (!boxId) return

  const { lineHeight } = getComputedStyle(boxId)
  const top = rows * parseInt(lineHeight)
  extraContent.value = boxId.innerHTML
  let tempStr = boxId.innerHTML
  let len = tempStr.length
  let i = 0

  if (boxId.offsetHeight > top) {
    if (props.ellipsis.showMore) {
      isMore.value = true
    }

    let temp = ''
    boxId.innerHTML = ''

    while (boxId.offsetHeight <= top && i < len) {
      temp = tempStr.substring(0, i + 1)
      i++
      boxId.innerHTML = temp
    }

    tempStr = temp.substring(0, temp.length - 1)
    len = tempStr.length

    if (isMore.value) {
      boxId.innerHTML = tempStr.substring(0, len - 3) + '...'
    } else {
      boxId.innerHTML = tempStr.substring(0, len - 1) + '...'
    }

    boxId.style.height = `${top}px`
  }
}

//显示全部内容
const getMore = () => {
  let boxId: any = getDivRef.value
  boxId.innerHTML = extraContent.value
  isMore.value = false
}

//拷贝内容
const onCopy = () => {
  tryCopy(getDivRef.value)
}

onMounted(() => {
  moreLine(props.ellipsis.rows)
})
</script>
