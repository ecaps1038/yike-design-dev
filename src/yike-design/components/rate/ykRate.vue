<script setup lang="ts">
import { ref } from "vue";
import ykIcon from "../icon/YkIcon.vue";

const props = defineProps({
  modelValue: {
    type: Number,
  },
  count: {
    type: Number,
    default: 5,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    //是否只读
    type: Boolean,
    default: false,
  },
  allowHalf: {
    //是否可以一半
    type: Boolean,
    default: false,
  },
  color: {
    //指定颜色
    type: String,
  },
  size: {
    type: String,
    default: "l",
  },
  solid: {
    //是否完全填充
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["update:modelValue", "change", "hoverChange"]);

//选择数
const scount = ref(-1);
//最终分数
const dcount = ref(-1);
if (props.modelValue) {
  dcount.value = props.modelValue - 1;
  scount.value = props.modelValue - 1;
}

//鼠标移入
const mouse = (e: number) => {
  scount.value = e;
  if (e == -1 && dcount.value > -1) {
    //判断已经移出
    scount.value = dcount.value
  }
  emits("hoverChange", scount.value + 1);
}
//点击确定分数
const defineCount = (e: number) => {
  dcount.value = e;
  emits("update:modelValue", dcount.value + 1);
  emits("change", dcount.value + 1);
}

</script>
<template>
  <div :class="{ disabled: disabled,readonly:readonly }">
    <div class="yk-rate" @mouseleave="mouse(-1)">
      <div class="yk-rate-icon" v-for="(item, index) in count" :key="index">
        <div class="yk-rate-half" @mouseenter="mouse(index - 0.5)" :style="{ display: allowHalf ? 'block' : 'none' }"
          :class="{ selectHarf: scount + 0.5 == index }" @click="defineCount(index - 0.5)">
          <ykIcon name="yike-wujiaoxing" :style="{color:color}"/>
        </div>
        <ykIcon name="yike-wujiaoxing" :class="{ select: scount >= index }" @mouseenter="mouse(index)"
          @click="defineCount(index)" :style="{color:scount >= index && color?color:''}"/>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@import "../../assets/style/yk-index.less";

.yk-rate {
  display: inline-flex;
  column-gap: @space-s;

  .yk-rate-icon {
    position: relative;
    cursor: pointer;
    transition: all @animatf;

    &:hover {
      transform: scale(1.2);
    }

    .yk-rate-half {
      position: absolute;
      z-index: 10;
      width: 50%;
      overflow: hidden;
      opacity: 0;

      .icon {
        color: @wcolor;
      }
    }

    .selectHarf {
      opacity: 1;
    }

    .icon {
      font-size: 22px;
      color: @bg-color-ss;
    }

    .select {
      color: @wcolor;
    }
  }
}</style>