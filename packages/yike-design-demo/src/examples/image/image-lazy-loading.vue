<template>
  <yk-space dir="vertical">
    <yk-scrollbar ref="scrollbar" :height="400">
      <yk-image
        v-for="(item, index) in photosList"
        :key="index"
        :src="item"
        height="400"
        fit="cover"
        :is-lazy="true"
      ></yk-image>
    </yk-scrollbar>
    <yk-pagination
      :total="9"
      :page-size="3"
      @change="handleChange"
    ></yk-pagination>
  </yk-space>
</template>
<script setup>
import { ref } from 'vue'

const scrollbar = ref(null)
const originList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]
const photosList = ref(originList.slice(0, 3))

const handleChange = async (e) => {
  scrollbar.value.scrollTo({
    top: 0,
  })
  photosList.value = originList.slice((e - 1) * 3, e * 3)
}
</script>
<style scoped></style>
