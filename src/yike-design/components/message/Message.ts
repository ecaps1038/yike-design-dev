import { createVNode, render } from 'vue'
import MessageConstructor from './YkMessage.vue'

import type { ComponentPublicInstance, VNode } from 'vue'

import type { TMessage, TMessageFn, TOption, TType } from './Message.type'

const instances: Array<any> = []
let seed = 1

const message: TMessageFn & Partial<TMessage> = function (
  options: TOption | string,
) {
  if (typeof options === 'string') {
    options = { message: options, type: 'warning', onClose: () => ({}) }
  }

  let verticalOffset = 20
  instances.forEach(({ vm }) => {
    verticalOffset += (vm.el?.offsetHeight || 0) + 16
  })
  const id = `message_${seed++}`
  const userOnClose = options.onClose
  const props = {
    zIndex: 99999,
    offset: verticalOffset,
    ...options,
    id,
    isShow: true,
    onClose: () => {
      close(id, userOnClose)
    },
    onDestroy: () => {
      appendTo?.removeChild(container)
    },
  }
  let appendTo: HTMLElement | null = document.body

  const container = document.createElement('div')

  container.className = `container_${id}`

  const vm = createVNode(MessageConstructor, props)
  render(vm, container)
  instances.push({ vm })
  appendTo.appendChild(container)
  // return () => {
  //   vm.component!.proxy.isShow = false
  // }
}
const messageTypes: TType[] = ['success', 'error', 'warning']
messageTypes.forEach((type) => {
  message[type] = (options: TOption | string) => {
    if (typeof options === 'string') {
      options = { message: options, type: 'warning', onClose: () => ({}) }
    }
    return message({
      ...options,
      type,
    })
  }
})

function close(id: string, userOnClose?: (vm: VNode) => void): void {
  const idx = instances.findIndex(({ vm }) => {
    return id === vm.component.proxy.id
  })
  if (idx === -1) return

  const { vm } = instances[idx]
  if (!vm) return
  userOnClose?.(vm)

  const removedHeight = vm.el!.offsetHeight
  instances.splice(idx, 1)

  const len = instances.length
  if (len < 1) return
  for (let i = idx; i < len; i++) {
    const pos =
      parseInt(instances[i].vm.el!.style['top'], 10) - removedHeight - 16

    instances[i].vm.component!.props.offset = pos
  }
}

export function closeAll(): void {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].vm.component?.proxy.close()
  }
}

message.closeAll = closeAll

export default message as TMessage
