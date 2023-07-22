<script setup lang="ts">
import { AnchorListProps } from './anchor'

const props = defineProps<AnchorListProps>()
</script>

<template>
  <ul :class="['yk-anchor-list', props.root && 'yk-anchor-list-root']">
    <li v-for="item in props.options" :key="item.href" class="yk-anchor-item">
      <a
        :class="{
          'yk-anchor-item-title': true,
          'yk-anchor-item-title-active': props.active === item.href,
        }"
        :href="item.href"
      >
        {{ item.title }}
      </a>
      <anchor-list
        v-if="item.children && item.children.length > 0"
        :options="item.children"
        :active="active"
      />
    </li>
  </ul>
</template>
