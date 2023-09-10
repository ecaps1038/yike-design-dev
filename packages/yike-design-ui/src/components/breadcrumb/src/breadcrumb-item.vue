<template>
  <span :class="bem('item')">
    <span :class="bem('inner')" @click.prevent.stop="onClick">
      <a v-if="props.to" href="/" class="n-link">
        <slot />
      </a>
      <slot v-else />
    </span>
    <span :class="bem('separator')">
      <component :is="separatorComponent" v-if="separatorComponent" />
      <yk-icon v-else-if="separatorIcon" :name="separatorIcon" />
      <span v-else>
        {{ separator }}
      </span>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { getCurrentInstance, inject, reactive } from 'vue'
import { BreadcrumbItemProps, breadcrumbName } from './breadcrumb'
import { createCssScope } from '../../utils'
import type { Router } from 'vue-router'
import YkIcon from '../../icon'

defineOptions({
  name: `YkBreadcrumbItem`,
})

const bem = createCssScope('breadcrumb')
const props = defineProps<BreadcrumbItemProps>()
const instance = getCurrentInstance()!

const breadcrumbProps = inject(breadcrumbName)!

const {
  props: { separator, separatorIcon },
  slots,
} = reactive(breadcrumbProps)
const separatorComponent = slots.separator

const router = instance.appContext.config.globalProperties.$router as Router

const onClick = () => {
  if (!props.to || !router) return
  router.push(props.to)
}
</script>
