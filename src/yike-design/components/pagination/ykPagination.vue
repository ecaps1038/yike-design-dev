<script setup lang="ts">
import { ref, onMounted } from "vue";
import ykIcon from '../icon/YkIcon.vue'
import ykDropdown from '../dropdown/YkDropdown.vue'
import ykDoption from '../dropdown/YkDropdownItem.vue'
import ykInput from '../input/YkInput.vue'

const props = defineProps({
  total: {
    type: Number,
    required: true,//必须的
  },
  disabled: {//是否被激活
    type: Boolean,
    default: false
  },
  showTotal: {//是否显示全部
    type: Boolean,
    default: false,
  },
  showJumper: {//是否显示跳页
    type: Boolean,
    default: false,
  },
  showPageSize: {//是否显示单页条数
    type: Boolean,
    default: false,
  },
  size: {//分页尺寸
    type: String,
    default: 'l',
  },
  simple: {//是否简介模式
    type: Boolean,
    default: false,
  },
})

//传给父组件数值
const emit = defineEmits(["pageData"]);

//pageSize
const pageSize = ref(10);
//nowSize
const nowSize= ref(0);
//当前页码
const nowPage = ref(1);

//总页码数字
const pages = ref(0);

//获取页码
const getPages = () => {
  pages.value = Math.ceil(props.total / nowSize.value)
}

//左右切换
const downSwitch = (e: number): void => {
  if (e == 0 && nowPage.value > 1 && !props.disabled) {
    nowPage.value--;
    emit("pageData",{pageSize:nowSize.value,nowPage:nowPage.value})
  } else if (e == 1 && nowPage.value < pages.value && !props.disabled) {
    nowPage.value++;
    emit("pageData",{pageSize:nowSize.value,nowPage:nowPage.value})
  }
}
//选中某页
const selectPage = (e: number): void => {
  if (!props.disabled) {
    nowPage.value = e;
    emit("pageData",{pageSize:nowSize.value,nowPage:nowPage.value})
  }
}

//更多...计算
const downMore = (e: number): void => {
  if (e == 0 && !props.disabled) {
    nowPage.value -= 5;
    if(nowPage.value<1){
      nowPage.value=1;
    }
    emit("pageData",{pageSize:nowSize.value,nowPage:nowPage.value})
  } else if (e == 1 && !props.disabled) {
    nowPage.value += 5;
    if(nowPage.value>pages.value){
      nowPage.value=pages.value;
    }
    emit("pageData",{pageSize:nowSize.value,nowPage:nowPage.value})
  }
}

//父组件通信
const emitFather=()=>{
  emit("pageData",)
}

//单页显示条数
const dropSelect = (e: any) => {
  nowSize.value=e;
  nowPage.value=1;
  getPages();
  emit("pageData",{pageSize:nowSize.value,nowPage:nowPage.value})
}
//下拉反馈
const drop = ref(false)
const dropClick = (e: any) => {
  drop.value = e;
}

//跳转到某页
const jumperpage=ref();

const doJumper=()=>{
  if(jumperpage.value>0 && jumperpage.value<=pages.value){
    nowPage.value=Number(jumperpage.value);
    emit("pageData",{pageSize:nowSize.value,nowPage:nowPage.value})
  }else if(jumperpage.value>pages.value){
    jumperpage.value=pages.value;
    nowPage.value=pages.value;
    emit("pageData",{pageSize:nowSize.value,nowPage:nowPage.value})
  }
}
const doJumper1=()=>{
  if(nowPage.value>0 && nowPage.value<=pages.value){
    nowPage.value=Number(nowPage.value);
    emit("pageData",{pageSize:nowSize.value,nowPage:nowPage.value})
  }else if(nowPage.value>pages.value){
    nowPage.value=pages.value;
    emit("pageData",{pageSize:nowSize.value,nowPage:nowPage.value})
  }
}

//显示页码规则计算使用
const showPage = (): number => {
  // console.log(nowPage.value)
  if (nowPage.value < 3) {
    return 3
  } else if (nowPage.value > pages.value - 2) {
    return pages.value - 2
  } else {
    return nowPage.value;
  }
}
onMounted(() => {
  nowSize.value=pageSize.value;
  getPages();
  emit("pageData",{pageSize:nowSize.value,nowPage:nowPage.value})
})

