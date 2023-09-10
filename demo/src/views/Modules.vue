<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import { useRoute } from 'vue-router'
import type { NavBar } from '@/utils/types'

const route = useRoute()
const navs = computed(() => (route.meta.navs as NavBar[]) || [])
const hasNavBar = ref(navs.value.length > 0)

provide('hasNavBar', hasNavBar)
</script>

<template>
  <div class="module" :class="{ 'justify-center': !hasNavBar }">
    <nav-bar :data="navs" />
    <RouterView />
  </div>
</template>

<style scoped>
.module {
  position: relative;
  display: flex;
  padding-top: var(--top-bar-height);
}

.justify-center {
  justify-content: center;
}
</style>
