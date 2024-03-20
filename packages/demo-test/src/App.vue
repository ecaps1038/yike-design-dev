<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { getCurrentInstance, ref } from 'vue'
const proxy: any = getCurrentInstance()?.proxy
// import { YkButton } from '@yike-design/ui'
const handleClick = () => {
  proxy.$message({ type: 'primary', message: '通用提示' })
}
const visible = ref<boolean>(false)
const showModal = () => {
  visible.value = true
}
function handleChange(value) {
  console.log('一级菜单：', value)
}

function handleSelected(value) {
  console.log(value)
}
</script>

<template>
  <yk-space dir="vertical">
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <yk-space>
      <yk-button @click="handleClick">主要按钮</yk-button>
      <yk-button type="secondary">次要按钮</yk-button>
      <yk-button type="outline">线框按钮</yk-button>
      <IconCupOutline />
    </yk-space>
    <yk-space dir="vertical">
      <yk-input-search loading placeholder="正在查找..." style="width: 360px" />
      <yk-input-search style="width: 360px">
        <template #prefix>
          <IconSearchOutline />
        </template>
        <template #suffix>
          <yk-button type="secondary">搜索</yk-button>
        </template>
      </yk-input-search>
      <yk-input-search size="xl" placeholder="搜点什么" style="width: 360px">
        <template #suffix>
          <yk-button size="xl"><IconSearchOutline /></yk-button>
        </template>
      </yk-input-search>
      <yk-modal v-model="visible" title="这里是标题">
        <span>这一块是modal对话框的内容部分，这里支持各种标签，组件</span>
      </yk-modal>

      <yk-button @click="showModal">modal 对话框</yk-button>
    </yk-space>
    <yk-dropdown
      title="下拉菜单"
      @visible-change="handleChange"
      @selected="handleSelected"
    >
      <yk-dropdown-item value="1">Action 1</yk-dropdown-item>
      <yk-dropdown-item value="2">Action 2</yk-dropdown-item>
      <yk-dropdown-item value="3" submenu>
        <template #title>
          Action 3
          <IconRightOutline />
        </template>
        <yk-dropdown-item value="11">Action 11</yk-dropdown-item>
        <yk-dropdown-item value="22">Action 22</yk-dropdown-item>
        <yk-dropdown-item value="33">Action 33</yk-dropdown-item>
      </yk-dropdown-item>
      <yk-dropdown-item value="4">Action 4</yk-dropdown-item>
      <yk-dropdown-item value="5">Action 5</yk-dropdown-item>
    </yk-dropdown>
  </yk-space>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  padding: 1.5em;
  height: 6em;
  transition: filter 300ms;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
