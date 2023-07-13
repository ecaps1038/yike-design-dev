<template>
  <p>aaaaaa</p>
</template>
  
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
// ----------------------- 以下是emits props ----------------
const emit = defineEmits(['success', 'register']);
const props = defineProps({
  params: {
    type: Object,
    default: () => ({}),
  },
});
// ----------------------- 以下是公用变量 ----------------
let detail = reactive({})
// ----------------------- 以下是暴露的方法内容 -----------------------
defineExpose({});
// ----------------------- 以下是生命周期 ----------------------------
onMounted(() => {
  // getAllData()
});
// ----------------------- 以下是业务内容 ----------------------------
async function getDetail() { }

</script>
  
<style lang="less" scoped >
@import '../assets/style/yk-index.less';
.custom-btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background: #00aaee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
