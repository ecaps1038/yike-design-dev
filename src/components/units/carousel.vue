<script setup lang="ts">
import { reactive, ref } from 'vue'
import CaseCard from '@/components/CaseCard.vue'

let doc_datas = [
  {
    title: '基本用法',
    note: '规定组件宽高，传入一个图片数组即可使用',
    code: `<Carousel :width="542" :height="240" :images="images_3"></Carousel>`,
  },
  {
    title: '轮播方向',
    note: '可以通过 direction 改变轮播组件的方向',
    code: ` <Carousel
    :width="542"
    :height="240"
    :images="images_3"
    :direction="'vertical'"
></Carousel>`,
  },
  {
    title: '轮播切换',
    note: '可以通过 show-type 设置轮播切换显示, 通过 auto-play 设置是否自动切换,通过 duration 设置播放切换时间',
    code: `<Carousel
    :width="542"
    :height="240"
    :show-type="'fade'"
    :auto-play="true"
    :duration="2000"
    :images="images_3"
></Carousel>`,
  },
  {
    title: '箭头按钮',
    note: '可以通过 arrow-show 设置箭头显示状态, 通过 arrow-style 自定义箭头样式',
    code: `<Carousel
    :width="542"
    :height="240"
    :images="images_6"
    :arrow-show="arrowShow"
    :arrow-style="arrowStyle"
></Carousel>`,
  },
  {
    title: '指示器',
    note: '可以通过 indicator-type 设置指示器显示类型, 通过 indicator-show 设置指示器显示状态,通过 indicator-position 设置指示器位置, 为了避免与箭头按钮冲突, 需要注意指示器方向与轮播方向相关, 通过 indicator-style 自定义指示器样式, 通过 indicator-active-style 自定义激活样式',
    code: ``,
  },
]

let API_carousel_parameter = [
  {
    title: '参数名',
    dataIndex: 'name',
    light: false,
  },
  {
    title: '描述',
    dataIndex: 'expl',
    light: false,
  },
  {
    title: '类型',
    dataIndex: 'type',
    light: true,
  },
  {
    title: '默认值',
    dataIndex: 'normal',
    light: false,
  },
]

let API_carousel_datas = reactive([
  {
    key: '1',
    name: 'images',
    expl: '轮播图片数组',
    type: `array`,
    normal: '-',
  },
  {
    key: '2',
    name: 'current',
    expl: '当前轮播图片索引，修改索引可以改变首张播放图片',
    type: `number`,
    normal: '0',
  },
  {
    key: '3',
    name: 'width',
    expl: '组件宽度',
    type: `string`,
    normal: 'auto',
  },
  {
    key: '4',
    name: 'height',
    expl: '组件高度',
    type: `string`,
    normal: 'auto',
  },
  {
    key: '5',
    name: 'direction',
    expl: '组件的轮播方向',
    type: `'horizontal' | 'vertical'`,
    normal: 'horizontal',
  },
  {
    key: '6',
    name: 'show-type',
    expl: '组件显示类型',
    type: `'slide' | 'fade' | 'multiSlide'`,
    normal: 'slide',
  },
  {
    key: '7',
    name: 'auto-play',
    expl: '是否自动播放',
    type: `boolean`,
    normal: 'true',
  },
  {
    key: '8',
    name: 'duration',
    expl: '等待时间',
    type: `number`,
    normal: '2000',
  },
  {
    key: '9',
    name: 'arrow-show',
    expl: '箭头显示方式',
    type: `'always' | 'hover' | 'hidden'`,
    normal: 'always',
  },
  {
    key: '10',
    name: 'arrow-style',
    expl: '箭头显示样式',
    type: `string`,
    normal: '-',
  },
  {
    key: '11',
    name: 'indicator-type',
    expl: '指示器显示类型',
    type: `'line' | 'dot' | 'slider'`,
    normal: 'dot',
  },
  {
    key: '12',
    name: 'indicator-show',
    expl: '指示器显示方式',
    type: `'always' | 'hover' | 'hidden'`,
    normal: 'always',
  },
  {
    key: '12',
    name: 'indicator-position',
    expl: '指示器显示位置',
    type: `'bottom' | 'top' | 'left' | 'right' | 'outer-bottom' | 'outer-top' | 'outer-left' | 'outer-right'`,
    normal: 'bottom',
  },
  {
    key: '13',
    name: 'indicator-style',
    expl: '指示器显示样式',
    type: `string`,
    normal: '-',
  },
  {
    key: '14',
    name: 'indicator-active-style',
    expl: '指示器激活显示样式',
    type: `string`,
    normal: '-',
  },
  {
    key: '15',
    name: 'transition',
    expl: '动画过渡',
    type: `string`,
    normal: 'all 0.3s cubic-bezier(0.34, 0.69, 0.1, 1)',
  },
])

