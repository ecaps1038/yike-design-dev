<template>
  <div id="yk-badge" ref="badge">
    <!-- 徽标 -->
    <slot></slot>
    <transition name="modal">
      <div v-if="!status" :class="[{ badge: !dot, dot: dot }, type]" v-show="(count > 0)" class="yk-badge"
        :style="{ backgroundColor: color, right: !dot ? -rightWidth(count) + 'px' : '', borderWidth: border + 'px' }">
        <p class="count">{{ nowCount }}</p>
      </div>
    </transition>
    <div v-if="status" class="status">
      <div class="status-dot" :class="[type]" :style="{ backgroundColor: color }"></div>
      <span class="status-text">{{ text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const props = defineProps({
  dot: {
    type: Boolean
  },
  max: {
    type: Number,
    default: 99
  },
  color: {
    type: String,
    default: '',
  },
  status: {
    type: Boolean
  },
  type: {//'default' | 'primary' | 'success' | 'warning' | 'danger'
    type: String,
  },
  text: {
    type: String,
  },
  count: {
    type: Number,
    default: 0,
  },
  border: {
    type: Number,
    defalut: 1,
  }
})

//关于显示长度控制
let nowCount: any = ref(props.count)
const maxCount = (): void => {
  if (props.count > props.max) {
    nowCount.value = props.max + '+';
  }
}
maxCount();

//关于角标款的的缩进
const rightWidth = (count: number): number => {
  if (count > 9) {
    return 14;
  } else {
    return 10;
  }
}
//单独使用
const badge = ref(null)

//获取dome元素添加特定样式
const addStyle = () => {
  let boxid: any = badge.value;
  //将获取的dome转为数组
  let arr = Array.from(boxid.children)
  // console.log(boxid.children)
  if (arr.length == 1) {
    // console.log(boxid.firstChild)
    arr.map((child: any, index: number) => {
      child.style.right = 'auto';
      child.style.top = 'auto';
      child.style.position = 'relative';

    });
  }
};

onMounted(() => {
  addStyle();

})
</script>

<style scoped lang="less">
@import '../../assets/style/yk-index.less';

.modal {
  &-enter {
    &-from {
      transform: scale(0);
      opacity: 0;
    }

    &-active {
      transition: all @animatf ease-out;
    }

    &-to {
      transform: scale(1);
      opacity: 1;
    }
  }

  &-leave {
    &-from {
      transform: scale(1);
      opacity: 1;
    }

    &-active {
      transition: all 0.2s;
    }

    &-to {
      transform: scale(0);
      opacity: 0;
    }
  }
}


#yk-badge {
  position: relative;
  display: inline-flex;
  vertical-align: top;

  .yk-badge {
    border-radius: @radius-r;
    background-color: @ecolor;
    border-color: @bg-color-l;
    border-style: solid;
    position: absolute;
    box-sizing: content-box;
    transition: all @animats;
  }

  .badge {
    min-width: 20px;
    height: 20px;
    top: -10px;

    .count {
      font-size: 12px;
      color: #fff;
      text-align: center;
      line-height: 20px;
      padding: 0 6px;
      font-weight: 600;
    }
  }

  .dot {
    width: 6px;
    height: 6px;
    right: -4px;
    top: -4px;

    .count {
      display: none;
    }
  }

  .status {
    display: flex;
    align-items: center;
    height: 22px;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    background-color: @font-color-s;
    border-radius: @radius-r;
    transition: all @animats;
  }

  .status-text {
    padding-left: @space-s;
  }


  //状态色
  .default {
    background-color: @font-color-s;
  }

  .success {
    background-color: @scolor;
  }

  .warning {
    background-color: @wcolor;
  }

  .primary {
    background-color: @pcolor;
  }

  .danger {
    background-color: @ecolor;
  }
}
</style>