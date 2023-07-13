<script setup lang="ts">
import { ref, watch } from "vue";
import ykIcon from "../icon/YkIcon.vue";

const props = defineProps({
  modelValue: {
    //input 内容
    type: [Array],
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
});
const emits = defineEmits(["update:modelValue", "change", "clear"]);

//获取input输入框dome
const input = ref();

//输入框内容
const value = ref();

//标签
let tagss = [
  "孙悟空",
  "猪八戒",
  "唐僧",
  "沙和尚",
  "沙和尚",
  "上上下沙",
  "feiyanzoubi",
  "彩虹指南",
];
let tags = ref();
if (props.modelValue) {
  tags.value = props.modelValue;
}

const emitValue = (e: any) => {
  emits("update:modelValue", tags);
};

//监听焦点变化
const isFocus = ref(false);
//获取聚焦
const getFocus = () => {
  //聚焦输入框
  input.value.focus();
  isFocus.value = true;
};

//聚焦
const focus = (e: any) => {
  isFocus.value = true;
};

//失焦
const blur = (e: any) => {
  isFocus.value = false;
  //如果有输入内容失焦时清空
  if (value.value) {
    value.value = "";
  }
};

//键盘回车事件
const keyEnter = () => {
  //如果有输入内容就添加到数组中
  if (value.value) {
    tags.value.push(value.value);
  }
  //清空内容
  value.value = "";
  emits("update:modelValue", tags.value);
  emits("change", tags.value);
};
//键盘删除事件
const keyDelete = () => {
  //如果有输入内容就添加到数组中
  if (!value.value && tags.value.length>0) {
    tags.value = tags.value.slice(0, -1)
    emits("update:modelValue", tags.value);
    emits("change", tags.value);
    console.log('删除');
  }
};

//清空内容
const clearValue = () => {
  tags.value = [];
  emits("clear", tags.value);
  emits("update:modelValue", []);
};

//点击删除当前tag
const deleteTag = (e: number) => {
  tags.value.splice(e, 1);
  emits("update:modelValue", tags.value);
  emits("change", tags.value);
};
//监听父级点击
watch(props, () => {
  tags.value = props.modelValue;
  // console.log('abcd');
});
</script>
<template>
  <div class="inputs" :class="{ disabled: disabled, readonly: readonly }">
    <div class="yk-input" :class="{ error: error, normal: !error }">
      <div :class="[size, { focus: isFocus }]" class="yk-input-inner" @click="getFocus()">
        <div class="tags-div">
          <div class="tag" v-for="(item, index) in tags" :key="index">
            {{ item }}
            <ykIcon name="yk-cha" @click="deleteTag(index)" />
          </div>
          <input v-model="value" :placeholder="placeholder" class="input" :class="[size]" @input="emitValue" @blur="blur"
            @keyup.enter="keyEnter" @keyup.delete="keyDelete" ref="input" type="text" :readonly="readonly" />
        </div>
        <div class="icon-div" v-show="allowClear" :class="[size]">
          <ykIcon @click="clearValue" name="yk-cha" class="clear-icon" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "../../assets/style/yk-index.less";

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

    .tags-div {
      .tag {
        background: @bg-color-ss;
      }
    }

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

    .tags-div {
      .tag {
        background: @bg-color-ss;
      }
    }

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
  color: @font-color-l;
  line-height: 36px;
  transition: @animatb;
  display: flex;
  justify-content: space-between;
  // align-items: center;
  width: 100%;
}

//标签
.tags-div {
  display: flex;
  flex-wrap: wrap;

  .tag {
    flex: none;
    padding: 0 8px;
    background: @bg-color-l;
    margin: 2px 0 2px 4px;
    // height:100%;
    border-radius: @radius-s;
    border: 1px solid @bg-color-ss;
    transition: all @animats;

    .icon {
      color: @font-color-s;
      margin-left: 2px;
      cursor: pointer;

      &:hover {
        color: @font-color-l;
      }
    }
  }
}

.icon-div {
  display: none;
}

.clear-icon {
  margin-bottom: -5px;
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
  // background-color: #bbb;
  background-color: transparent;
  outline: none;
  padding: 0;
  color: @font-color-l;
  transition: @animatb;
  flex: 1;
  min-width: 60px;
}

//size
.s {
  padding:0 4px;
  line-height: 18px;
  font-size: @size-ss;
  border-radius: @radius-s;
  min-height: 24px;
}

.m {
  padding:0 6px;
  line-height: 26px;
  border-radius: @radius-s;
  min-height: 32px;
}

.l {
  padding:0 6px;
  line-height: 30px;
  min-height: 36px;
}

.xl {
  padding:0px 8px;
  line-height: 42px;
  font-size: @size-m;
  min-height: 48px;
}
</style>