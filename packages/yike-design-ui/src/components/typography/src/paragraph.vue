<template>
  <p ref="containerRef" :class="ns()">
    <span ref="textRef" class="text"><slot /></span>
    <IconCopyOutline v-if="copyable" @click="handleCopy" />
    <span v-if="moreable" class="more" @click="isOpen = !isOpen">
      {{ isOpen ? closeText : openText }}
    </span>
  </p>
</template>

<script setup lang="ts">
import { IconCopyOutline } from '../../svg-icon'
import { createCssScope, debounce } from '../../utils'
import type { paragraphProps, paragraphEmits } from './typography'
import { ref, watch, getCurrentInstance, onMounted } from 'vue'
import { useClipboard, useElementSize } from '@vueuse/core'

defineOptions({ name: 'YkParagraph' })

const ns = createCssScope('paragraph')
const proxy = getCurrentInstance()?.proxy as any
const emit = defineEmits<paragraphEmits>()
const { copy } = useClipboard({ legacy: true })

// prettier-ignore
const props = withDefaults(
  defineProps<paragraphProps>(),
  {
    rows: 0,
    copyable: false,
    moreable: false,
    openText: '展开',
    closeText: '收起',
  }
)

const isOpen = ref(false)
const containerRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const originalText = ref('')
const truncatedText = ref('')

// copyable 与 moreable 互斥
const copyable = !props.moreable && !props.rows && props.copyable

onMounted(() => {
  if (props.rows === 0) return
  const container = containerRef.value!
  const node = textRef.value!
  const { width } = useElementSize(container)
  const { execute } = debounce(truncateMultilineText, 200)
  const { fontSize, lineHeight } = getComputedStyle(node)
  const maxHeight = props.rows * parseFloat(lineHeight)
  const _fontSize = parseInt(fontSize)

  originalText.value = node.innerText
  container.style.height = `${maxHeight}px`

  // 监听容器宽度变化，重新计算文本截断
  watch(width, (newVal, oldVal) => {
    if (props.moreable && isOpen.value) return
    if (newVal - oldVal > _fontSize) {
      execute(container, node, maxHeight, true)
    } else if (container.scrollHeight > maxHeight) {
      execute(container, node, maxHeight)
    }
  })

  // 监听 isOpen 变化，触发展开/收起事件
  watch(isOpen, (newVal) => {
    node.innerText = newVal ? originalText.value : truncatedText.value
    container.style.height = newVal ? 'auto' : `${maxHeight}px`
    emit('changeOpen', newVal)
  })
})

/**
 * 截断多行文本
 * @param container 容器
 * @param textNode 文本节点
 * @param maxHeight 最大高度
 * @param flag 容器宽度变大时，是否需要还原文本
 */
function truncateMultilineText(
  container: HTMLElement,
  textNode: HTMLElement,
  maxHeight: number,
  flag: boolean = false,
) {
  let start = 0
  let end = originalText.value.length

  while (start < end) {
    const mid = Math.floor((start + end) / 2)

    truncatedText.value = originalText.value.slice(0, mid).concat('...')
    textNode.innerText = truncatedText.value
    container.scrollHeight > maxHeight ? (end = mid) : (start = mid + 1)
  }

  // start - 1 是因为 start 位置的字符是省略号
  let finalText = originalText.value.slice(0, start - 1).concat('...')
  if (flag && truncatedText.value.length - 2 === originalText.value.length) {
    finalText = originalText.value
  }
  textNode.innerText = finalText
}

function handleCopy() {
  copy(truncatedText.value)
  proxy.$message({
    type: 'success',
    message: '复制成功',
  })
}
</script>
