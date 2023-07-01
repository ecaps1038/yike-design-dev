<script setup lang="ts">
import { useRouter, RouterView } from "vue-router";
import {ref} from 'vue'
import TopBar from './components/TopBar.vue'

</script>

<template>
  <div class="app">
    <TopBar/>
    <RouterView />
    <!-- <RouterLink to="hh">hh</RouterLink> -->
  </div>
</template>

<style scoped lang="less">
.app{
  padding-top: 60px;
}

</style>
