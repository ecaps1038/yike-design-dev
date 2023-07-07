<template>
  <div class="yk-paragraph">
    <p :class="[type, { strong: b }]" ref="getDivRef">
      <slot></slot>
      <ykIcon @click="tryCopys" name="yk-kaobei" v-show="copyable" />
    </p>
    <div class="more" @click="getMore" v-show="ismore">展开</div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { tryCopy } from '../../utils/yikeFunc.js'
import ykIcon from '../icon/Icon.vue'

const props = defineProps({
  b: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: '',
  },
  ellipsis: {
    //是否多行隐藏
    type: [Object],
    default: { rows: '', showMore: false },
  },
  copyable: {
    type: Boolean,
    default: false,
  },
})

let str: string
let ismore = ref(false)
//获取dome元素
const getDivRef = ref(null)

//进行多行隐藏处理
const moreline = (rows: number) => {
  let lines = 2
  if (rows) {
    lines = rows
    let boxid: any = getDivRef.value
    // console.log(getDivRef);
    //js获取元素所有样式
    let computedStyle = getComputedStyle(boxid)
    let lineHeight = computedStyle.lineHeight

    let top = lines * parseInt(lineHeight)

    //获取原始数据不跟随元数据改变
    str = JSON.parse(JSON.stringify(boxid.innerHTML))
    let tempstr = str
    // console.log(str)

    let len = tempstr.length
    let i = 0
    if (boxid.offsetHeight > top) {
      if (props.ellipsis.showMore) {
        ismore.value = true
      }

      let temp = ''
      boxid.innerHTML = temp
      // console.log(tempstr)
      while (boxid.offsetHeight <= top) {
        temp = tempstr.substring(0, i + 1)
        i++
        boxid.innerHTML = temp
      }
      tempstr = temp.substring(0, temp.length - 1)
      len = tempstr.length
      if (ismore.value) {
        boxid.innerHTML = tempstr.substring(0, len - 3) + '...'
      } else {
        boxid.innerHTML = tempstr.substring(0, len - 1) + '...'
      }
      boxid.height = top + 'rem'
    }
  }
}

//显示全部内容
const getMore = () => {
  let boxid: any = getDivRef.value
  boxid.innerHTML = str
  ismore.value = false
}

//拷贝内容
const tryCopys = (): void => {
  tryCopy(getDivRef.value)
}

onMounted(() => {
  moreline(props.ellipsis.rows)
})
</script>
<style lang="less" scoped>
.yk-paragraph {
  margin-bottom: 1em;
  position: relative;
}

.icon {
  fill: @lcolor;
  cursor: pointer;
}

.more-par {
  position: absolute;
  right: 0;
  bottom: 0px;
  padding-left: 20px;
  background-color: #fff;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.default {
  color: @font-color-l;
}

.primary {
  color: @pcolor;
}

.secondary {
  color: @font-color-m;
}

.third {
  color: @font-color-s;
}

.disabled {
  color: @font-color-s;
}

.success {
  color: @scolor;
}

.warning {
  color: @wcolor;
}

.danger {
  color: @ecolor;
}

.strong {
  font-weight: bold;
}

.more {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  color: @lcolor;
}
</style>
