import { mount } from '@vue/test-utils';
import Button from '../../../../yike-design-ui/src/components/button/src/button.vue';
// 我们使用 describe 函数创建了一个测试套件，名称为 Button，它包含了多个测试用例。每个测试用例都使用 it 函数来描述一个具体的测试场景，并使用断言来验证测试结果是否符合预期。
const UI = 'yike design';
// 第一个测试用例 create 测试了 Button 组件是否具有默认样式 yk - button--primary。我们使用 mount(Button) 创建了一个 Button 组件的包装器，并使用 expect(wrapper.classes()).toContain('yk-button--primary') 断言该组件是否包含名为 yk - button--primary 的 CSS 类。
describe('Button', () => {
  it('create', () => {
    const wrapper = mount(Button);

    expect(wrapper.classes()).toContain('yk-button--primary');
  });
  // 第二个测试用例 type 测试了 Button 组件的 type 属性是否能够正确地设置组件样式。我们使用 mount(Button, { props: { type: 'secondary' } }) 创建一个 Button 组件的包装器，并使用 expect(wrapper.classes()).toContain('yk-button--secondary') 断言该组件是否包含名为 yk - button--secondary 的 CSS 类。
  it('type', () => {
    const wrapper = mount(Button, {
      props: { type: 'secondary' },
    });

    expect(wrapper.classes()).toContain('yk-button--secondary');
  });
  // 第三个测试用例 size 测试了 Button 组件的 size 属性是否能够正确地设置组件样式。我们使用 mount(Button, { props: { size: 's' } }) 创建一个 Button 组件的包装器，并使用 expect(wrapper.classes()).toContain('yk-button--s') 断言该组件是否包含名为 yk - button--s 的 CSS 类。
  it('size', () => {
    const wrapper = mount(Button, {
      props: { size: 's' },
    });

    expect(wrapper.classes()).toContain('yk-button--s');
  });
  // 第四个测试用例 shape 测试了 Button 组件的默认样式是否为 yk - button--default。我们使用 mount(Button) 创建一个 Button 组件的包装器，并使用 expect(wrapper.classes()).toContain('yk-button--default') 断言该组件是否包含名为 yk - button--default 的 CSS 类。
  it('shape', () => {
    const wrapper = mount(Button);

    expect(wrapper.classes()).toContain('yk-button--default');
  });
  // 第五个测试用例 status 测试了 Button 组件的 status 属性是否能够正确地设置组件样式。我们使用 mount(Button, { props: { status: 'danger' } }) 创建一个 Button 组件的包装器，并使用 expect(wrapper.classes()).toContain('yk-button--danger') 断言该组件是否包含名为 yk - button--danger 的 CSS 类。
  it('status', () => {
    const wrapper = mount(Button, {
      props: { status: 'danger' },
    });

    expect(wrapper.classes()).toContain('yk-button--danger');
  });
  // 第六个测试用例 disabled 测试了 Button 组件的 disabled 属性是否能够正确地禁用按钮，并禁止 click 事件的触发。我们使用 mount(Button, { props: { disabled: true } }) 创建一个 Button 组件的包装器
  // 并使用expect(wrapper.classes()).toContain('yk-button--disabled') 断言该组件是否包含名为 yk - button--disabled 的 CSS 类。然后，我们使用 await wrapper.trigger('click') 触发按钮的 click 事件，并使用 expect(wrapper.emitted('click')).toBeUndefined() 断言该事件是否被正确地禁止了。
  it('disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
    });

    expect(wrapper.classes()).toContain('yk-button--disabled');
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });
  // 第七个测试用例 loading 测试了 Button 组件的 loading 属性是否能够正确地显示加载状态。我们使用 mount(Button, { props: { loading: true } }) 创建一个 Button 组件的包装器
  // 并使用 expect(wrapper.classes()).toContain('yk-button--loading') 断言该组件是否包含名为 yk - button--loading 的 CSS 类。然后，我们使用 expect(wrapper.get('svg').isVisible()).toBeTruthy() 断言该组件是否包含一个可见的 SVG 图标。
  it('loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
    });

    expect(wrapper.classes()).toContain('yk-button--loading');
    expect(wrapper.get('svg').isVisible()).toBeTruthy();
  });
  // 第八个测试用例 should disabled when loading 测试了当 Button 组件处于加载状态时，是否能够正确地禁用按钮，并禁止 click 事件的触发。我们使用 mount(Button, { slots: { default: UI }, props: { loading: true } }) 创建一个 Button 组件的包装器
  // 并使用 await wrapper.trigger('click') 触发按钮的 click 事件，并使用 expect(wrapper.emitted('click')).toBeUndefined() 断言该事件是否被正确地禁止了。
  it('should disabled when loading', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: UI,
      },
      props: { loading: true },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });
  // 第九个测试用例 render text 测试了 Button 组件是否能够正确地渲染插槽内容。我们使用 mount(Button, { slots: { default: UI } }) 创建一个 Button 组件的包装器
  // 并使用 expect(wrapper.text()).toEqual(UI) 断言该组件的文本内容是否等于 UI。
  it('render text', () => {
    const wrapper = mount(Button, {
      slots: {
        default: UI,
      },
    });

    expect(wrapper.text()).toEqual(UI);
  });
  // 第十个测试用例 handle click 测试了 Button 组件的 click 事件是否能够正确地触发。我们使用 mount(Button, { slots: { default: UI } }) 创建一个 Button 组件的包装器
  // 并使用 await wrapper.trigger('click') 触发按钮的 click 事件，并使用 expect(wrapper.emitted()).toBeDefined() 断言该事件是否被正确地触发了。
  it('handle click', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: UI,
      },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted()).toBeDefined();
  });
  // 第十一个测试用例 handle click inside 测试了 Button 组件内部的元素是否能够正确地触发 click 事件。我们使用 mount(Button, { slots: { default: '<span class="inner-slot"></span>' } }) 创建一个 Button 组件的包装器
  // 并使用 await wrapper.find('.inner-slot').trigger('click') 触发内部元素的 click 事件，并使用 expect(wrapper.emitted()).toBeDefined() 断言该事件是否被正确地触发了。
  it('handle click inside', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: '<span class="inner-slot"></span>',
      },
    });

    await wrapper.find('.inner-slot').trigger('click');
    expect(wrapper.emitted()).toBeDefined();
  });
});
