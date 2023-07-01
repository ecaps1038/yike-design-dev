<script lang="ts" setup>
import { ref,watch } from "vue";
import ykAnimate from "../icon/ykAnimate.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "m",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  checkedColor: {
    type: String,
  },
  uncheckedColor: {
    type: String,
  },
});
const emits = defineEmits(["update:modelValue", "change"]);
const picks = ref();
picks.value = props.modelValue;

//更改loading颜色 
const loadcolor=ref()
const changeColor=()=>{
  if(picks.value){
    loadcolor.value='primary';
  }else{
    loadcolor.value='default'
  }
}
changeColor();

//点击改变
const change = () => {
  picks.value = !picks.value;
  changeColor();
  emits("update:modelValue", picks.value);
  emits("change", picks.value);
};

</script>

<template>
  <div class="yk-switch" :class="{ disabled: disabled,loading:loading }">
    <label @click="change" :class="[size, { darkm: picks && size=='m',darks: picks && size=='s' }]">
      <i><ykAnimate :class="[size]" name="loading" v-show="loading" :type="loadcolor"/></i>
    </label>
  </div>
</template>

<style lang="less" scoped>
@import "../../assets/style/yk-index.less";

label {
  display: block;
  width: 40px;
  height: 22px;
  margin: 0px auto;
  border-radius: 100px;
  transition: all 0.2s ease-in-out;
  -webkit-transition: all 0.2s ease-in-out;
  background-color: @line-color-m;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
    i {
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
      transform: scale(1.01);
    }
  }
  &:active {
    i {
      width: 20px;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    }
  }
  i {
    height: 16px;
    width: 16px;
    background: @bg-color-l;
    display: inline-block;
    border-radius: 100px;
    margin-top: 3px;
    margin-left: 3px;
    transition: all 0.2s ease-in-out;
    -webkit-transition: all 0.2s ease-in-out;
    pointer-events: none;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    position: relative;
    .m{
      position: absolute;
      transform: scale(0.9);
      top:-3.5px;
      left: 1px;
    }
    .s{
      position: absolute;
      transform: scale(0.7);
      top:-3px;
      left: -3.5px;
    }
  }
}

.darkm {
  background-color: @pcolor;
  &:active {
    i {
      margin-left: 16px;
    }
  }
  i {
    margin-left: 20px;
  }
}

//小
.s {
  width: 32px;
  height: 18px;
  &:active {
    i {
      width: 16px;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    }
  }
  i {
    height: 12px;
    width: 12px;
    line-height: 16px;
  }
}
.darks {
  background-color: @pcolor;
  &:active {
    i {
      margin-left: 12px;
    }
  }
  i {
    margin-left: 16px;
  }
}
</style>