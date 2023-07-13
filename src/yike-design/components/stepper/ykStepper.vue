<script setup lang="ts">
import { ref, onMounted } from "vue";
import ykIcon from "../icon/YkIcon.vue";

const props = defineProps({
  modelValue: {
    //input 内容
    type: Number,
  },
  error: {
    //错误
    type: Boolean,
    default: false,
  },
  disabled: {
    //是否被激活
    type: Boolean,
    default: false,
  },
  size: {
    //大小
    type: String,
    default: "l",
  },
  placeholder: {
    //默认信息
    type: String,
    default: "",
  },
  min: {
    //内容限制最小值
    type: Number,
  },
  max: {
    //内容限制最大值
    type: Number,
  },
  precision: {
    //精度
    type: Number,
  },
  readonly: {
    //是否只读
    type: Boolean,
    default: false,
  },
  step: {
    //步长
    type: Number,
  },
});
const emits = defineEmits([
  "update:modelValue",
  "focus",
  "blur",
  "clear",
  "pEnter",
]);

//当前数值
const valueNow = ref();
//获取原始数据
if (props.modelValue) {
  valueNow.value = props.modelValue;
}
const emitValue = (e: any) => {
  emits("update:modelValue", e.target.value);
  valueNow.value = e.target.value;
};

//监听焦点变化
const isFocus = ref(false);
//聚焦
const focus = (e: any) => {
  isFocus.value = true;
  emits("focus", e.target.value);
};

//失焦
const blur = (e: any) => {
  isFocus.value = false;
  emits("blur", e.target.value);
  // console.log(props.modelValue)
};
//键盘回车事件
const keyEnter = () => {
  emits("pEnter", props.modelValue);
};

//判断外挂修饰
const primp = ref([false, false]);
//获取前缀
const prefix = ref();
//获取后缀
const suffix = ref();

//修饰计算
const getPrimp = () => {
  primp.value = [false, false];
  if (prefix.value.children.length > 0) {
    primp.value[0] = true;
  }
  if (suffix.value.children.length > 0) {
    primp.value[1] = true;
  }
};

//获取input输入框dome
const input = ref();

const modelValue = () => {
  if (props.precision && props.precision > 0) {
    valueNow.value = changeFloat(valueNow.value, props.precision);
  } else {
  }
  emits("update:modelValue", valueNow.value);
};

//加
const addData = () => {
  //聚焦输入框
  input.value.focus();
  if (!valueNow.value) {
    valueNow.value = 0;
  }
  if (props.max && valueNow.value >= props.max) {
    valueNow.value = props.max;
    modelValue();
  } else {
    if (props.step) {
      valueNow.value = Number(valueNow.value) + props.step;
    } else {
      valueNow.value = Number(valueNow.value) + 1;
    }
    modelValue();
  }
};
//减
const reduceData = () => {
  //聚焦输入框
  input.value.focus();
  if (!valueNow.value) {
    valueNow.value = 0;
  }
  if (props.min && valueNow.value <= props.min) {
    valueNow.value = props.min;
    modelValue();
  } else {
    if (props.step) {
      valueNow.value = Number(valueNow.value) - props.step;
    } else {
      valueNow.value = Number(valueNow.value) - 1;
    }
    modelValue();
  }
};

//长按操作控制
const action = ref();
//action
const mouseDown = (e: number) => {
  action.value = true;
  //e表示方向1
  let i = 0;
  //区分单击与连续
  let timer = setInterval(() => {
    i++;
    if (action.value && i >= 2) {
      if (e == 0) {
        //加
        addData();
      } else if (e == 1) {
        //减
        reduceData();
      }
    } else if (!action.value) {
      clearInterval(timer);
    }
  }, 100);
};
const mouseUp = () => {
  action.value = false;
};

//小数位补全
const changeFloat = (number: number, bitNum: number) => {
  var f_x = number;
  if (isNaN(f_x)) {
    return 0;
  }
  var s_x = number.toString();
  var pos_decimal = s_x.indexOf(".");
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += ".";
  }
  while (s_x.length <= pos_decimal + bitNum) {
    s_x += "0";
  }
  return Number(s_x).toFixed(bitNum);
};

