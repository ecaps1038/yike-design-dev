<template>
  <!-- 下拉菜单 -->
  <div class="yk-submenu" @mouseenter="mouse(0)" @mouseleave="mouse(1)" :class="{ disabled: disabled }">
    <div class="subm" ref="subm">
      <slot></slot>
      <ykIcon name="yk-xiangyou" />
    </div>
    <transition name="modal">
      <div class="item" v-show="hand" :style="{ marginLeft: submW + 'px' }">
        <div class="item-inner" :style="{ maxHeight: maxHeight + 'px' }">
          <slot name="content"></slot>
        </div>
      </div>
    </transition>
  </div>
  <!-- <div class="abc">
    <div class="cba"></div>
  </div> -->
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ykIcon from '../icon/YkIcon.vue'

const props = defineProps({
  maxHeight: {//最大高度
    type: Number,
    default: 320,
  },
  disabled: {//是否被激活
    type: Boolean,
    default: false
  },
})

//判断下拉框开关
const hand = ref(false)

//获取元素
const subm = ref(null)
//元素宽度
const submW = ref(0);

//鼠标移入动作
const mouse = (e: number): void => {
  if (!props.disabled) {
    if (e == 0) {
      hand.value = true;
      //获取元素宽度
      const submV: any = subm.value
      submW.value = submV.offsetWidth
      // console.log(hand.value)
    } else if (e == 1) {
      hand.value = false;
    }
  }
}

onMounted(() => {

})
</script>
<style lang="less" scoped>
@import '../../assets/style/yk-index.less';

.abc{
  width:120px;
  height:40px;
  background-color: #eee;
  position: relative;
}
.cba{
  position:absolute;
  left:120px;
  top:20px;
  width:120px;
  height:200px;
  background-color: #555;
}

.modal {
  &-enter {
    &-from {
      transform: scale(1, 0);
      transform: translateY(-10px);
      opacity: 0;
    }

    &-active {
      transition: all @animatf ease-out;
    }

    &-to {
      transform: scale(1);
      transform: translateY(0px);
      opacity: 1;
    }
  }

  &-leave {
    &-from {
      transform: scale(1);
      opacity: 1;
      transform: translateY(0px);
    }

    &-active {
      transition: all 0.2s;
    }

    &-to {
      transform: scale(0);
      opacity: 0;
      transform: translateY(-10px);
    }
  }
}

.subm {
  //文字不换行
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  font-size: @size-s;
  line-height: 32px;
  padding: 0 12px;
  border-radius: @radius-s;
  cursor: pointer;

  &:hover {
    background-color: @bg-color-s;
  }
}

.yk-submenu {
  position: relative;

  &:hover {
    .item {
      height: auto;
    }
  }

  .item {
    position:absolute;
    // z-index: 1100;
    margin-top: -32px;


    .item-inner {
      background-color: @bg-color-l;
      box-shadow: @shadow-m;
      padding: 4px;
      border-radius: @radius-m;
      margin-left: 8px;
      border:1px solid @line-color-s;
    }
  }
}
</style>