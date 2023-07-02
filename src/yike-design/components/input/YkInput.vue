<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ykIcon from '../icon/YkIcon.vue'

const props = defineProps({
  modelValue: {
    //input 内容
    type: [String, Number],
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
    default: 'l',
  },
  allowClear: {
    //显示清除
    type: Boolean,
    default: false,
  },
  placeholder: {
    //默认信息
    type: String,
    default: '',
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
  readonly: {
    //是否只读
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
})
const emits = defineEmits([
  'update:modelValue',
  'focus',
  'blur',
  'clear',
  'pEnter',
])

//计算字符长度
const valueLength = ref(0)
const emitValue = (e: any) => {
  emits('update:modelValue', e.target.value)
  if (props.maxLength) {
    valueLength.value = e.target.value.length
  }
}

//监听焦点变化
const isFocus = ref(false)
//聚焦
const focus = (e: any) => {
  isFocus.value = true
  emits('focus', e.target.value)
}

//失焦
const blur = (e: any) => {
  isFocus.value = false
  emits('blur', e.target.value)
  // console.log(props.modelValue)
}
//键盘回车事件
const keyEnter = () => {
  emits('pEnter', props.modelValue)
}

//判断外挂修饰
const primp = ref([false, false, false, false])
//获取前缀
const prefix = ref()
//获取后缀
const suffix = ref()
//获取前置标签
const prepend = ref()
//获取后置标签
const append = ref()

//修饰计算
const getPrimp = () => {
  primp.value = [false, false, false, false]
  if (prefix.value.children.length > 0) {
    primp.value[0] = true
  }
  if (suffix.value.children.length > 0) {
    primp.value[1] = true
  }
  if (prepend.value.children.length > 0) {
    primp.value[2] = true
  }
  if (append.value.children.length > 0) {
    primp.value[3] = true
  }
}

//清空内容
const clearValue = () => {
  emits('clear', props.modelValue)
  emits('update:modelValue', '')
}

onMounted(() => {
  //获取原始数据长度
  if (props.modelValue) {
    valueLength.value = props.modelValue.toString().length
  }
  getPrimp()
})
</script>
<template>
  <div class="inputs" :class="{ disabled: disabled, readonly: readonly }">
    <div class="yk-input" :class="{ error: error, normal: !error }">
      <div :class="[size, { focus: isFocus }]" class="yk-input-inner">
        <div
          class="prepend"
          ref="prepend"
          :class="[size, size + 'r']"
          v-show="primp[2]"
        >
          <slot name="prepend"></slot>
        </div>
        <div class="prefix fix" ref="prefix" :class="[size]" v-show="primp[0]">
          <slot name="prefix"></slot>
        </div>
        <input
          :value="modelValue"
          :placeholder="placeholder"
          class="input"
          :class="[size]"
          @input="emitValue"
          @blur="blur"
          @focus="focus"
          @keyup.enter="keyEnter"
          ref="input"
          :type="type"
          :maxlength="maxLength"
          :readonly="readonly"
        />
        <div class="icon-div" v-show="modelValue && allowClear" :class="[size]">
          <ykIcon @click="clearValue" name="yk-cha" class="clear-icon" />
        </div>
        <p class="show-length" v-show="maxLength" :class="[size]">
          {{ valueLength }}/{{ maxLength }}
        </p>
        <div class="suffix fix" ref="suffix" :class="[size]" v-show="primp[1]">
          <slot name="suffix"></slot>
        </div>
        <div
          class="append"
          ref="append"
          :class="[size, size + 'l']"
          v-show="primp[3]"
        >
          <slot name="append"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../../assets/style/yk-index.less';

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
  &:hover {
    .icon-div {
      display: block;
    }

    .yk-input-inner {
      border-color: @ecolor;
      background: @ecolor-1;
    }
  }

  .yk-input-inner {
    border-color: transparent;
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

.prepend {
  // background:rgba(0,0,0,0.1);
  &::after {
    content: '';
    display: block;
    height: 60%;
    width: 1px;
    background-color: @line-color-m;
    position: absolute;
    right: 0;
    top: 20%;
  }
}

.append {
  &::after {
    content: '';
    display: block;
    height: 60%;
    width: 1px;
    background-color: @line-color-m;
    position: absolute;
    left: 0;
    top: 20%;
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
  padding: 0 4px;
  line-height: 24px;
  height: 24px;
  font-size: @size-ss;
  border-radius: @radius-s;
}

.sl {
  padding-left: 8px;
}

.sr {
  padding-right: 8px;
}

.m {
  padding: 0 6px;
  line-height: 32px;
  height: 32px;
  border-radius: @radius-s;
}

.ml {
  padding-left: 12px;
}

.mr {
  padding-right: 12px;
}

.l {
  padding: 0 6px;
  line-height: 36px;
  height: 36px;
}

.ll {
  padding-left: 12px;
}

.lr {
  padding-right: 12px;
}

.xl {
  padding: 0 8px;
  line-height: 48px;
  height: 48px;
  font-size: @size-m;
}

.xll {
  padding-left: 16px;
}

.xlr {
  padding-right: 16px;
}

//显示数字
.show-length {
  font-size: @size-ss;
  color: @font-color-s;
}
</style>
