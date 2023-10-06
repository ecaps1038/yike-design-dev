## YkInputNumber 数字输入框

数字输入框用于准确地输入数字。

:::snippet
基本用法
数字输入框的基本用法。
<InputNumberPrimary/>
:::

:::snippet
尺寸
与<a href="#module/input"> 输入框 </a>一样，有四种尺寸：`s`，`m`，`l`，`xl`，如下：
<InputNumberSize/>
:::

:::snippet
自定义格式
通过 `formatter` 设置用于自定义显示格式的处理函数。
<InputNumberFormat/>
:::

:::snippet
最大最小值
通过 `max` 和 `min` 设置最大和最小值。输出值始终会被限制在设定范围内，即使计算值超出。
<InputNumberLimit/>
:::

:::snippet
精度与步进值
通过 `precision` 和 `step` 设置精度和步进值。
<InputNumberPre/>
:::

### API

| 参数                 | 描述               | 类型                      | 默认值                   |
| -------------------- | ------------------ | ------------------------- | ------------------------ |
| v-model(model-value) | 绑定模型           | Ref                       | ''                       |
| max                  | 最大值             | number                    | Infinity                 |
| min                  | 最小值             | number                    | -Infinity                |
| step                 | 步进值             | number                    | 1                        |
| precision            | 显示精度           | number                    | 0                        |
| size                 | 数字输入框的尺寸   | 's'｜'m'｜'l'｜'xl'       | 'l'                      |
| disabled             | 是否禁用数字输入框 | boolean                   | false                    |
| controls             | 是否开启控制按钮   | boolean                   | true                     |
| formatter            | 自定义格式函数     | (value: string) => string | (value: string) => value |

其余属性继承自 [Input](/module/input#Input)

### Events

| 事件     | 描述           |
| -------- | -------------- |
| increase | 数字增加时触发 |
| decrease | 数字减少时触发 |

其余事件继承自 [Input](/module/input#Input)
