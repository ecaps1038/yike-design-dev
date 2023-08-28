import { mount } from '@vue/test-utils';
import input from '../../../../yike-design-ui/src/components/input/src/input.vue';

const text = 'oh my world';

describe('Input', () => {
  // 能否正常渲染基础输入框
  it('create', () => {
    const wrapper = mount(input);

    expect(wrapper.classes()).toContain('yk-input');
  });

  // 能否正常渲染指定大小的输入框
  it('size', () => {
    const wrapper = mount(input, {
      props: {
        size: 'xl',
      },
    });

    const inner = wrapper.find('.yk-input__inner');
    expect(inner.classes()).toContain('yk-input--xl');
  });

  // 能否正常渲染指定状态的输入框
  it('status', () => {
    const wrapper = mount(input, {
      props: {
        status: 'warning',
      },
    });

    const inner = wrapper.find('.yk-input__inner');
    expect(inner.classes()).toContain('yk-input--warning');
  });

  // 能否渲染加载指示器
  it('loading', () => {
    const wrapper = mount(input, {
      props: {
        loading: true,
      },
    });

    const spinner = wrapper.find('.yk-input__spinner');
    const inner = wrapper.find('.yk-input__inner');
    expect(spinner).not.toBeUndefined();
    expect(inner.classes()).toContain('yk-input--loading');
  });

  // 能否正常创建密码类型的输入框以及能否切换密码明文显示
  it('password type', async () => {
    const wrapper = mount(input, {
      props: {
        type: 'password',
        value: '1234',
      },
    });

    const switch_button = wrapper.find('#yki_switch');
    const input_widget = wrapper.find('input');
    expect(input_widget.attributes('type')).toBe('password');
    await switch_button.trigger('click');
    expect(input_widget.attributes('type')).toBe('text');
  });

  // 能否正常渲染占位文字和内容文字
  it('input value', () => {
    const wrapper = mount(input, {
      props: {
        value: text,
        placeholder: text,
      },
    });

    const input_widget = wrapper.find('input').element;
    expect(input_widget.value).toBe(text);
    expect(input_widget.placeholder).toBe(text);
  });

  // 能否正常禁用输入框
  it('disabled', () => {
    const wrapper = mount(input, {
      props: {
        disabled: true,
      },
    });

    const input_widget = wrapper.find('input').element;
    expect(input_widget.disabled).toBeTruthy();
  });

  // 能否正常渲染清空内容按钮 且能否正常清空内容
  it('clear button and its function', async () => {
    const wrapper = mount(input, {
      props: {
        clearable: true,
        value: text,
      },
    });

    const clear_button = wrapper.find('#yki_clear');
    const input_widget = wrapper.find('input');
    expect(clear_button).not.toBeUndefined();
    await clear_button.trigger('click');
    expect(input_widget.element.value).toBe('');
  });

  // 测试字数统计能否渲染、工作以及字数限制能否工作
  it('counter and limit', async () => {
    const wrapper = mount(input, {
      props: {
        showCounter: true,
        limit: 10,
        value: text,
      },
    });

    const counter = wrapper.find('.yk-input__counter');
    const input_widget = wrapper.find('input');
    expect(counter).not.toBeUndefined();
    expect(counter.element.innerHTML).toBe('<span>11</span><span> / 10</span>');
    // 向内部 input 派发 change 事件来触发字数限制的截取操作
    await input_widget.trigger('input');
    expect(input_widget.element.value).toBe('oh my worl');
  });

  // 测试emits事件是否都能正常触发（只测试基础事件）
  it('emits events', () => {
    const wrapper = mount(input);

    const input_widget = wrapper.find('input');
    input_widget.trigger('focus');
    expect(wrapper.emitted('focus')).toBeDefined();
    input_widget.trigger('blur');
    expect(wrapper.emitted('blur')).toBeDefined();
    input_widget.trigger('input');
    expect(wrapper.emitted('update:value')).toBeDefined();
  });

  // 能否正常渲染插槽内容
  it('slots', () => {
    const wrapper = mount(input, {
      slots: {
        prefix: '<p>Hello</p>',
        suffix: '<b>Hello</b>',
        prepend: '<mark>Hello</mark>',
        append: '<i>Hello</i>',
      },
    });

    const s1 = wrapper.find('p');
    const s2 = wrapper.find('b');
    const s3 = wrapper.find('mark');
    const s4 = wrapper.find('i');
    expect(s1).not.toBeUndefined();
    expect(s2).not.toBeUndefined();
    expect(s3).not.toBeUndefined();
    expect(s4).not.toBeUndefined();
  });

  // 测试文字提示能否正常显示
  it('tooltip', async () => {
    const wrapper = mount(input, {
      props: {
        tooltip: text,
      },
    });

    const input_widget = wrapper.find('input');
    const inner = wrapper.find('.yk-input__inner');
    await input_widget.trigger('focus');
    expect(inner.attributes('data-tooltip')).toBe(text);
  });
});
