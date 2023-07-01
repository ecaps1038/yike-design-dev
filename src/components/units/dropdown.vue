<script setup lang="ts">
import { reactive,ref } from "vue";
import CaseCard from "@/components/CaseCard.vue";
import "@/yike-design/assets/font/line/iconfont.js";
import "@/yike-design/assets/font/surface/iconfont.js";
import { Avatar } from "@/yike-design";
import { useRouter } from 'vue-router';

//说明部分
let datas = [
  {
    title: "基本用法",
    note: "下拉菜单的基本用法，默认采用hover触发，使用value传递选值，@select返回选择结果。",
    code: `...js
//获取选择数据如果是string链接进行跳转
const handleSelect = (e: any) => {
  if(typeof e=="string"){
    location.href=e
  }else{
    console.log(e);
  }
}

... html
<space>
  <Dropdown @select="handleSelect">
    <Button type="sceondary">hover</Button>
    <template #content>
      <Doption value="http://www.huohuo90.com">逸刻时光</Doption>
      <Doption value="https://www.huohuo90.com:3002">留言墙</Doption>
      <Doption value="https://www.huohuo90.com:3004">YIKE游戏</Doption>
      <Doption disabled>不可选</Doption>
      <Doption :value="{ a: 'yike', b: '逸刻', c: '一颗' }">一刻</Doption>
    </template>
  </Dropdown>
  <Dropdown disabled>
    <Button type="sceondary" disabled>disabled</Button>
    <template #content>
      <Doption>逸刻时光</Doption>
      <Doption>一刻</Doption>
      <Doption>留言墙</Doption>
      <Doption>yike design</Doption>
    </template>
  </Dropdown>
</space>`,
  },
  {
    title: "触发方式 trigger",
    note: "通过设置 trigger 指定触发方式。",
    code: `<space>
  <Dropdown @select="handleSelect">
    <Button type="sceondary">hover</Button>
    <template #content>
      <Doption value="http://www.huohuo90.com">逸刻时光</Doption>
      <Doption value="https://www.huohuo90.com:3002">留言墙</Doption>
      <Doption value="https://www.huohuo90.com:3004">YIKE游戏</Doption>
      <Doption disabled>不可选</Doption>
      <Doption :value="{ a: 'yike', b: '逸刻', c: '一颗' }">一刻</Doption>
    </template>
  </Dropdown>
  <Dropdown @select="handleSelect" trigger="click">
    <Button type="sceondary">点击触发</Button>
    <template #content>
      <Doption value="http://www.huohuo90.com">逸刻时光</Doption>
      <Doption value="https://www.huohuo90.com:3002">留言墙</Doption>
      <Doption value="https://www.huohuo90.com:3004">YIKE游戏</Doption>
      <Doption disabled>不可选</Doption>
      <Doption :value="{ a: 'yike', b: '逸刻', c: '一颗' }">一刻</Doption>
    </template>
  </Dropdown>
</space>`,
  },
  {
    title: "弹出方向 position",
    note: "通过 position 支持指定 6 种弹出方位，分别是：top: 向上, tl: 左上, tr: 右上, bottom: 下方(默认), bl: 左下, br: 右下。",
    code: `<space>
  <Dropdown position="bl">
    <Button type="sceondary">左下角的位置</Button>
    <template #content>
      <Doption>逸刻时光</Doption>
      <Doption>留言墙</Doption>
      <Doption>YIKE游戏</Doption>
      <Doption>yike design</Doption>
    </template>
  </Dropdown>
  <Dropdown position="bottom">
    <Button type="sceondary">bottom</Button>
    <template #content>
      <Doption>逸刻时光</Doption>
      <Doption>留言墙</Doption>
      <Doption>YIKE游戏</Doption>
      <Doption>yike design</Doption>
    </template>
  </Dropdown>
  <Dropdown position="br">
    <Button type="sceondary">右下角的位置</Button>
    <template #content>
      <Doption>逸刻时光</Doption>
      <Doption>留言墙</Doption>
      <Doption>YIKE游戏</Doption>
      <Doption>yike design</Doption>
    </template>
  </Dropdown>
  <Dropdown position="tl">
    <Button type="sceondary">左上角的位置</Button>
    <template #content>
      <Doption>逸刻时光</Doption>
      <Doption>留言墙</Doption>
      <Doption>YIKE游戏</Doption>
      <Doption>yike design</Doption>
    </template>
  </Dropdown>
  <Dropdown position="top">
    <Button type="sceondary">top</Button>
    <template #content>
      <Doption>逸刻时光</Doption>
      <Doption>留言墙</Doption>
      <Doption>YIKE游戏</Doption>
      <Doption>yike design</Doption>
    </template>
  </Dropdown>
  <Dropdown position="tr">
    <Button type="sceondary">右上角的位置</Button>
    <template #content>
      <Doption>逸刻时光</Doption>
      <Doption>留言墙</Doption>
      <Doption>YIKE游戏</Doption>
      <Doption>yike design</Doption>
    </template>
  </Dropdown>
</space>`,
  },
  {
    title: "多级菜单",
    note: "带有多级菜单的下拉框。",
    code: `<Dropdown position="bl">
  <Button type="sceondary">多级菜单
  </Button>
  <template #content>
    <Doption>三国演义</Doption>
    <Doption>红楼梦</Doption>
    <Submenu>
      水浒传
      <template #content>
        <Doption>好好学习</Doption>
        <Doption>天天向上</Doption>
        <Submenu>
          马到成功
          <template #content>
            <Doption>万事如意</Doption>
            <Doption>今天开心</Doption>
            <Doption>好样的</Doption>
          </template>
        </Submenu>
      </template>
    </Submenu>
    <Doption>西游记</Doption>
  </template>
</Dropdown>`,
  }, {
    title: "带图标的选项",
    note: "我觉得这里应该是直接插入 Icon 就很不错。",
    code: `<Dropdown position="bl">
  <Button type="sceondary">hover</Button>
  <template #content>
    <Doption value="aabbccddee">
      <Icon name="yk-biaoqing" style="margin-right: 4px;" />三国演义
    </Doption>
    <Doption :value="{ a: 'aa', b: 'bb', c: 'cc' }">
      <Icon name="yk-taiyang" style="margin-right: 4px;" />红楼梦
    </Doption>
    <Doption>
      <Icon name="yike-biaoqing" style="margin-right: 4px;" />水浒传
    </Doption>
    <Doption>
      <Icon name="yike-touxiang" style="margin-right: 4px;" />西游记
    </Doption>
  </template>
</Dropdown>`,
  },{
    title: "下拉箭头",
    note: "在下拉触发时会返回事件",
    code: `...js
//下拉反馈
const dropa = ref(false)
const dropb = ref(false)
const dropA = (e:boolean) => {
  dropa.value = e;
}
const dropB = (e:boolean) => {
  dropb.value = e;
}

...html
<space>
  <Dropdown position="bl" @activate="dropA">
    <Button type="sceondary">hover
      <Icon name="yk-xiangxia" class="drop-icon" :class="{ dropc: dropa }"></Icon>
    </Button>
    <template #content>
      <Doption>三国演义</Doption>
      <Doption>红楼梦</Doption>
      <Doption>水浒传</Doption>
      <Doption>西游记</Doption>
    </template>
  </Dropdown>
  <Dropdown position="bl" @activate="dropB" trigger="click">
    <Button type="sceondary">click
      <Icon name="yk-xiangxia" class="drop-icon" :class="{ dropc: dropb }"></Icon>
    </Button>
    <template #content>
      <Doption>三国演义</Doption>
      <Doption>红楼梦</Doption>
      <Doption>水浒传</Doption>
      <Doption>西游记</Doption>
    </template>
  </Dropdown>
</space>

...css
.drop-icon {
  margin-left: 4px;
  transition: all @animatb;
}
.dropc {
  transform: rotate(180deg);
}`,
  },
];

