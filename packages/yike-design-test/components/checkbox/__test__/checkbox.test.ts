import { mount } from '@vue/test-utils';
import YkCheckbox from '../../../../yike-design-ui/src/components/checkbox/src/checkbox.vue';

describe('YkCheckbox', () => {
  // 根据 checked 属性确定选中状态
  it('checked', async () => {
    const wrapper = mount(YkCheckbox, {
      props: {
        value: 'Option 2',
        checked: true,
      },
    });

    const input = wrapper.find('input');
    expect(input.element.checked).toBe(true);

    await wrapper.setProps({ checked: false });
    expect(input.element.checked).toBe(false);
  });
  // 禁用状态
  it('disabled', async () => {
    const wrapper = mount(YkCheckbox, {
      props: {
        disabled: true,
      },
    });

    const input = wrapper.find('input');
    expect(input.element.disabled).toBe(true);
    expect(wrapper.classes()).toContain('yk-checkbox--disabled');

    await wrapper.setProps({ disabled: false });
    expect(input.element.disabled).toBe(false);
    expect(wrapper.classes()).not.toContain('yk-checkbox--disabled');
  });

  it('change', async () => {
    const wrapper = mount(YkCheckbox, {
      props: {
        value: 'Option 1',
        disabled: false,
      },
    });

    const input = wrapper.find('input');
    await input.trigger('change');

    expect(wrapper.emitted('change')).toBeTruthy();
  });
});
