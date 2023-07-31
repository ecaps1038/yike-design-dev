// 引入 mount 方法和组件
import { mount } from '@vue/test-utils';
import YkRadio from '../../../../yike-design-ui/src/components/radio/src/radio.vue';

describe('YkRadio', () => {
  it('render', () => {
    const wrapper = mount(YkRadio, {
      props: {
        label: 'Option 1',
        disabled: false,
      },
      slots: {
        default: 'Option 1',
      },
    });

    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.classes()).toContain('yk-radio');

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.element.type).toBe('radio');
    expect(input.element.value).toBe('Option 1');
    expect(input.element.disabled).toBe(false);

    const radioInner = wrapper.find('.yk-radio--inner');
    expect(radioInner.exists()).toBe(true);

    const labelText = wrapper.find('.yk-radio--label');
    expect(labelText.exists()).toBe(true);
    expect(labelText.text()).toBe('Option 1');
  });
  // 根据 modelValue 和 label 属性确定选中状态
  it('checked', async () => {
    const wrapper = mount(YkRadio, {
      props: {
        modelValue: 'Option 2',
        label: 'Option 2',
      },
    });

    const input = wrapper.find('input');
    expect(input.element.checked).toBe(true);

    await wrapper.setProps({ modelValue: 'Option 3' });
    expect(input.element.checked).toBe(false);
  });
  // 禁用状态'
  it('disabled', async () => {
    const wrapper = mount(YkRadio, {
      props: {
        disabled: true,
      },
    });

    const input = wrapper.find('input');
    expect(input.element.disabled).toBe(true);

    await wrapper.setProps({ disabled: false });
    expect(input.element.disabled).toBe(false);
  });
  // 触发 change 事件
  it('change', async () => {
    const wrapper = mount(YkRadio, {
      props: {
        label: 'Option 1',
        disabled: false,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('change');

    expect(wrapper.emitted('change')).toBeTruthy();
  });
});
