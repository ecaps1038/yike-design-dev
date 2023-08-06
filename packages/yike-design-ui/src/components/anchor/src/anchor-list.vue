<script setup lang="ts">
import { AnchorListProps, AnchorOption } from './anchor'

const props = defineProps<AnchorListProps>()

const emits = defineEmits(['updateActive'])

const handleClick = (item: AnchorOption, e: Event) => {
  window.history.pushState('', '', item.href)
  e.preventDefault()
  const el = document.querySelector(item.href)
  el?.scrollIntoView({
    behavior: 'smooth',
  })
  emits('updateActive', item.href)
}
</script>

<template>
  <ul :class="['yk-anchor-list', props.root && 'yk-anchor-list-root']">
    <li v-for="item in props.options" :key="item.href" class="yk-anchor-item">
      <a
        :class="{
          'yk-anchor-item-title': true,
          'yk-anchor-item-title-active': active === item.href,
        }"
        :href="item.href"
        @click="handleClick(item, $event)"
      >
        {{ item.title }}
      </a>
      <anchor-list
        v-if="item.children && item.children.length > 0"
        :active="active"
        :options="item.children"
        @update-active="emits('updateActive', $event)"
      />
    </li>
  </ul>
</template>
