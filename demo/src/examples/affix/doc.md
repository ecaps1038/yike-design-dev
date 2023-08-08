## YkAffix 固钉

:::snippet
基本用法
基本用法，不设置固定位置时，当页面滚动元素不可见时，元素固定在页面最顶部。
<AffixPrimary/>
:::

:::snippet
顶部固定
当页面滚动或浏览器尺寸改变时，元素向上滚动到距顶部一定距离时固定。
<AffixTop/>
:::

:::snippet
底部固定
通过设置`position`属性为`bottom`时，当页面滚动或浏览器尺寸改变时，元素向下滚动到距底部一定距离时固定。
<AffixBottom/>
:::

:::snippet
固定状态改变回调
当元素`fixed`状态改变回调时，触发`change`事件
<AffixChange/>
:::

:::snippet
指定容器滚动
传入`target`作为滚动容器。注意：当容器外部还有滚动元素时，可以主动监听外部滚动事件，调用`updatePosition`方法去更新固钉位置。
<AffixContainer/>
:::

### API

`<affix>` Props
|参数名 |描述 |类型 |默认值 |
|---------------------|----------|------------|-------|
|offset|偏移量 | number |0|
|position|偏移方向 | 'top'｜'bottom' |'top'|
|target|滚动容器，默认是 window | string ｜ window ｜ HTMLElement |window|

`<affix>`Events
|事件名|描述|参数|
|------|------|----|
|change|元素固定状态改变时触发事件|fixed:boolean|

`<affix>`Methods
|方法名|描述|参数|返回值|
|------|------|----|---|
|updatePosition|用于主动更新位置|-|-|
