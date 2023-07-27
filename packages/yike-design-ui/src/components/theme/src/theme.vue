<template>
  <div v-show="control" class="yk-theme" @click="toggleDark()">
    <yk-icon v-if="isDark" name="yike-yueliang" class="moon" />
    <yk-icon v-else name="yike-taiyang" class="son" />
  </div>
</template>

<script lang="ts" setup>
import { ThemeProps } from './theme'

import { YkIcon } from '../../../index'
import { useDark, useToggle } from '@vueuse/core'

const props = withDefaults(defineProps<ThemeProps>(), {
  skin: 'auto',
  control: true,
  disableTransition: true,
  storageKey: 'YIKE_THEME',
})

const isDark = useDark({
  attribute: 'data-theme',
  disableTransition: props.disableTransition,
  storageKey: props.storageKey,
})
const toggleDark = useToggle(isDark)
</script>
