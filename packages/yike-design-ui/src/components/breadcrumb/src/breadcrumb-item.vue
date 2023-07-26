<template>
  <span :id="props.id" class="yk-breadcrumb-item">
    <span class="inner" @click.prevent.stop="onClick">
      <a v-if="props.to" href="/" class="n-link">
        <slot />
      </a>
      <slot v-else />
    </span>
    <yk-icon v-if="separatorIcon" :name="separatorIcon" class="separator" />
    <span v-else class="separator">{{ separator }}</span>
  </span>
</template>

<script lang="ts" setup>
import { getCurrentInstance, inject, toRefs } from 'vue'
import { BreadcrumbItemProps, breadcrumbName } from './breadcrumb'
import type { Router } from 'vue-router'

const props = withDefaults(defineProps<BreadcrumbItemProps>(), {
  id: '',
  to: '',
})
const instance = getCurrentInstance()!

const breadcrumbProps = inject(breadcrumbName)!
const { separator, separatorIcon } = toRefs(breadcrumbProps)
const router = instance.appContext.config.globalProperties.$router as Router

const onClick = () => {
  if (!props.to || !router) return
  router.push(props.to)
}
</script>

<style lang="scss" scoped></style>
