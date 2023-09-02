<template>
  <div v-if="!loading">
    <slot></slot>
  </div>
  <div v-else :class="[bem()]">
    <div v-if="animated" :class="[bem('animation')]"></div>
    <div :class="[bem('content')]">
      <yk-avatar
        v-if="avatar"
        :img-url="avatarStyle.imgUrl"
        :size="avatarStyle.size"
        :shape="avatarStyle.shape"
        :class="[bem('content__avatarClass')]"
      ></yk-avatar>

      <div :class="[bem('line')]" :style="{ width }">
        <div
          v-if="title"
          :class="[getBlockClass(`${bem('content__line__blockTitle')}`)]"
          :style="{ height }"
        ></div>
        <div
          v-for="_ in Number(row)"
          :key="_"
          :class="[getBlockClass(`${bem('content__line__blockLine')}`)]"
          :style="{ height }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YkAvatar from '../../avatar'
import { SkeletonProps } from './skeleton'
import { createCssScope } from '../../utils'
import { toRefs } from 'vue'

defineOptions({
  name: 'YkSkeleton',
})

const bem = createCssScope('skeleton')
const props = withDefaults(defineProps<SkeletonProps>(), {
  loading: true,
  width: '100%',
  height: '15px',
  animated: true,
  avatar: false,
  avatarStyle: () => ({}),
  round: true,
  row: 1,
  title: false,
})

const { avatarStyle, round } = toRefs(props)

const getBlockClass = (prefixCls: string) => {
  return {
    [prefixCls]: true,
    [`${prefixCls}__round`]: round.value,
  }
}
</script>
