<script setup lang="ts">
import { ref, onMounted } from "vue";
import ykIcon from "../icon/YkIcon.vue";
import ykAnimate from "../icon/ykAnimate.vue";

const props = defineProps({
  modelValue: {
    //input 内容
    type: [String, Number],
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
  maxLength: {
    //内容限制
    type: Number,
  },
  showLimit: {
    //是否显示限制
    type: Boolean,
    default: false,
  },
  button: {
    //是否显示按钮
    type: Boolean,
    default: false,
  },
  buttonDefine: {
    //是否按钮自定义
    type: Boolean,
    default: false,
  },
  loading: {
    //是否显示加载
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits([
  "update:modelValue",
  "focus",
  "blur",
  "clear",
  "pEnter",
  "search",
]);
//计算字符长度
const valueLength = ref(0);
const emitValue = (e: any) => {
  emits("update:modelValue", e.target.value);
  if (props.maxLength) {
    valueLength.value = e.target.value.length;
  }
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

//点击搜索事件
const search = () => {
  if (!props.loading) {
    emits("search", props.modelValue);
  }
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

//清空内容
const clearValue = () => {
  emits("clear", props.modelValue);
  emits("update:modelValue", "");
};

onMounted(() => {
  //获取原始数据长度
  if (props.modelValue) {
    valueLength.value = props.modelValue.toString().length;
  }
  getPrimp();
});
</script>
<template>
  <div class="yk-input-search">
    <div class="yk-input" :class="{
      disabled: disabled,
      focus: isFocus,
    }">
      <div :class="[size, { focus: isFocus, isbutton: button || buttonDefine }]" class="yk-input-inner">
        <div class="prefix fix" ref="prefix" :class="[size]" v-show="primp[0]">
          <slot name="prefix"></slot>
        </div>
        <input :value="modelValue" :placeholder="placeholder" class="input" :class="[size]" @input="emitValue"
          @blur="blur" @focus="focus" @keyup.enter="keyEnter" ref="input" type="text" :maxlength="maxLength" />
        <div class="icon-div" v-show="modelValue && allowClear" :class="[size]">
          <ykIcon @click="clearValue" name="yk-cha" class="clear-icon" />
        </div>
        <p class="show-length" v-show="maxLength" :class="[size]">
          {{ valueLength }}/{{ maxLength }}
        </p>
        <div class="suffix fix" ref="suffix" :class="[size]" v-show="primp[1]">
          <slot name="suffix"></slot>
        </div>
        <div class="search-icon" :class="[size, { loading: loading }]" v-show="!button && !buttonDefine">
          <ykIcon @click="search" name="yk-sousuo" :class="[size + 'f']" class="search" v-show="!loading" />
          <ykAnimate name="loading" v-show="loading" :size="size" />
        </div>
      </div>
    </div>
    <div class="search-button" :class="[size + 's', { loading: loading, hover: !loading }]" v-show="button && !buttonDefine">
      <ykIcon name="yk-sousuo" v-show="!loading" :class="[size + 'f']" class="btsearch" />
      <ykAnimate name="loading" type="white" v-show="loading" :size="size" />
    </div>
    <div class="search-button define" :class="[size + 's']" v-show="!button && buttonDefine">
      <slot name="define"></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "../../assets/style/yk-index.less";

.yk-input-search {
  display: inline-flex;
  width: 320px;
}

.yk-input {
  position: relative;
  width: 100%;

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

.search-icon {
  margin-right: -4px;

  .icon {
    box-sizing: content-box;
    margin-bottom: -5px;
    padding: 4px;
    border-radius: 20px;
    transition: all @animatb;
    cursor: pointer;

  }
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
  padding-left: 4px;
  padding-right: 4px;
  line-height: 24px;
  height: 24px;
  font-size: @size-ss;
  border-radius: @radius-s;
}

.ss {
  padding: 0 8px;
  line-height: 24px;
  height: 24px;
  font-size: @size-ss;
  border-radius: 0 @radius-s @radius-s 0;
}

.sf {
  font-size: @size-s;
}

.m {
  padding-left: 6px;
  padding-right: 6px;
  line-height: 32px;
  height: 32px;
  border-radius: @radius-s;
}

.ms {
  padding: 0 12px;
  line-height: 32px;
  height: 32px;
  font-size: @size-s;
  border-radius: 0 @radius-s @radius-s 0;
}

.mf {
  font-size: @size-m;
}

.l {
  padding-left: 6px;
  padding-right: 6px;
  line-height: 36px;
  height: 36px;
}

.ls {
  padding: 0 12px;
  line-height: 36px;
  height: 36px;
  font-size: @size-s;
  border-radius: 0 @radius-m @radius-m 0;
}

.lf {
  font-size: @size-m;
}

.xl {
  padding-left: 8px;
  padding-right: 8px;
  line-height: 48px;
  height: 48px;
  font-size: @size-m;
}

.xls {
  padding: 0 16px;
  line-height: 48px;
  height: 48px;
  font-size: @size-m;
  border-radius: 0 @radius-m @radius-m 0;
}

.xlf {
  font-size: @size-l;
}

//显示数字
.show-length {
  font-size: @size-ss;
  color: @font-color-s;
}

.search-button {
  background: @pcolor;
  color: #fff;
  cursor: pointer;

  .btsearch {
    vertical-align: middle;
  }
}

.hover {
  &:hover {
    opacity: 0.85;
  }
}

.isbutton {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.define {
  white-space: nowrap;
}
</style>