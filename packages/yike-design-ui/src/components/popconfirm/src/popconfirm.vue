<template>
  <div class="yk-popconfirm">Popconfirm</div>
</template>
<script setup lang="ts">
import { PopconfirmProps } from './popconfirm'
import { createCssScope } from '../../utils/bem'

const bem = createCssScope('popconfirm')

defineOptions({
  name: 'YkPopconfirm',
})
const props = withDefaults(defineProps<PopconfirmProps>(), {
  id: '',
})
</script>
