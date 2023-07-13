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
  indeterminate: {//半选
    type: Boolean,
    default: false,
  },

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

  emits("change", [nowCheck.value, props.value]);
};

//监听父级点击
watch(props, () => {
  nowCheck.value = props.modelValue;
  // emits("change", [nowCheck.value, props.value]);
});
</script>
<template>
  <div :class="{ disabled: disabled }">
    <div class="yk-checkbox">
      <input
        :value="modelValue"
        class="checkbox-ui"
        type="checkbox"
        @input="emitValue"
        @change="change"
        :checked="modelValue"
      />
      <div
        class="ui-checkbox"
        :class="{
          aaa: nowCheck && !indeterminate,
          ccc: nowCheck && indeterminate,
          bbb: !nowCheck,
          ddd: !indeterminate,
          eee: indeterminate,
        }"
      ></div>
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "../../assets/style/yk-index.less";

.yk-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.checkbox-ui {
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

.ui-checkbox {
  --secondary-color: #fff;
  /* checkbox */
  --checkbox-diameter: 16px;
  --checkbox-border-width: 1px;
  --checkbox-border-style: solid;
  /* checkmark */
  --checkmark-size: 1.2;
}

.ui-checkbox,
.ui-checkbox *,
.ui-checkbox *::before,
.ui-checkbox *::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.ui-checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: var(--checkbox-diameter);
  height: var(--checkbox-diameter);
  border-radius: @radius-s;
  // background: var(--secondary-color);
  border: var(--checkbox-border-width) var(--checkbox-border-style)
    @line-color-m;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  position: relative;
  margin-right: @space-s;
}

.ui-checkbox::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-box-shadow: 0 0 0 calc(var(--checkbox-diameter) / 2.5) @pcolor;
  box-shadow: 0 0 0 calc(var(--checkbox-diameter) / 2.5) @pcolor;
  border-radius: inherit;
  opacity: 0;
  -webkit-transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  -o-transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
}

.ddd::before {
  top: 40%;
  left: 50%;
  content: "";
  position: absolute;
  width: 4px;
  height: 7px;
  border-right: 1px solid var(--secondary-color);
  border-bottom: 1px solid var(--secondary-color);
  -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(0);
  -ms-transform: translate(-50%, -50%) rotate(45deg) scale(0);
  transform: translate(-50%, -50%) rotate(45deg) scale(0);
  opacity: 0;
  -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
    opacity 0.1s;
  -o-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
}

.eee::before {
  top: 50%;
  left: 50%;
  content: "";
  position: absolute;
  width: 6px;
  height: 1.5px;
  // border-radius: 1px;
  background: var(--secondary-color);
  -webkit-transform: translate(-50%, -50%) scale(0);
  -ms-transform: translate(-50%, -50%) scale(0);
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
    opacity 0.1s;
  -o-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
}

/* actions */
.yk-checkbox {
  cursor: pointer;

  &:hover {
    .ui-checkbox {
      border-color: @pcolor;
    }
  }
}

.yk-checkbox {
  &:checked {
    .ui-checkbox {
      background: @pcolor;
      border-color: transparent;
    }
  }
}

.aaa {
  background: @pcolor;
  border-color: transparent;
}
.ccc {
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

.ccc::before {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%) scale(var(--checkmark-size));
  -ms-transform: translate(-50%, -50%) scale(var(--checkmark-size));
  transform: translate(-50%, -50%) scale(var(--checkmark-size));
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
</style>
