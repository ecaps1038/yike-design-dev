<template>
  <div>
    <Transition name="fade" appear>
      <div v-show="modelValue" class="black"></div>
    </Transition>
    <Transition name="zoom-in-top" appear>
      <div v-show="modelValue" class="modal">
        <div
          class="yk-modal"
          :style="size === 'small' && { maxWidth: '800px' }"
        >
          <div class="yk-modal-header">
            <slot name="header">
              <div class="yk-modal-header-title">
                {{ title }}
              </div>
            </slot>
            <div class="yk-modal-header-close" @click="closeModal">
              <yk-icon name="yk-cha" />
            </div>
          </div>
          <div class="yk-modal-content">
            <slot />
          </div>
          <div v-if="showFooter" class="yk-modal-footer">
            <div class="yk-modal-footer-option">
              <slot name="footer">
                <yk-button type="secondary" @click="closeModal">取消</yk-button>
                <yk-button style="margin-left: 16px">确定</yk-button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
export default {
  name: 'YKModal',
}
</script>

<script setup lang="ts">
import { defineEmits } from 'vue'
import '../style'

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '',
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['onCloseModal', 'update:modelValue'])
const closeModal = () => {
  emit('update:modelValue', false)
  emit('onCloseModal')
}
</script>

<style lang="less" scoped></style>
