<template>
  <span class="yk-breadcrumb-item">
    <span :class="bem('inner')" @click.prevent.stop="onClick">
      <a v-if="props.to" href="/" class="n-link">
        <slot />
      </a>
      <slot v-else />
    </span>
    <yk-icon
      v-if="separatorIcon"
      :name="separatorIcon"
      :class="bem('separator')"
    />
    <span :class="bem('separator')">
      {{ separator }}
    </span>
  </span>
</template>

<script lang="ts" setup>
import { getCurrentInstance, inject, toRefs, useSlots } from 'vue'
import { BreadcrumbItemProps, breadcrumbName } from './breadcrumb'
import { createCssScope } from '../../../utils/bem'
import type { Router } from 'vue-router'

const componentName = 'breadcrumb-item'
const bem = createCssScope(componentName)
const slots = useSlots()
console.log(slots)
defineOptions({
  name: `Yk${componentName}`,
})
const props = defineProps<BreadcrumbItemProps>()
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
