<template>
  <teleport to="body" :disabled="!modalVisible">
    <transition name="fade">
      <div class="yk-modal-wrap" v-if="modalVisible">
        <div
          v-if="mask && modalVisible"
          class="yk-mask"
          @click="maskClosable && onClose()"
        />
        <div class="yk-modal">
          <div :class="['yk-modal-header', alignCenter ? 'center' : '']">
            <template v-if="title">{{ title }}</template>
            <slot name="title" v-else />
            <Icon name="yk-cha" class="yk-modal-close" @click="onClose" />
          </div>
          <div class="yk-modal-content">
            <slot />
          </div>
          <div :class="['yk-modal-footer', footerAlign]">
            <Space>
              <Button type="outline" @click="onClose">{{ cancelText }}</Button>
              <Button @click="handleConfirm" :loading="loading">
                {{ confirmText }}
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, type PropType } from 'vue'
type AlignOptions = 'start' | 'center' | 'end'
export default defineComponent({
  name: 'Modal',
  props: {
    visible: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    title: {
      type: String as PropType<string>,
      default: '这是一个模态框',
    },
    footerAlign: {
      type: String as PropType<AlignOptions>,
      default: 'center',
    },
    alignCenter: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    mask: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    maskClosable: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    cancelText: {
      type: String as PropType<string>,
      default: 'cancel',
    },
    confirmText: {
      type: String as PropType<string>,
      default: 'confirm',
    },
    cancel: {
      type: Function as PropType<
        (visible: boolean) => Promise<boolean> | boolean
      >,
      default: () => true,
    },
    confirm: {
      type: Function as PropType<() => Promise<boolean> | boolean>,
      default: () => true,
    },
  },
  emits: ['close'],

  setup(props, ctx) {
    const modalVisible = ref<boolean>(props.visible)
    const loading = ref<boolean>(false)

    // 监听
    watch(
      () => props.visible,
      (val) => {
        modalVisible.value = val
      },
    )

    const close = (visible: boolean) => {
      ctx.emit('close', visible)
    }

    const onClose = async () => {
      close(false)
    }

    // 异步关闭
    const handleConfirm = async () => {
      loading.value = true
      const visible = await props.confirm()
      loading.value = false
      close(visible)
    }

    return {
      modalVisible,
      loading,
      ...toRefs(props),

      onClose,
      handleConfirm,
    }
  },
})
</script>
<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: all @animatf ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.1); //translateY(0px)
}
</style>
<style scoped lang="less">
.yk-mask {
  z-index: 998 !important;
  background-color: #00000040;
}
.yk-modal-wrap,
.yk-mask {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;

  .yk-modal {
    width: 33%;
    min-width: 375px;
    background-color: @bg-color-l;
    position: absolute;
    z-index: 99999;
    border-radius: @radius-m;
    .yk-modal-header {
      padding: 12px 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 0 0 @line-color-s;

      &.center {
        align-items: center;
      }

      .yk-modal-close {
        width: 18px;
        height: 18px;
        padding: 1px;
        margin-left: auto;
        background-color: @bg-color-s;
        cursor: pointer;
      }
    }

    .yk-modal-header ~ div {
      padding: 20px;
    }
    .yk-modal-footer {
      text-align: right;
      box-shadow: 0 -1px 0 0 @line-color-s;
      &.start {
        text-align: left;
      }
      &.center {
        text-align: center;
      }
      &.end {
        text-align: right;
      }
    }
  }
}
</style>
