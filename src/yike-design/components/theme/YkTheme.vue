<template>
  <div class="yk-theme" @click="onChange()">
    <ykIcon name="yike-taiyang" v-show="dark" class="son"/>
    <ykIcon name="yike-yueliang" v-show="!dark" class="moon"/>

  </div>
</template>

<script lang="ts" setup>
  import {menusModel} from './model'
  import { ref,onMounted } from 'vue'

  import ykIcon from '../icon/YkIcon.vue'

  const dark = ref(false);
  let obj=ref({});

  //主题切换
  const theme=(obj:any):void=>{
    for (let key in obj) {
        document
          .getElementsByTagName("body")[0]
          .style.setProperty(`--${key}`, obj[key]);
      }
  }
  //切换主题
  const onChange=()=> {
    dark.value = !dark.value;
      if (dark.value) {
        obj.value = menusModel.themeB;
      } else {
        obj.value = menusModel.themeA;
      }
      theme(obj.value);
    }


    //监听系统主题变化
   const onThemeListen=()=> {
      let match = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (match) {
        // console.log("iis");
        obj.value = menusModel.themeB;
        dark.value = true;
      } else {
        // console.log("nno");
        obj.value = menusModel.themeA;
        dark.value = false;
      }
      theme(obj.value);
      // console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)
      if (window.matchMedia) {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (e) => {
            let status = e.matches ? true : false;
            if (status) {
              // console.log("is");
              obj.value = menusModel.themeB;
              dark.value  = true;
            } else {
              // console.log("no");
              obj.value = menusModel.themeA;
              dark.value  = false;
            }
            theme(obj.value);
          });
      }
    }

    onMounted(()=>{
      onThemeListen();
    })

</script>

<style lang="less" scoped>
@import '../../assets/style/yk-index.less';
.yk-theme {
  // width:22px;
  text-align: center;
  cursor: pointer;
  .son{
    font-size: 16px;
    color:#FF9B00;
  }
  .moon{
    font-size: 16px;
    color:#FFD500;
  }
}
</style>