//api部分
const columns = [
  {
    title: "参数名",
    dataIndex: "name",
    light: false,
  },
  {
    title: "描述",
    dataIndex: "expl",
    light: false,
  },
  {
    title: "类型",
    dataIndex: "type",
    light: true,
  },
  {
    title: "默认值",
    dataIndex: "normal",
    light: false,
  },
];
const data = reactive([
  {
    key: "1",
    name: "trigger",
    expl: "触发方式",
    type: `'hover' ｜ 'click' `,
    normal: "hover",
  },
  {
    key: "2",
    name: "position",
    expl: "弹出位置",
    type: `'bottom' | 'bl' | 'br' | 'top' | 'tl' | 'tr'`,
    normal: "bottom",
  },
  {
    key: "3",
    name: "disabled",
    expl: "是否禁用",
    type: `boolean`,
    normal: "false",
  }
]);

const columns1 = [
  {
    title: "事件名",
    dataIndex: "name",
    light: false,
  },
  {
    title: "描述",
    dataIndex: "expl",
    light: false,
  },
  {
    title: "参数",
    dataIndex: "type",
    light: true,
  },
];
const data1 = reactive([
  {
    key: "1",
    name: "select",
    expl: "用户选择时触发",
    type: `string ｜ number | object ｜ undefined`,
  },
  {
    key: "2",
    name: "activate",
    expl: "下拉菜单展开/收起时触发",
    type: `boolean`,
  },
]);