let API_carouselItem_parameter = [
  {
    title: '组件功能',
    dataIndex: 'name',
    light: false,
  },
  {
    title: '描述',
    dataIndex: 'expl',
    light: false,
  },
  {
    title: '必需',
    dataIndex: 'necessary',
    light: false,
  },
]
let API_carouselItem_datas = reactive([
  {
    key: '1',
    name: '插槽',
    expl: '默认插入图片，循环构成轮播图效果',
    necessary: '非必需',
  },
])

let images_3 = [
  '/src/assets/images/carousel/carousel-1.png',
  '/src/assets/images/carousel/carousel-2.png',
  '/src/assets/images/carousel/carousel-3.png',
]
let images_6 = [
  '/src/assets/images/carousel/carousel-1.png',
  '/src/assets/images/carousel/carousel-2.png',
  '/src/assets/images/carousel/carousel-3.png',
  '/src/assets/images/carousel/carousel-4.png',
  '/src/assets/images/carousel/carousel-5.png',
  '/src/assets/images/carousel/carousel-6.png',
]

const directionArr = ['horizontal', 'vertical']
const direction = ref('horizontal')
const switchDirection = (val: string) => {
  direction.value = val
}

const showTypeArr = ['slide', 'fade', 'mutliSlide']
const autoPlayArr = [true, false]

const showType = ref('slide')
const autoPlay = ref(true)
const duration = ref(2000)
const switchShowType = (val: string) => {
  showType.value = val
}
const switchAutoPlay = (val: boolean) => {
  autoPlay.value = val
}
const switchDuration = (val: number) => {
  duration.value = val
}

const arrowShowArr = ['always', 'hover', 'hidden']
const arrowStyleArr = ['default', 'primary']
const arrowShow = ref('always')
const arrowStyle = ref('default')

const switchArrowShow = (val: string) => {
  arrowShow.value = val
}
const switchArrowStyle = (val: string) => {
  if (val === 'default') {
    arrowStyle.value = ''
  } else if (val === 'primary') {
    arrowStyle.value =
      'display: flex;justify-content: center;align-items: center;padding:12px;background-color: #2b5aed;border-radius: 50%;font-size:16px;color: #ffffff;'
  }
}

const indicatorTypeArr = ['dot', 'line', 'slider']
const indicatorShowArr = ['always', 'hover', 'hidden']
const indicatorPositionArr = [
  'left',
  'top',
  'right',
  'bottom',
  'outer-left',
  'outer-top',
  'outer-right',
  'outer-bottom',
]
const indicatorStyleArr = ['default', 'primary']
const indicatorType = ref('dot')
const indicatorShow = ref('always')
const indicatorPosition = ref('always')
const indicatorStyle = ref('')
const indicatorActiveStyle = ref('')

const switchIndicatorType = (val: string) => {
  indicatorType.value = val
}
const switchIndicatorShow = (val: string) => {
  indicatorShow.value = val
}
const switchIndicatorPosition = (val: string) => {
  indicatorPosition.value = val
}
const switchIndicatorStyle = (val: string) => {
  if (val === 'default') {
    indicatorStyle.value = ''
    indicatorActiveStyle.value = ''
  } else if (val === 'primary') {
    indicatorStyle.value = 'background-color: rgba(43, 90, 237, 0.5);'
    indicatorActiveStyle.value = 'background-color:rgba(43, 90, 237, 1);'
  }
}
</script>

