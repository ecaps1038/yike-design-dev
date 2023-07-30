<template>
  <Teleport :to="to">
    <div>
      <Transition name="fade" appear>
        <div
          v-show="modelValue"
          :class="[
            bem('mask'),
            bem({
              maskBg: showMask,
            }),
          ]"
        ></div>
      </Transition>
      <Transition name="zoom-in-top" appear>
        <div
          v-show="modelValue"
          :class="bem('modal')"
          @click.self="closeMaskToCloseModal"
        >
          <div
            :class="[
              bem('main'),
              bem({
                size: size === 'small',
              }),
            ]"
          >
            <div :class="bem('header')">
              <slot name="header">
                <div :class="bem('title')">
                  {{ title }}
                </div>
              </slot>
              <div :class="bem('close')" @click="closeModal">
                <IconCloseOutline />
              </div>
            </div>
            <div :class="bem('content')">
              <slot />
            </div>
            <div v-if="showFooter" :class="bem('footer')">
              <div class="yk-modal-footer-option">
                <slot name="footer">
                  <yk-button type="secondary" @click="closeModal">
                    取消
                  </yk-button>
                  <yk-button style="margin-left: 16px">确定</yk-button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script lang="ts">
export default {
  name: 'YKModal',
}
</script>

<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { createCssScope } from '../../utils/bem'
import { modalBaseProps } from './modal'
import '../style'

const props = withDefaults(defineProps<modalBaseProps>(), {
  modelValue: false,
  title: '',
  size: 'small',
  showFooter: true,
  to: 'body',
  scrollable: false,
  closeable: false,
  showMask: true,
  escapable: true,
})
const bem = createCssScope('modal')
const emit = defineEmits(['onCloseModal', 'update:modelValue'])
const target = ref<string>('body')
const closeModal = () => {
  emit('update:modelValue', false)
  emit('onCloseModal')
}
onMounted(() => {
  document.body.removeEventListener('keydown', escapeClose)
})
watch(props, () => {
  if (props.modelValue) {
    if (props.escapable) {
      document.body.addEventListener('keydown', escapeClose)
    }
    !props.scrollable && (document.body.style.overflow = 'hidden')
  } else {
    document.body.style.overflow = ''
  }
  if (props.to) {
    target.value = props.to || 'body'
  }
})
const escapeClose = (ev: KeyboardEvent) => {
  if (ev.key === 'Escape') closeModal()
}
const closeMaskToCloseModal = () => {
  props.closeable && emit('update:modelValue', false)
}
const getElement = (selector: string): HTMLElement => {
  return document.querySelector(selector) ?? document.body
}
</script>

<style lang="less" scoped></style>
