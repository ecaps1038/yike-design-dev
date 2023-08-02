# 组件库测试

目前 **yk-design** 组件库添加了单元测试，框架主要采用的是 Vitest，优点是**轻量**、**Vite 的统一配置**，**上手简单**等。

我们**为什么进行测试**，这点我觉得是不用多说的，一个代码、一个项目，它的健壮性是很重要的。

组件库需要进行什么测试：

- **单元测试**：测试给定函数、类和复用逻辑
- **组件测试**：检测咱们组件的挂载、渲染和交互性

## 用例的位置

我们在 `packages` 下新建了一个 `yike-test` 的子包，您可以在这个子包里面来书写对应的测试用例。

## 测试用例的书写

我们以 `button` 组件为例：

```vue
<template>
  <button
    :class="[
      bem([type, status, shape, size], {
        loading: loading,
        long: long,
        disabled: disabled,
      }),
    ]"
    :disabled="disabled || loading"
  >
    <svg v-if="loading" viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'YKButton',
}
</script>

<script setup lang="ts">
import { ButtonProps } from './button'
import { createCssScope } from '../../utils/bem'
import '../style'

defineOptions({
  name: 'YKButton',
})

const bem = createCssScope('button')

withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'l',
  shape: 'default',
  long: false,
  loading: false,
  disabled: false,
})
</script>
```

我们看看，应该写什么**测试用例**。

首先我们的测试用例使用了 `@vue/test-utils` 库中的 `mount` 函数来创建 `Button` 组件的**包装器**，并使用**断言**来验证组件的不同**属性和行为**。

OK，那我们接下来怎么写呢，很简单，我们可以先看看，`props` 都传什么。

我们首先定位到这几个值：`type`，`size`，`shape`，`long`，`loading`，`disabled`。

除了这些呢，我们还应该思考，这个 `button` 还有什么**功能**，是不是它有**插槽传值**的能力，那这么重要的一点，我们是不是需要测试，也就是说，我们需要测试 Button 组件能否正确渲染插槽内容。

最后我们需要测试 Button 最重要的一点，点击事件是否触发，那么我们组件基本的能力就测试出来了。

那我们的测试用例是这样的：

