import { mount } from '@vue/test-utils';
import Switch from '../../../../yike-design-ui/src/components/switch/src/switch.vue';
describe('Switch', () => {
  it('render', () => {
    const wrapper = mount(Switch);

    expect(wrapper.vm.$el.tagName).toBe('BUTTON');
  });

  it('size', () => {
    const wrapper = mount(Switch, {
      props: {
        size: 's',
      },
    });

    expect(wrapper.classes()).toContain('yk-switch--s');
  });

  it('checked', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.classes()).toContain('yk-switch--checked');
  });

  it('loading', () => {
    const wrapper = mount(Switch, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.classes()).toContain('yk-switch--loading');
  });

  it('disable', () => {
    const wrapper = mount(Switch, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.props('disabled')).toBe(true);
  });

  it('emit', async () => {
    const wrapper = mount(Switch);

    await wrapper.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('emits a change event when clicked', async () => {
    const wrapper = mount(Switch);

    await wrapper.trigger('click');

    expect(wrapper.emitted('change')).toBeTruthy();
  });

  it('updates the model value when clicked', async () => {
    const wrapper = mount(Switch);

    await wrapper.trigger('click');

    expect(wrapper.vm.currentValue).toBeTruthy();
  });

  it('updates the button style when the model value changes', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        checkedColor: '#4DBA87',
        uncheckedColor: '#ccc',
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.vm.styles.backgroundColor).toBe('#4DBA87');
  });
});
