<template>
  <div class="yk-space" :style="{ rowGap: getMargin(rsize) + 'px', columnGap: getMargin(size) + 'px', flexWrap: wrap ? 'wrap' : 'nowrap', flexDirection: flexDirection(direction), width: fill ? '100%' : '',alignItems:getAlign(aline)}">
    <slot></slot>
  </div>
</template>
  
<script lang="ts" setup>
// import { ref, onMounted, h } from "vue";

const props = defineProps({
  aline: {
    type: String,
    default:''
  },
  direction: {//排列方式/vertical/horizontal
    type: String,
    default: "horizontal"//默认横排
  },
  size: {
    type: [Number, String],
    default: "l"
  },
  wrap: {
    type: Boolean,
    default:false,
  },
  rsize: {
    type: [Number, String],
    default: "l"
  },
  fill: {//是否整行
    type: Boolean,
    default:false,
  },
})

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
const flexDirection = (dir: string): string => {
  if (props.direction == "vertical") {
    return 'column'
  } else {
    return 'row'
  }
}
//对齐方式
const getAlign = (align:string):string=>{
  switch (align) {
    case "satrt":
      return 'flex-start';
    case "end":
      return 'flex-end';
    case "center":
      return 'center';
    case "baseline":
      return 'baseline';
    default:
      return 'flex-start';
  }
}

</script>

<style lang="less">
@import '../../assets/style/yk-index.less';

.yk-space {
  display: inline-flex;
}
</style>
  