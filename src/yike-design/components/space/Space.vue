<template>
    <div id="yk-space">
      <div ref="space" v-if="isspace">
        <slot></slot>
      </div>
      <myDiv :style="{ rowGap: getMargin(rsize) + 'px', columnGap: getMargin(size) + 'px', flexWrap: wrap ? 'wrap' : 'nowrap' ,flexDirection:flexDirection(direction),width:fill?'100%':''}" />
    </div>
  </template>
    
  <script lang="ts" setup>
  import { ref, onMounted, h } from "vue";
  
  const props = defineProps({
    align: {
      type: String
    },
    direction: {//排列方式
      type: String,
      default: "horizontal"//默认横排
    },
    size: {
      type: [Number, String],
      default: "l"
    },
    wrap: {
      type: Boolean
    },
    rsize: {
      type: [Number, String],
      default: "l"
    },
    fill: {
      type: Boolean
    },
  })
  //获取dome元素
  const space = ref(null);
  const isspace = ref(true);
  const myDiv: any = ref(h('div', 'a'))
  
  //获取dome元素在外面建立自己的div
  const getInHtml = () => {
    let boxid: any = space.value;
    //将获取的dome转为数组
    let arr = Array.from(boxid.children)
  
    myDiv.value = h('div', { className: 'yk-space' }, [
      arr.map((child: any, index: number) => {
        return h('div', { class: 'yk-space-item', innerHTML: child.outerHTML })
      })]);
    isspace.value = false;
  }
  
  //间距大小
  const getMargin = (size: number | string) => {
    if (typeof size === "number") {
      return size;
    }
    switch (size) {
      case "s":
        return 4;
      case "m":
        return 8;
      case "l":
        return 16;
      case "xl":
        return 24;
      default:
        return 16;
    }
  }
  
  //排列方式
  const flexDirection = (dir:string):string=>{
    if(props.direction=="vertical"){
      return 'column'
    }else {
      return 'row'
    }
  }
  
  onMounted(() => {
    getInHtml();
  })
  </script>
  
  <style lang="less">
  @import '../../assets/style/yk-index.less';
  
  #yk-space {
    .yk-space {
      display: inline-flex;
      align-items: center;
      flex: 1;
      height: 100%;
    }
  }
  </style>
    