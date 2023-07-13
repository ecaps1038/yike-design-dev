<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: null,
  },
  defaultChecked: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  type: {
    //是否为按钮
    type: String,
    default: "radio",
  },
  size: {
    type: String,
    default: "l",
  },
  solid:{//是否完全填充
    type:Boolean,
    default:false,
  }
});
const emits = defineEmits(["update:modelValue", "change"]);

const check = ref();
const nowCheck = ref();

//判断是否有modelValue;
if (props.modelValue != null) {
  nowCheck.value = props.modelValue;
}

const emitValue = (e: any) => {
  emits("update:modelValue", e.target.checked);
  check.value = e.target.checked;
};
const change = () => {
  if (props.modelValue != null) {
    nowCheck.value = props.modelValue;
  } else {
    nowCheck.value = check.value;
  }

  emits("change", props.value);
};

//监听父级点击
watch(props, () => {
  nowCheck.value = props.modelValue;
  // emits("change", [nowCheck.value, props.value]);
});
</script>
<template>
  <div :class="{ disabled: disabled }">
    <div class="yk-radio" v-if="type == 'radio'">
      <input
        :value="modelValue"
        class="radio-ui"
        type="radio"
        @input="emitValue"
        @change="change"
        :checked="modelValue"
      />
      <div
        class="ui-radio"
        :class="{
          aaa: nowCheck,
          bbb: !nowCheck,
        }"
      ></div>
      <slot></slot>
    </div>
    <div
      class="yk-button-radio"
      :class="[size, { checked: nowCheck && !solid,solid: nowCheck && solid, }]"
      v-if="type == 'button'"
    >
      <input
        :value="modelValue"
        class="radio-ui"
        type="radio"
        @input="emitValue"
        @change="change"
        :checked="modelValue"
      />
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "../../assets/style/yk-index.less";

.yk-radio {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.radio-ui {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  background-color: #eee;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}

.ui-radio {
  --secondary-color: #fff;
  /* radio */
  --radio-diameter: 17px;
  --radio-border-width: 1px;
  --radio-border-style: solid;
  /* checkmark */
  --checkmark-size: 1.2;
}

.ui-radio,
.ui-radio *,
.ui-radio *::before,
.ui-radio *::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.ui-radio {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: var(--radio-diameter);
  height: var(--radio-diameter);
  border-radius: @radius-l;
  // background: var(--secondary-color);
  border: var(--radio-border-width) var(--radio-border-style) @line-color-m;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  position: relative;
  margin-right: @space-s;
}

.ui-radio::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-box-shadow: 0 0 0 calc(var(--radio-diameter) / 2.5) @pcolor;
  box-shadow: 0 0 0 calc(var(--radio-diameter) / 2.5) @pcolor;
  border-radius: inherit;
  opacity: 0;
  -webkit-transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  -o-transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
}

.ui-radio::before {
  top: 50%;
  left: 50%;
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: var(--secondary-color);
  border-radius: 4px;
  -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(0);
  -ms-transform: translate(-50%, -50%) rotate(45deg) scale(0);
  transform: translate(-50%, -50%) rotate(45deg) scale(0);
  opacity: 0;
  -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
    opacity 0.1s;
  -o-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
}

/* actions */
.yk-radio {
  cursor: pointer;

  &:hover {
    .ui-radio {
      border-color: @pcolor;
    }
  }
}

.yk-radio {
  &:checked {
    .ui-radio {
      background: @pcolor;
      border-color: transparent;
    }
  }
}

.aaa {
  background: @pcolor;
  border-color: transparent;
}

.aaa::before {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%) rotate(45deg)
    scale(var(--checkmark-size));
  -ms-transform: translate(-50%, -50%) rotate(45deg)
    scale(var(--checkmark-size));
  transform: translate(-50%, -50%) rotate(45deg) scale(var(--checkmark-size));
  -webkit-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  -o-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
}

.bbb::after {
  -webkit-transition: none;
  -o-transition: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  transition: none;
  opacity: 1;
}

//按钮类型单选
.yk-button-radio {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all @animats;
  color:@font-color-m;
  &:hover {
    background-color: @bg-color-l;
  }
}
.checked {
  background-color: @bg-color-l;
  color: @pcolor;
  font-weight: 500;
}
.solid {
  background-color: @pcolor;
  color: #fff;
  font-weight: 500;
  &:hover {
    background-color: @pcolor;
  }
}
.xl {
  margin: 2px;
  padding: 0 20px;
  height: 40px;
  border-radius: 6px;
  font-size: 16px;
  line-height: 24px;
}
.l {
  margin: 1.5px;
  padding: 0 16px;
  height: 30px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
}
.m {
  margin: 1.5px;
  padding: 0 16px;
  height: 26px;
  border-radius: 3px;
  font-size: 14px;
  line-height: 20px;
}
.s {
  margin: 1px;
  padding: 0 12px;
  height: 20px;
  border-radius: 3px;
  font-size: 12px;
  line-height: 16px;
}
</style>
