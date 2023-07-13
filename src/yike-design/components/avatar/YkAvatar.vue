<template>
  <div class="yk-avatar" :class="{group:nsize}"
    :style="{ width: getSize(nowSize) + 'px', height: getSize(nowSize) + 'px', borderRadius: getShape(nowShape) + 'px'}">
    <slot></slot>
    <div class="disembark" v-show="!imgUrl">
      <ykIcon :name="icon"></ykIcon>
    </div>
    <img :src="imgUrl" v-show="imgUrl"/>
  </div>
</template>
<script setup lang="ts">
import ykIcon from '../icon/YkIcon.vue'

import { ref, inject } from 'vue'
import {getSize,getShape} from './YkAvatar.js'

const props = defineProps(
  {
    shape: {//头像形状circle'圆 | 'square方
      type: [Number, String],
      default: "circle"
    },
    imgUrl: String,
    size: {
      type: [Number, String],
      default: 40,
    },
    icon: {
      type: String,
      default: 'yk-touxiang1',
    },
  }
);
//需要成组，所以这里需要接受组的变量
const nsize = inject("size")
const nshape = inject("shape")
let nowSize = ref<any>();
let nowShape = ref<any>();

if (nsize) {
  nowSize.value = nsize;
} else {
  nowSize.value = props.size;
}
if (nshape) {
  nowShape.value = nshape;
} else {
  nowShape.value = props.shape;
}
</script>

<style lang="less">
@import '../../assets/style/yk-index.less';

.yk-avatar {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  background-color: @font-color-ss;
  transition: all @animats;
  vertical-align: top;
  img {
    padding: 0;
    margin:0;
    height:100%;
    float:left;
  }

  .disembark {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    

    .icon {
      width: 50%;
      height: 50%;
      color: #fff;
      line-height: 0;

    }
  }
}
.group{
  border:2px solid @bg-color-l;
}
</style>