const columns2 = [
  {
    title: "插槽名",
    dataIndex: "name",
    light: false,
  },
  {
    title: "描述",
    dataIndex: "expl",
    light: false,
  },
  {
    title: "参数",
    dataIndex: "type",
    light: false,
  },
];
const data2 = reactive([
  {
    key: "1",
    name: "content",
    expl: "内容",
    type: `-`,
  },
]);

//获取选择数据如果是string链接进行跳转
const handleSelect = (e: any) => {
  if (typeof e == "string") {
    location.href = e
  } else {
    console.log(e);
  }
}

const columns3 = [
  {
    title: "参数名",
    dataIndex: "name",
    light: false,
  },
  {
    title: "描述",
    dataIndex: "expl",
    light: false,
  },
  {
    title: "类型",
    dataIndex: "type",
    light: true,
  },
  {
    title: "默认值",
    dataIndex: "normal",
    light: false,
  },
];
const data3 = reactive([
  {
    key: "1",
    name: "value",
    expl: "选项值",
    type: `string ｜ number | object `,
    normal: "hover",
  },
  {
    key: "2",
    name: "disabled",
    expl: "是否禁用",
    type: `boolean`,
    normal: "false",
  }
]);


//下拉反馈
const dropa = ref(false)
const dropb = ref(false)
const dropA = (e:boolean) => {
  dropa.value = e;
}
const dropB = (e:boolean) => {
  dropb.value = e;
}