onMounted(() => {
  getPrimp();
});
</script>
<template>
  <div class="inputs" :class="{ disabled: disabled }">
    <div class="yk-input" :class="{ error: error, normal: !error, readonly: readonly }">
      <div class="prepend buttons" :class="[size + 'l']" @click="reduceData" @mousedown="mouseDown(1)" @mouseup="mouseUp">
        <ykIcon name="yk-jianhao" class="jt-icon" />
      </div>
      <div :class="[size, { focus: isFocus }]" class="yk-input-inner">
        <div class="prefix fix" ref="prefix" :class="[size]" v-show="primp[0]">
          <slot name="prefix"></slot>
        </div>
        <input :value="valueNow" :placeholder="placeholder" class="input" :class="[size]" @input="emitValue" @blur="blur"
          @focus="focus" @keyup.enter="keyEnter" ref="input" type="number" :readonly="readonly" />
        <div class="suffix fix" ref="suffix" :class="[size]" v-show="primp[1]">
          <slot name="suffix"></slot>
        </div>
      </div>
      <div class="append buttons" :class="[size + 'r']" @click="addData" @mousedown="mouseDown(0)" @mouseup="mouseUp">
        <ykIcon name="yk-jiahao" class="jt-icon" />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "../../assets/style/yk-index.less";

.inputs {
  display: inline-flex;
  width: 200px;
  position: relative;
}

.yk-input {
  width: 100%;
  height: 100%;
  display: flex;

  .buttons{
    background: @bg-color-s;
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:background @animatb;
    &:hover{
      background: @bg-color-ss;
    }
    &:active {
      background-color: @font-color-ss;

      .jt-icon {
        color: @font-color-m;
      }
    }
  }
  .prepend {
    margin-right: 1px;
  }

  .append {
    margin-left: 1px;
  }

  .jt-icon{
    font-size: 14px;
    color:@font-color-m;
  }
}

//状态
.normal {
  &:hover {
    .yk-input-inner {
      border-color: @pcolor;
      background: @bg-color-m;
    }
  }

  .focus {
    border-color: @pcolor;
    background: @bg-color-l;
    // outline: 2px solid @pcolor-1;

    &:hover {
      background: @bg-color-l;
    }
  }
}

.error {
  &:hover {
    .yk-input-inner {
      border-color: @ecolor;
      background: @ecolor-1;
    }
  }

  .yk-input-inner {
    border-color: @ecolor-2;
    background: @ecolor-2;
  }

  .focus {
    border-color: @ecolor;
    background: @bg-color-l;
    // outline: 2px solid @ecolor-1;

    &:hover {
      background: @bg-color-l;
    }
  }
}

//只读
.readonly {
  &:hover {
    .yk-input-inner {
      border-color: @bg-color-s;
      background: @bg-color-s;
    }
  }

  .focus {
    border-color: @bg-color-s;
    background: @bg-color-s;
    outline: 0;

    &:hover {
      background: @bg-color-s;
    }
  }
}

//input内部
.yk-input-inner {
  box-sizing: border-box;
  border: 1px solid @bg-color-s;
  background: @bg-color-s;
  padding: 0;
  color: @font-color-l;
  line-height: 36px;
  transition: @animatb;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 2px;
}

.input {
  box-sizing: border-box;
  border: 0;
  // background-color:#bbb;
  background-color: transparent;
  outline: none;
  padding: 0;
  color: @font-color-l;
  transition: @animatb;
  width: 100%;
  text-align:center;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  // text-align: center;
}

//size
.s {
  padding: 0 4px;
  line-height: 24px;
  height: 24px;
  font-size: @size-ss;
}

.sl {
  height: 24px;
  width: 24px;
  border-radius: @radius-s 2px 2px @radius-s;
  .jt-icon{
    font-size: 12px;
  }
}

.sr {
  height: 24px;
  width: 24px;
  border-radius: 2px @radius-s @radius-s 2px;
  .jt-icon{
    font-size: 12px;
  }
}

.m {
  padding: 0 6px;
  line-height: 32px;
  height: 32px;
}

.ml {
  width: 32px;
  height: 32px;
  border-radius: @radius-s 2px 2px @radius-s;
}

.mr {
  height: 32px;
  width: 32px;
  border-radius: 2px @radius-s @radius-s 2px;
}

.l {
  padding: 0 6px;
  line-height: 36px;
  height: 36px;
}

.ll {
  width: 36px;
  height: 36px;
  border-radius: @radius-m 2px 2px @radius-m;
}

.lr {
  width: 36px;
  height: 36px;
  border-radius: 2px @radius-m @radius-m 2px;
}

.xl {
  padding: 0 8px;
  line-height: 48px;
  height: 48px;
  font-size: @size-m;
}

.xll {
  width: 48px;
  height: 48px;
  border-radius: @radius-m 2px 2px @radius-m;
  .jt-icon{
    font-size: 16px;
  }
}

.xlr {
  width: 48px;
  height: 48px;
  border-radius: 2px @radius-m @radius-m 2px;
  .jt-icon{
    font-size: 16px;
  }
}
</style>