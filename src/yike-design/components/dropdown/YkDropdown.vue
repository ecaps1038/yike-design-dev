<template>
  <!-- 下拉菜单 -->
  <div class="yk-dropdown" @mouseenter="mouse(0)" @mouseleave="mouse(1)" :class="{ disabled: disabled }">
    <div class="drop" ref="drop" @click="msclick">
      <slot></slot>
    </div>
    <transition name="modal">
      <div class="item"
        :style="{ top: getPosition(position) == 0 ? dropH + 'px' : 'auto', bottom: getPosition(position) == 1 ? dropH + 'px' : 'auto' }"
        v-show="hand" :class="[position]">
        <div class="item-inner">
          <slot name="content"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref,provide, onMounted } from 'vue';
import { $on,getRandomString } from "../../utils/yikeFunc"
import ykContainer from "../container/YkContainer.vue"

const props = defineProps({
  trigger: {//出发形式
    type: String,
    default: "hover"
  },
  maxHeight: {//最大高度
    type: Number,
    default: 320,
  },
  disabled: {//是否被激活
    type: Boolean,
    default: false
  },
  position: {//弹窗位置
    type: String,
    default: "bottom"
  },
})
const emit = defineEmits(["select", "activate"]);

//获取外壳高度使用
//获取元素
const drop = ref(null)
//元素高度
const dropH = ref(0);
//判断下拉框开关
const hand = ref(false)

//创建特殊字符用于与子组件通信
const dCode = getRandomString(4);
provide("dcode", dCode);

//鼠标移入动作
const mouse = (e: number): void => {
  if (props.trigger == "hover" && !props.disabled) {
    if (e == 0) {
      hand.value = true;
      emit("activate", true)
    } else if (e == 1) {
      hand.value = false;
      emit("activate", false)
    }
  }
}
//点击动作
const msclick = (): void => {
  if (!props.disabled) {
    if (props.trigger == "click" || hand.value) {
      hand.value = !hand.value;
      if (hand.value) {
        emit("activate", true)
      } else {
        emit("activate", false)
      }
    }
  }
}

//键盘
const keyMonitor = () => {
  document.onkeydown = (e) => {
    //如果搜索聚焦并点击enter事件进行搜索
    console.log(e.key);
  };
  // document.onkeyup = (e) => {
  //   //抬起键点击结束
  //   console.log(e)
  // };
};

//鼠标点击事件
const moused = () => {
  window.addEventListener('mousedown', (e) => {
    const a = hand.value
    setTimeout(() => {
      if (a == hand.value) {
        hand.value = false;
        emit("activate", false)
      }
    }, 300);
  })

};

//获取位置信息
const getPosition = (position: string) => {
  switch (position) {
    case "bottom":
      return 0;
    case "bl":
      return 0;
    case "br":
      return 0;
    case "top":
      return 1;
    case "tl":
      return 1;
    case "tr":
      return 1;
    default:
      return 0;
  }
}

onMounted(() => {
  //元素高度
  const dropV: any = drop.value
  dropH.value = dropV.offsetHeight
  moused();
  // 接收内元素值
  $on('dropitem', (e: any) => {
    if(e.code==dCode){
      emit("select", e.data)
    }
  })
})
</script>
<style lang="less" scoped>
@import '../../assets/style/yk-index.less';

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

.yk-dropdown {
  position: relative;
  display: inline-flex;
  justify-content: center;

  &:hover {
    .item {
      height: auto;
    }
  }

  .item {
    position: absolute;
    z-index: 1100;

    .item-inner {
      background-color: @bg-color-l;
      box-shadow: @shadow-m;
      padding: 4px;
      border-radius: @radius-m;
      border: 1px solid @line-color-s;
    }
  }

  .bottom {
    padding-top: 4px;
  }

  .bl {
    left: 0;
    padding-top: 4px;
  }

  .br {
    right: 0;
    padding-top: 4px;
  }

  .tl {
    left: 0;
    padding-bottom: 4px;
  }

  .tr {
    right: 0;
    padding-bottom: 4px;
  }

  .top {
    padding-bottom: 4px;
  }
}
</style>