</script>
<template>
  <div class="icons">
    <div class="top-title">
      <Title :level="2">Dropdown 下拉菜单</Title>
      <Paragraph>页面上的命令过多时，可将备选命令收纳到向下展开的浮层容器中。通常用于菜单下拉。</Paragraph>
    </div>
    <CaseCard :title="datas[0].title" :note="datas[0].note" :code="datas[0].code">
      <space>
        <Dropdown @select="handleSelect">
          <Button type="sceondary">hover</Button>
          <template #content>
            <Doption value="http://www.huohuo90.com">逸刻时光</Doption>
            <Doption value="https://www.huohuo90.com:3002">留言墙</Doption>
            <Doption value="https://www.huohuo90.com:3004">YIKE游戏</Doption>
            <Doption disabled>不可选</Doption>
            <Doption :value="{ a: 'yike', b: '逸刻', c: '一颗' }">一刻</Doption>
          </template>
        </Dropdown>
        <Dropdown disabled>
          <Button type="sceondary" disabled>disabled</Button>
          <template #content>
            <Doption>逸刻时光</Doption>
            <Doption>一刻</Doption>
            <Doption>留言墙</Doption>
            <Doption>yike design</Doption>
          </template>
        </Dropdown>
      </space>
    </CaseCard>
    <CaseCard :title="datas[1].title" :note="datas[1].note" :code="datas[1].code">
      <space>
        <Dropdown @select="handleSelect">
          <Button type="sceondary">hover</Button>
          <template #content>
            <Doption value="http://www.huohuo90.com">逸刻时光</Doption>
            <Doption value="https://www.huohuo90.com:3002">留言墙</Doption>
            <Doption value="https://www.huohuo90.com:3004">YIKE游戏</Doption>
            <Doption disabled>不可选</Doption>
            <Doption :value="{ a: 'yike', b: '逸刻', c: '一颗' }">一刻</Doption>
          </template>
        </Dropdown>
        <Dropdown @select="handleSelect" trigger="click">
          <Button type="sceondary">点击触发</Button>
          <template #content>
            <Doption value="http://www.huohuo90.com">逸刻时光</Doption>
            <Doption value="https://www.huohuo90.com:3002">留言墙</Doption>
            <Doption value="https://www.huohuo90.com:3004">YIKE游戏</Doption>
            <Doption disabled>不可选</Doption>
            <Doption :value="{ a: 'yike', b: '逸刻', c: '一颗' }">一刻</Doption>
          </template>
        </Dropdown>
      </space>
    </CaseCard>
    <CaseCard :title="datas[2].title" :note="datas[2].note" :code="datas[2].code">
      <space wrap>
        <Dropdown position="bl">
          <Button type="sceondary">左下角的位置</Button>
          <template #content>
            <Doption>逸刻时光</Doption>
            <Doption>留言墙</Doption>
            <Doption>YIKE游戏</Doption>
            <Doption>yike design</Doption>
          </template>
        </Dropdown>
        <Dropdown position="bottom">
          <Button type="sceondary">bottom</Button>
          <template #content>
            <Doption>逸刻时光</Doption>
            <Doption>留言墙</Doption>
            <Doption>YIKE游戏</Doption>
            <Doption>yike design</Doption>
          </template>
        </Dropdown>
        <Dropdown position="br">
          <Button type="sceondary">右下角的位置</Button>
          <template #content>
            <Doption>逸刻时光</Doption>
            <Doption>留言墙</Doption>
            <Doption>YIKE游戏</Doption>
            <Doption>yike design</Doption>
          </template>
        </Dropdown>
        <Dropdown position="tl">
          <Button type="sceondary">左上角的位置</Button>
          <template #content>
            <Doption>逸刻时光</Doption>
            <Doption>留言墙</Doption>
            <Doption>YIKE游戏</Doption>
            <Doption>yike design</Doption>
          </template>
        </Dropdown>
        <Dropdown position="top">
          <Button type="sceondary">top</Button>
          <template #content>
            <Doption>逸刻时光</Doption>
            <Doption>留言墙</Doption>
            <Doption>YIKE游戏</Doption>
            <Doption>yike design</Doption>
          </template>
        </Dropdown>
        <Dropdown position="tr">
          <Button type="sceondary">右上角的位置</Button>
          <template #content>
            <Doption>逸刻时光</Doption>
            <Doption>留言墙</Doption>
            <Doption>YIKE游戏</Doption>
            <Doption>yike design</Doption>
          </template>
        </Dropdown>
      </space>
    </CaseCard>
    <CaseCard :title="datas[3].title" :note="datas[3].note" :code="datas[3].code">
      <Dropdown position="bl">
        <Button type="sceondary">多级菜单
        </Button>
        <template #content>
          <Doption>三国演义</Doption>
          <Doption>红楼梦</Doption>
          <Submenu>
            水浒传
            <template #content>
              <Doption>好好学习</Doption>
              <Doption>天天向上</Doption>
              <Submenu>
                马到成功
                <template #content>
                  <Doption>万事如意</Doption>
                  <Doption>今天开心</Doption>
                  <Doption>好样的</Doption>
                </template>
              </Submenu>
            </template>
          </Submenu>
          <Doption>西游记</Doption>
        </template>
      </Dropdown>
    </CaseCard>
    <CaseCard :title="datas[4].title" :note="datas[4].note" :code="datas[4].code">
      <Dropdown position="bl">
        <Button type="sceondary">hover</Button>
        <template #content>
          <Doption>
            <Icon name="yk-biaoqing" style="margin-right: 4px;" />三国演义
          </Doption>
          <Doption>
            <Icon name="yk-taiyang" style="margin-right: 4px;" />红楼梦
          </Doption>
          <Doption>
            <Icon name="yike-biaoqing" style="margin-right: 4px;" />水浒传
          </Doption>
          <Doption>
            <Icon name="yike-touxiang" style="margin-right: 4px;" />西游记
          </Doption>
        </template>
      </Dropdown>
    </CaseCard>
    <CaseCard :title="datas[5].title" :note="datas[5].note" :code="datas[5].code">
      <space>
      <Dropdown position="bl" @activate="dropA">
        <Button type="sceondary">hover
          <Icon name="yk-xiangxia" class="drop-icon" :class="{ dropc: dropa }"></Icon>
        </Button>
        <template #content>
          <Doption>三国演义</Doption>
          <Doption>红楼梦</Doption>
          <Doption>水浒传</Doption>
          <Doption>西游记</Doption>
        </template>
      </Dropdown>
      <Dropdown position="bl" @activate="dropB" trigger="click">
        <Button type="sceondary">click
          <Icon name="yk-xiangxia" class="drop-icon" :class="{ dropc: dropb }"></Icon>
        </Button>
        <template #content>
          <Doption>三国演义</Doption>
          <Doption>红楼梦</Doption>
          <Doption>水浒传</Doption>
          <Doption>西游记</Doption>
        </template>
      </Dropdown>
    </space>
    </CaseCard>
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Dropdown . Props</Title>
      <!-- <Text type="secondary">只有一个简单的 name</Text> -->
      <div class="unit-table">
        <Table :data="data" :columns="columns"></Table>
      </div>
      <Title :level="4">Dropdown . Events</Title>
      <div class="unit-table">
        <Table :data="data1" :columns="columns1"></Table>
      </div>
      <Title :level="4">Dropdown . Slots</Title>
      <div class="unit-table">
        <Table :data="data2" :columns="columns2"></Table>
      </div>
      <Title :level="4">Doption . props</Title>
      <div class="unit-table">
        <Table :data="data3" :columns="columns3"></Table>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.unit-table {
  width: 100%;
  // overflow: hidden;
  overflow-x: auto;
}

.drop-icon {
  margin-left: 4px;
  transition: all @animatb;
}
.dropc {
  transform: rotate(180deg);
}
</style>