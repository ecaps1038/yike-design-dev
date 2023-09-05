<template>
  <div>
    <div>
      <label for="">指定 offset：</label>
      <input
        v-model="offset"
        type="number"
        min="0"
        max="100"
        style="text-align: center"
      />
    </div>
    <yk-anchor
      :options="options"
      :scroll-el="() => $container"
      :offset="offset"
    ></yk-anchor>
    <div ref="$container" class="container">
      <div>
        <section
          v-for="item in options"
          :id="item.href.slice(1)"
          :key="item.href"
        >
          <p v-if="item.title === '苏轼'">人间有此白玉京</p>
          <p v-if="item.title === '李白'">人生得意须尽欢</p>
          <p v-if="item.title === '白居易'">人间四月芳菲尽</p>
        </section>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const options = [
  {
    title: '苏轼',
    href: '#苏轼',
  },
  {
    title: '李白',
    href: '#李白',
    children: [],
  },
  {
    title: '白居易',
    href: '#白居易',
    children: [],
  },
]
const $container = ref()
const offset = ref(20)
</script>
<style lang="less" scoped>
.container {
  overflow-y: auto;
  width: 200px;
  height: 100px;
  scroll-behavior: smooth;
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    background-color: #dd524c;
    p {
      font-size: 20px;
      font-weight: 500;
    }
    &:nth-child(2) {
      height: 200px;
      background-color: #e87b35;
    }
    &:nth-child(3) {
      height: 300px;
      background-color: #94ca42;
    }
  }
}
</style>
