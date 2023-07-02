<script setup lang="ts">
import { ref, onMounted } from "vue";
import ykIcon from "../icon/YkIcon.vue";

const props = defineProps({
  modelValue: {
    //input 内容
    type: [String, Number],
  },
  allowClear: {
    //显示清除
    type: Boolean,
    default: false,
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
  readonly: {
    //是否只读
    type: Boolean,
    default: false,
  },
  resize: {
    //是否可以改变大小
    type: Boolean,
    default: false,
  },
  autoSize: {
    //是否自适应高度
    type: [Object, Boolean],
  }
});
const emits = defineEmits(["update:modelValue", "focus", "blur", "clear", "pEnter"]);

//计算字符长度
//获取元素
const textarea = ref(null)
const area = ref(null)
//元素当前高度
const textareaHeight = ref();
//元素行高
const textareaLineHeight = 20;

//元素行数
const minRows = ref(2);
const maxRows = ref(0);

//获取输入框最大及最小高度
if (props.autoSize) {
  minRows.value = 1;
  if (Object.prototype.toString.call(props.autoSize) === '[object Object]') {
    //判断属性是否存在
    if ('minRows' in (props.autoSize as object)) {
      minRows.value = props.autoSize.minRows
    }
    if ('maxRows' in (props.autoSize as object)) {
      maxRows.value = props.autoSize.maxRows
    }
  }
}

//获取当前高度
const gitNowHeight = () => {
  //元素高度
  const textareaV: any = textarea.value;
  const areaV: any = area.value
  areaV.style.height = 'inherit'
  let nowHeight = textareaV.scrollHeight;
  if (maxRows.value > 0 && nowHeight > textareaLineHeight * maxRows.value + 16) {
    nowHeight = textareaLineHeight * maxRows.value + 16
  }
  textareaHeight.value = nowHeight + 2;
}

const valueLength = ref(0)
const emitValue = (e: any) => {
  emits("update:modelValue", e.target.value);
  if (props.maxLength) {
    valueLength.value = e.target.value.length
  }
  gitNowHeight();
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

//清空内容
const clearValue = () => {
  emits("clear", props.modelValue)
  emits("update:modelValue", "");
};

onMounted(() => {
  //初始化元素高度
  const textareaV: any = textarea.value;
  let nowHeight = textareaV.scrollHeight;
  if (minRows.value > 0 && nowHeight < textareaLineHeight * minRows.value + 16) {
    nowHeight = textareaLineHeight * minRows.value + 16
  }else if (maxRows.value > 0 && nowHeight > textareaLineHeight * maxRows.value + 16) {
    nowHeight = textareaLineHeight * maxRows.value + 16
  }
  textareaHeight.value = nowHeight + 2;

  //获取原始数据长度
  if (props.modelValue) {
    valueLength.value = props.modelValue.toString().length
  }
});
</script>
<template>
  <div class="textareas" ref="area" :class="{ disabled: disabled,readonly: readonly }"
    :style="{ height: autoSize ? textareaHeight + 'px' : '' }">
    <div class="yk-textarea" :class="{ error: error, normal: !error }">
      <div :class="[{ focus: isFocus }]" class="yk-textarea-inner">
        <textarea :value="modelValue" :placeholder="placeholder" class="textarea" @input="emitValue" @blur="blur"
          @focus="focus" @keyup.enter="keyEnter" :class="[{ resize: resize && !autoSize }]" ref="textarea" :rows="minRows"
          :maxlength="maxLength" :readonly="readonly"></textarea>
        <div class="icon-div" v-show="modelValue && allowClear">
          <ykIcon @click="clearValue" name="yk-cha" class="clear-icon" />
        </div>
        <p class="show-length" v-show="maxLength">{{ valueLength }}/{{ maxLength }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "../../assets/style/yk-index.less";

.textareas {
  position: relative;
  width: 100%;
}

.yk-textarea {
  width: 100%;
  height: 100%;
}

//状态
.normal {

  &:hover {
    .icon-div {
      display: block;
    }

    .yk-textarea-inner {
      border-color: @pcolor;
      background: @bg-color-m;
    }
  }

  .focus {
    border-color: @pcolor;
    background: @bg-color-l;
    outline: 2px solid @pcolor-1;

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

    .yk-textarea-inner {
      border-color: @ecolor;
      background: @ecolor-1;
    }
  }

  .yk-textarea-inner {
    border-color: transparent;
    background: @ecolor-2;
  }

  .focus {
    border-color: @ecolor;
    background: @bg-color-l;
    outline: 2px solid @ecolor-1;

    &:hover {
      background: @bg-color-l;
    }
  }
}

//内部
.yk-textarea-inner {
  box-sizing: border-box;
  border: 1px solid @bg-color-s;
  background: @bg-color-s;
  border-radius: @radius-m;
  padding: 0;
  color: @font-color-l;
  transition: @animatb;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.icon-div {
  display: none;
  position: absolute;
  right: 7px;
  top: 7px;
  z-index: 10;
}

.clear-icon {
  margin-bottom: -2px;
  padding: 4px;
  border-radius: 12px;
  font-size: 20px;
  transition: all @animatb;
  cursor: pointer;

  &:hover {
    background-color: @bg-color-ss;
  }
}

.textarea {
  box-sizing: border-box;
  border: 0;
  background-color: transparent;
  outline: none;
  padding: @space-s 12px;
  color: @font-color-l;
  line-height: 20px;
  transition: @animatb;
  width: 100%;
  height: 100%;
  resize: none;
}

//可拖动
.resize {
  resize: vertical; //宽度固定，高度可动
}

//显示数字
.show-length {
  position: absolute;
  right: 8px;
  bottom: 7px;
  z-index: 10;
  font-size: @size-ss;
  color: @font-color-s;
}
</style>