import { createVNode, render, VNode, isVNode } from 'vue'
import MessageConstructor from './message.vue'
import { MessageOptions } from './message'
import { popupManager } from '../../../utils/tools'
let instances: VNode[] = []

let seed = 0
const message = (options: MessageOptions) => {
  let appendTo: HTMLElement | null = document.body

  if (typeof options.appendTo === 'string') {
    appendTo = document.querySelector(options.appendTo)
  }
  if (!(appendTo instanceof HTMLElement)) {
    appendTo = document.body
  }
  const props = { zIndex: popupManager.nextIndex(), id: seed++, ...options }
  const container = document.createElement('div')
  container.className = 'yk-message-container'
  const vm: VNode = createVNode(
    MessageConstructor,
    props,
    isVNode(props.message) ? { default: () => props.message } : null,
  )
  vm.props!.onDestroy = () => {
    render(null, container)
  }
  instances.push(vm)
  render(vm, container)
  appendTo.appendChild(container)
}
export default message