<template>
  <main class="module">
    <div class="top-title">
      <Title :level="2">Carousel 图片轮播</Title>
      <Paragraph>
        用于展示多张图片、视频或内嵌框架等内容的循环播放，支持系统自动播放或用户手动切换。
      </Paragraph>
    </div>
    <CaseCard
      :title="doc_datas[0].title"
      :note="doc_datas[0].note"
      :code="doc_datas[0].code"
    >
      <Space>
        <Carousel :width="542" :height="240" :images="images_3"></Carousel>
      </Space>
    </CaseCard>
    <CaseCard
      :title="doc_datas[1].title"
      :note="doc_datas[1].note"
      :code="doc_datas[1].code"
    >
      <Space>
        <div style="display: flex; flex-direction: column">
          <div
            style="display: flex; flex-direction: column; margin-bottom: 32px"
          >
            <div>
              <!-- <span>方向切换</span>
              <div style="display: flex; margin: 16px 0">
                <Button
                  style="margin: 0 8px"
                  v-for="(item, index) in directionArr"
                  :key="index"
                  @click="switchDirection(item)"
                >
                  {{ item }}
                </Button>
              </div> -->
            </div>
          </div>
          <Carousel
            :width="542"
            :height="240"
            :images="images_3"
            :direction="'vertical'"
          ></Carousel>
        </div>
      </Space>
    </CaseCard>
    <CaseCard
      :title="doc_datas[2].title"
      :note="doc_datas[2].note"
      :code="doc_datas[2].code"
    >
      <Space>
        <div style="display: flex; flex-direction: column">
          <div
            style="display: flex; flex-direction: column; margin-bottom: 32px"
          >
            <div>
              <!-- <span>轮播切换显示</span>
              <div style="display: flex; margin: 16px 0">
                <Button
                  style="margin: 0 8px"
                  v-for="(item, index) in showTypeArr"
                  :key="index"
                  @click="switchShowType(item)"
                >
                  {{ item }}
                </Button>
              </div>
            </div>
            <div>
              <span>自动播放</span>
              <div style="display: flex; margin: 16px 0">
                <Button
                  style="margin: 0 8px"
                  v-for="(item, index) in autoPlayArr"
                  :key="index"
                  @click="switchAutoPlay(item)"
                >
                  {{ item }}
                </Button>
              </div>
            </div>
            <div>
              <span>播放切换时间</span>
              <div style="display: flex; margin: 16px 0">
                <InputNumber :modelValue="duration" :max="5000" :min="0" />
                <Button
                  style="margin-left: 8px"
                  @click="switchDuration(duration)"
                >
                  切换
                </Button>
              </div> -->
            </div>
          </div>
          <Carousel
            :width="542"
            :height="240"
            :show-type="'fade'"
            :auto-play="true"
            :duration="2000"
            :images="images_3"
          ></Carousel>
        </div>
      </Space>
    </CaseCard>
    <CaseCard
      :title="doc_datas[3].title"
      :note="doc_datas[3].note"
      :code="doc_datas[3].code"
    >
      <Space>
        <div style="display: flex; flex-direction: column">
          <div
            style="display: flex; flex-direction: column; margin-bottom: 32px"
          >
            <div>
              <span>箭头显示</span>
              <div style="display: flex; margin: 16px 0">
                <Button
                  style="margin: 0 8px"
                  v-for="(item, index) in arrowShowArr"
                  :key="index"
                  @click="switchArrowShow(item)"
                >
                  {{ item }}
                </Button>
              </div>
            </div>
            <div>
              <span>箭头样式</span>
              <div style="display: flex; margin: 16px 0">
                <Button
                  style="margin: 0 8px"
                  v-for="(item, index) in arrowStyleArr"
                  :key="index"
                  @click="switchArrowStyle(item)"
                >
                  {{ item }}
                </Button>
              </div>
            </div>
          </div>
          <Carousel
            :width="542"
            :height="240"
            :images="images_6"
            :arrow-show="arrowShow"
            :arrow-style="arrowStyle"
          ></Carousel>
        </div>
      </Space>
    </CaseCard>
    <CaseCard
      :title="doc_datas[4].title"
      :note="doc_datas[4].note"
      :code="doc_datas[4].code"
    >
      <Space>
        <div style="display: flex; flex-direction: column">
          <div
            style="display: flex; flex-direction: column; margin-bottom: 32px"
          >
            <div>
              <span>指示器类型</span>
              <div style="display: flex; margin: 16px 0">
                <Button
                  style="margin: 0 8px"
                  v-for="(item, index) in indicatorTypeArr"
                  :key="index"
                  @click="switchIndicatorType(item)"
                >
                  {{ item }}
                </Button>
              </div>
            </div>
            <div>
              <span>指示器显示</span>
              <div style="display: flex; margin: 16px 0">
                <Button
                  style="margin: 0 8px"
                  v-for="(item, index) in indicatorShowArr"
                  :key="index"
                  @click="switchIndicatorShow(item)"
                >
                  {{ item }}
                </Button>
              </div>
            </div>
            <div>
              <span>指示器位置</span>
              <div style="display: flex; margin: 16px 0">
                <Button
                  style="margin: 0 8px"
                  v-for="(item, index) in indicatorPositionArr"
                  :key="index"
                  @click="switchIndicatorPosition(item)"
                >
                  {{ item }}
                </Button>
              </div>
            </div>
            <div>
              <span>指示器样式</span>
              <div style="display: flex; margin: 16px 0">
                <Button
                  style="margin: 0 8px"
                  v-for="(item, index) in indicatorStyleArr"
                  :key="index"
                  @click="switchIndicatorStyle(item)"
                >
                  {{ item }}
                </Button>
              </div>
            </div>
          </div>
          <Carousel
            :width="542"
            :height="240"
            :images="images_6"
            :indicator-type="indicatorType"
            :indicator-show="indicatorShow"
            :indicator-position="indicatorPosition"
            :indicator-style="indicatorStyle"
            :indicator-active-style="indicatorActiveStyle"
          ></Carousel>
        </div>
      </Space>
    </CaseCard>
    <div class="api">
      <Title :level="3">API</Title>
      <Title :level="4">Carousel</Title>
      <!-- <Text type="secondary">只有一个简单的 name</Text> -->
      <div class="unit-table">
        <Table
          :data="API_carousel_datas"
          :columns="API_carousel_parameter"
        ></Table>
      </div>
      <Title :level="4">CarouselItem</Title>
      <!-- <Text type="secondary">只有一个简单的 name</Text> -->
      <div class="unit-table">
        <Table
          :data="API_carouselItem_datas"
          :columns="API_carouselItem_parameter"
        ></Table>
      </div>
    </div>
  </main>
</template>

<style lang="less" scoped>
.unit-table {
  width: 100%;
  // overflow: hidden;
  overflow-x: auto;
}
</style>
