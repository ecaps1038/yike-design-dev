### slider 滑动输入条

:::snippet
基本用法
这里展示基本用法
<SliderBase/>
:::

:::snippet
范围输入
如果 `v-model` 需要绑定一个数组，`slider` 则认为你是需要一个范围滑动输入条
<SliderRange/>
:::

:::snippet
展示标记
设置 marks 属性可以展示标记
<SliderMarks/>
:::

:::snippet
竖向模式
设置 direction 属性可使 Slider 变成竖向模式，此时必须设置高度 height 属性
<SliderVertical/>
:::

### API

#### Slider Attributes

| 参数           | 描述                                                     | 类型                      | 默认值       |
| -------------- | -------------------------------------------------------- | ------------------------- | ------------ |
| value(v-model) | 滑动输入条绑定值                                         | number ｜ number[]        | 0            |
| disabled       | 是否被禁用                                               | boolean                   | false        |
| min            | 最小值                                                   | number                    | 0            |
| max            | 最大值                                                   | number                    | 100          |
| direction      | 滑动输入条方向                                           | 'vertical' ｜'horizontal' | 'horizontal' |
| height         | 滑动输入条高度，垂直模式时需要被定义                     | number                    | 200          |
| step           | 百分比步长                                               | number                    | 1            |
| marks          | 滑动输入条标记数组，每个标记可以单独设置样式。详细见下表 | SliderMark[]              | []           |

#### SliderMark Attributes

| 参数      | 描述                                         | 类型   | 默认值 |
| --------- | -------------------------------------------- | ------ | ------ |
| key       | 标记的坐标值，取值必须在闭区间 [min, max] 内 | number | 0      |
| label     | 标记名称                                     | string | --     |
| style     | 标记的自定义样式                             | object | --     |
| labelNode | 标记的自定义节点 VNode                       | vNode  | --     |

#### Slider Events

| 事件名            | 说明                 | 类型     |
| ----------------- | -------------------- | -------- |
| update:modelValue | 滑动实时触发的事件   | Function |
| change            | 滑动结束时触发的事件 | Function |