</script>
<template>
  <div class="yk-pagination" :class="[{ disabled: disabled }, size]">
    <div :class="{cover:disabled}" v-show="disabled"></div>
    <p class="total-data" v-if="showTotal">共 {{ total }} 条</p>
    <div class="pagination">
      <div class="pgitem left" @click="downSwitch(0)" :class="{ disabled: nowPage == 1 }">
        <ykIcon name="yk-xiangzuo" />
      </div>
      <div class="pages" v-if="!simple">
        <p class="pgitem page" :class="{ nowpage: nowPage == 1 }" @click="selectPage(1)" v-show="pages>0">1</p>
        <p class="more pgitem " v-show="nowPage > 4 && pages>6" @click="downMore(0)">...</p>

        <p class="pgitem page" :class="{ nowpage: nowPage == showPage() - 2 }" @click="selectPage(showPage() - 2)" v-show="showPage() - 2>1">{{showPage() - 2}}</p>
        <p class="pgitem page" :class="{ nowpage: nowPage == showPage() - 1 }" @click="selectPage(showPage() - 1)" v-show="showPage() - 1<pages">{{showPage() - 1}}</p>
        <p class="pgitem page" :class="{ nowpage: nowPage == showPage() }" @click="selectPage(showPage())" v-show="showPage()<pages">{{showPage()}}</p>
        <p class="pgitem page" :class="{ nowpage: nowPage == showPage() +1 }" @click="selectPage(showPage() +1)" v-show="showPage() +1<pages">{{showPage() + 1}}</p>
        <p class="pgitem page" :class="{ nowpage: nowPage == showPage() +2 }" @click="selectPage(showPage() +2)" v-show="showPage() +2<pages">{{showPage() + 2}}</p>

        <p class="more pgitem " v-show="nowPage < pages - 3 && pages>6" @click="downMore(1)">...</p>
        <p class="pgitem page" :class="{ nowpage: nowPage == pages }" @click="selectPage(pages)" v-show="pages>1">{{ pages }}</p>
      </div>

      <div class="simples" v-if="simple">
        <ykInput :size="size" style="width:48px" v-model="nowPage" @blur="doJumper1" :disabled="disabled"/>
        <p class="simp-total"><ykIcon name="yk-xiexian" />{{ pages }}</p>
      </div>

      <div class="pgitem right" @click="downSwitch(1)" :class="{ disabled: nowPage == pages }">
        <ykIcon name="yk-xiangyou" />
      </div>
    </div>
    <!-- 下拉选择 -->
    <ykDropdown trigger="click" class="page-jumper" @activate="dropClick" @select="dropSelect" :disabled="disabled" v-if="showPageSize">
      <Button type="outline" :size="size">{{nowSize}} 条/页
        <Icon name="yk-xiangxia" class="drop-icon" :class="{ drop: drop }"></Icon>
      </Button>
      <template #content>
        <ykDoption :value="pageSize">{{pageSize}} 条/页</ykDoption>
        <ykDoption :value="pageSize*2">{{pageSize*2}} 条/页</ykDoption>
        <ykDoption :value="pageSize*3">{{pageSize*3}} 条/页</ykDoption>
        <ykDoption :value="pageSize*4">{{pageSize*4}} 条/页</ykDoption>
        <ykDoption :value="pageSize*5">{{pageSize*5}} 条/页</ykDoption>
      </template>
    </ykDropdown>
    <div class="yk-jumper" v-if="showJumper">
      <span class="jumper-name">前往</span>
      <ykInput :size="size" style="width:48px" v-model="jumperpage" @blur="doJumper" :disabled="disabled"/>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../../assets/style/yk-index.less';

.yk-pagination {
  display: flex;

  .total-data {
    line-height: 36px;
    padding-right: 8px;
  }

  .pagination {
    display: flex;
  }

  .pages {
    display: flex;
  }
  .simples{
    display:flex;
    align-items: center;
    padding:0 8px; 
    .simp-total{
      padding-left: 4px;
    }
  }

  .pgitem {
    min-width: 36px;
    height: 36px;
    padding: 0 8px;
    border-radius: @radius-m;
    background-color: @bg-color-s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    // transition: background-color @animatb;

    &:hover {
      background-color: @bg-color-ss;
    }
  }

  .page {
    margin: 0 4px;
  }

  .more {
    margin: 0 4px;
    background-color: @bg-color-l;
  }

  .nowpage {
    background-color: @pcolor;
    color: #fff;

    &:hover {
      background-color: @pcolor;
    }
  }

  .left {
    margin-right: 4px;
  }

  .right {
    margin-left: 4px;
  }

  //jumper
  .page-jumper {
    margin-left: 8px;

    .drop-icon {
      margin-left: 4px;
      transition: all @animatb;
    }

    .drop {
      transform: rotate(180deg);
    }
  }

  .disabled {
    opacity: 0.4;
    cursor: not-allowed;

    &:hover {
      background-color: @bg-color-s;
    }
  }
}

//页码跳转
.yk-jumper{
  display:flex;
  align-items: center;
  padding-left:@space-m;
  .jumper-name{
    padding-right:@space-s;
  }
}

//变换
.l {
  .pgitem {
    min-width: 36px;
    height: 36px;
    border-radius: @radius-m;
  }
}

.m {
  .total-data {
    line-height: 32px;
  }

  .pgitem {
    min-width: 32px;
    height: 32px;
    border-radius: @radius-s;
  }
}

.s {
  .total-data {
    line-height: 24px;
    font-size: @size-ss;
  }

  .pgitem {
    min-width: 24px;
    height: 24px;
    padding: 0 4px;
    border-radius: @radius-s;
    font-size: @size-ss;
  }

  .page {
    margin: 0 2px;
  }

  .left {
    margin-right: 2px;
  }

  .right {
    margin-left: 2px;
  }
}
</style>