```ts
import { mount } from '@vue/test-utils'
import Button from '../../../../yike-design-ui/src/components/button/src/button.vue'
// 我们使用 describe 函数创建了一个测试套件，名称为 Button，它包含了多个测试用例。每个测试用例都使用 it 函数来描述一个具体的测试场景，并使用断言来验证测试结果是否符合预期。
const UI = 'yike design'
// 第一个测试用例 create 测试了 Button 组件是否具有默认样式 yk - button--primary。我们使用 mount(Button) 创建了一个 Button 组件的包装器，并使用 expect(wrapper.classes()).toContain('yk-button--primary') 断言该组件是否包含名为 yk - button--primary 的 CSS 类。
describe('Button', () => {
  it('create', () => {
    const wrapper = mount(Button)

    expect(wrapper.classes()).toContain('yk-button--primary')
  })
  // 第二个测试用例 type 测试了 Button 组件的 type 属性是否能够正确地设置组件样式。我们使用 mount(Button, { props: { type: 'secondary' } }) 创建一个 Button 组件的包装器，并使用 expect(wrapper.classes()).toContain('yk-button--secondary') 断言该组件是否包含名为 yk - button--secondary 的 CSS 类。
  it('type', () => {
    const wrapper = mount(Button, {
      props: { type: 'secondary' },
    })

    expect(wrapper.classes()).toContain('yk-button--secondary')
  })
  // 第三个测试用例 size 测试了 Button 组件的 size 属性是否能够正确地设置组件样式。我们使用 mount(Button, { props: { size: 's' } }) 创建一个 Button 组件的包装器，并使用 expect(wrapper.classes()).toContain('yk-button--s') 断言该组件是否包含名为 yk - button--s 的 CSS 类。
  it('size', () => {
    const wrapper = mount(Button, {
      props: { size: 's' },
    })

    expect(wrapper.classes()).toContain('yk-button--s')
  })
  // 第四个测试用例 shape 测试了 Button 组件的默认样式是否为 yk - button--default。我们使用 mount(Button) 创建一个 Button 组件的包装器，并使用 expect(wrapper.classes()).toContain('yk-button--default') 断言该组件是否包含名为 yk - button--default 的 CSS 类。
  it('shape', () => {
    const wrapper = mount(Button)

    expect(wrapper.classes()).toContain('yk-button--default')
  })
  // 第五个测试用例 status 测试了 Button 组件的 status 属性是否能够正确地设置组件样式。我们使用 mount(Button, { props: { status: 'danger' } }) 创建一个 Button 组件的包装器，并使用 expect(wrapper.classes()).toContain('yk-button--danger') 断言该组件是否包含名为 yk - button--danger 的 CSS 类。
  it('status', () => {
    const wrapper = mount(Button, {
      props: { status: 'danger' },
    })

    expect(wrapper.classes()).toContain('yk-button--danger')
  })
  // 第六个测试用例 disabled 测试了 Button 组件的 disabled 属性是否能够正确地禁用按钮，并禁止 click 事件的触发。我们使用 mount(Button, { props: { disabled: true } }) 创建一个 Button 组件的包装器
  // 并使用expect(wrapper.classes()).toContain('yk-button--disabled') 断言该组件是否包含名为 yk - button--disabled 的 CSS 类。然后，我们使用 await wrapper.trigger('click') 触发按钮的 click 事件，并使用 expect(wrapper.emitted('click')).toBeUndefined() 断言该事件是否被正确地禁止了。
  it('disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
    })

    expect(wrapper.classes()).toContain('yk-button--disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
  // 第七个测试用例 loading 测试了 Button 组件的 loading 属性是否能够正确地显示加载状态。我们使用 mount(Button, { props: { loading: true } }) 创建一个 Button 组件的包装器
  // 并使用 expect(wrapper.classes()).toContain('yk-button--loading') 断言该组件是否包含名为 yk - button--loading 的 CSS 类。然后，我们使用 expect(wrapper.get('svg').isVisible()).toBeTruthy() 断言该组件是否包含一个可见的 SVG 图标。
  it('loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
    })

    expect(wrapper.classes()).toContain('yk-button--loading')
    expect(wrapper.get('svg').isVisible()).toBeTruthy()
  })
  // 第八个测试用例 should disabled when loading 测试了当 Button 组件处于加载状态时，是否能够正确地禁用按钮，并禁止 click 事件的触发。我们使用 mount(Button, { slots: { default: UI }, props: { loading: true } }) 创建一个 Button 组件的包装器
  // 并使用 await wrapper.trigger('click') 触发按钮的 click 事件，并使用 expect(wrapper.emitted('click')).toBeUndefined() 断言该事件是否被正确地禁止了。
  it('should disabled when loading', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: UI,
      },
      props: { loading: true },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
  // 第九个测试用例 render text 测试了 Button 组件是否能够正确地渲染插槽内容。我们使用 mount(Button, { slots: { default: UI } }) 创建一个 Button 组件的包装器
  // 并使用 expect(wrapper.text()).toEqual(UI) 断言该组件的文本内容是否等于 UI。
  it('render text', () => {
    const wrapper = mount(Button, {
      slots: {
        default: UI,
      },
    })

    expect(wrapper.text()).toEqual(UI)
  })
  // 第十个测试用例 handle click 测试了 Button 组件的 click 事件是否能够正确地触发。我们使用 mount(Button, { slots: { default: UI } }) 创建一个 Button 组件的包装器
  // 并使用 await wrapper.trigger('click') 触发按钮的 click 事件，并使用 expect(wrapper.emitted()).toBeDefined() 断言该事件是否被正确地触发了。
  it('handle click', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: UI,
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })
  // 第十一个测试用例 handle click inside 测试了 Button 组件内部的元素是否能够正确地触发 click 事件。我们使用 mount(Button, { slots: { default: '<span class="inner-slot"></span>' } }) 创建一个 Button 组件的包装器
  // 并使用 await wrapper.find('.inner-slot').trigger('click') 触发内部元素的 click 事件，并使用 expect(wrapper.emitted()).toBeDefined() 断言该事件是否被正确地触发了。
  it('handle click inside', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: '<span class="inner-slot"></span>',
      },
    })

    await wrapper.find('.inner-slot').trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })
})
```

当热，我们这里也做了 `tsx` 的支持，不过，我们希望您尽量使用 `ts` 的方式来做到风格统一。

```plaintext
以下对一些测试的语法进行解释
1. describe：用于定义一个测试套件，可以包含多个相关的测试用例。它接受两个参数：描述测试套件的字符串和一个包含测试用例的回调函数。
2. it 或 test：用于定义一个测试用例，描述了要测试的功能或行为。它接受两个参数：描述测试用例的字符串和一个包含测试代码的回调函数。
3. expect：用于进行断言，判断实际结果是否与预期结果相符。通常与其他匹配器（matchers）一起使用，比如.toBe()、.toContain()等，根据不同的情况选择合适的匹配器来进行断言。
4. mount：这是一个测试工具库中的函数，用于创建被测试组件的包装器。它接受两个参数：要测试的组件和一个包含组件配置选项的对象。返回一个包含被测试组件的包装器，可以通过该包装器来访问和操作组件。
5. wrapper：这是通过mount函数创建的组件包装器对象，用于访问和操作被测试组件的属性、方法和DOM元素。
6. .classes()：用于获取组件包装器上的CSS类列表。
7. .toContain()：用于断言某个值是否包含在特定的数组、字符串或对象中。
8. .emitted()：用于检查是否已经触发了特定的事件，并能够访问事件的参数和次数。
9. .trigger()：用于触发组件上的事件，例如点击事件、输入事件等。
```

最后我们终端输入 `pnpm run test` 即可

## 最后

我们希望您在进行组件开发的过程中，可以对自己的组件进行单测，然后再进行提交，如果您在测试方面有什么问题的话，可以在群里询问~

当然，这个文档我还会继续完善，因为有些组件是比`button`要复杂的，所以还有一些用法我会持续地进行补充~

如果我发现了较好的测试文章，我会挂在这里，供大家学习，也欢迎大家联系我探讨测试的知识~
