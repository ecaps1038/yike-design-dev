<template>
  <teleport to="body" :disabled="!modalVisible">
    <transition name="fade">
      <div class="yk-modal-wrap" v-if="modalVisible">
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
              <Button @click="handleConfirm">{{ confirmText }}</Button>
            </Space>
          </div>
        </div>
      </div>
    </transition>
    <transition>
      <div v-if="mask && modalVisible" class="yk-mask" />
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, type PropType } from 'vue'
export default defineComponent({
  name: 'Modal',
  props: {
    visible: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    title: {
      type: String as PropType<string>,
      default: '',
    },
    footerAlign: {
      type: String as PropType<'start' | 'center' | 'end'>,
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
  emits: {
    close: (visible: boolean) => visible,
  },

  setup(props, ctx) {
    const modalVisible = ref<boolean>(props.visible)
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
      console.log(1)
      close(false)
    }

    // 异步关闭
    const handleConfirm = async () => {
      const visible = await props.confirm()
      console.log(visible)
      close(visible)
    }

    return {
      modalVisible,
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
  transform: scale(1.1);
}
</style>
<style scoped lang="less">
.yk-mask {
  z-index: 998 !important;
  background-color: #00000040;
}
.yk-modal-wrap,
.yk-mask {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  .yk-modal {
    width: 33%;
    min-width: 375px;
    background-color: @bg-color-l;
    position: absolute;
    z-index: 99999;
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
