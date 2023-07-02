<script setup lang="ts">
import { ref, onMounted } from "vue";
import ykIcon from "../icon/YkIcon.vue";

const props = defineProps({
  modelValue: {
    //input 内容
    type: String,
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
  allowClear: {
    //显示清除
    type: Boolean,
    default: false,
  },
  placeholder: {
    //默认信息
    type: String,
    default: "",
  },
  readonly: {
    //是否只读
    type: Boolean,
    default: false,
  },
  invisible: {
    //是否可见
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(["update:modelValue", "focus", "blur", "clear", "pEnter"]);
//计算字符长度
const valueLength = ref(0)
const emitValue = (e: any) => {
  emits("update:modelValue", e.target.value);
};

//监听焦点变化
const isFocus = ref(false);
//聚焦
const focus = (e: any) => {
  isFocus.value = true;
  emits("focus", e.target.value)
};

//失焦
const blur = (e: any) => {
  isFocus.value = false;
  emits("blur", e.target.value)
  // console.log(props.modelValue)
};
//键盘回车事件
const keyEnter = () => {
  emits("pEnter", props.modelValue)
}

//判断外挂修饰
const primp = ref(false)
//获取前缀
const prefix = ref();

//修饰计算
const getPrimp = () => {
  primp.value = false;
  if (prefix.value.children.length > 0) {
    primp.value = true;
  }
}

//清空内容
const clearValue = () => {
  emits("clear", props.modelValue)
  emits("update:modelValue", "");
};

//眼睛控制
const show = ref('password');
const changeShow = () => {
  if (show.value == 'text') {
    show.value = 'password';
  } else {
    show.value = 'text';
  }
}

onMounted(() => {
  //获取原始数据长度
  if (props.modelValue) {
    valueLength.value = props.modelValue.length
  }
  getPrimp();
});
</script>
<template>
  <div class="inputs" :class="{ disabled: disabled,readonly: readonly }">
    <div class="yk-input" :class="{ error: error, normal: !error, focus: isFocus }">
      <div :class="[size, { focus: isFocus }]" class="yk-input-inner">
        <div class="prefix fix" ref="prefix" :class="[size]" v-show="primp">
          <slot name="prefix"></slot>
        </div>
        <input :value="modelValue" :placeholder="placeholder" class="input" :class="[size]" @input="emitValue"
          @blur="blur" @focus="focus" @keyup.enter="keyEnter" ref="input" :type="show" :readonly="readonly" />
        <div class="icon-div" v-show="modelValue && allowClear" :class="[size]">
          <ykIcon @click="clearValue" name="yk-cha" class="clear-icon" />
        </div>
        <div class="suffix fix" :class="[size]" @click="changeShow" v-show="invisible">
          <ykIcon name="yk-yanjing" class="eye" v-show="show == 'text'" />
          <ykIcon name="yk-biyan" class="eye" v-show="show == 'password'" />
        </div>
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
}

//状态
.normal {
  position: relative;

  &:hover {
    .icon-div {
      display: block;
    }

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
  position: relative;

  &:hover {
    .icon-div {
      display: block;
    }

    .yk-input-inner {
      border-color: transparent;
      background: @ecolor-1;
    }
  }

  .yk-input-inner {
    border-color: @ecolor-2;
    background: @ecolor-2;
  }

  .focus {
    border-color: @ecolor;
    background: @ecolor-1;
    // outline: 2px solid @ecolor-1;

    &:hover {
      background: @bg-color-l;
    }
  }
}

//input内部
.yk-input-inner {
  box-sizing: border-box;
  border: 1px solid @bg-color-s;
  background: @bg-color-s;
  border-radius: @radius-m;
  padding: 0;
  color: @font-color-l;
  line-height: 36px;
  transition: @animatb;
  display: flex;
  align-items: center;
  width: 100%;
}

.icon-div {
  display: none;
  // background:#333;
}

.clear-icon {
  margin-bottom: -2px;
  padding: 4px;
  border-radius: 12px;
  font-size: 20px;
  // vertical-align: middle;
  transition: all @animatb;
  cursor: pointer;

  &:hover {
    background-color: @bg-color-ss;
  }
}

.eye {
  margin-bottom: -2px;
  padding: 2px;
  border-radius: 12px;
  font-size: 20px;
  // vertical-align: middle;
  transition: all @animatb;
  cursor: pointer;

  &:hover {
    background-color: @bg-color-ss;
  }
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
}

//size
.s {
  padding: 0 4px;
  line-height: 24px;
  height: 24px;
  font-size: @size-ss;
  border-radius: @radius-s;
}

.m {
  padding: 0 6px;
  line-height: 32px;
  height: 32px;
  border-radius: @radius-s;
}

.l {
  padding: 0 6px;
  line-height: 36px;
  height: 36px;
}

.xl {
  padding: 0 8px;
  line-height: 48px;
  height: 48px;
  font-size: @size-m;
}
</style>