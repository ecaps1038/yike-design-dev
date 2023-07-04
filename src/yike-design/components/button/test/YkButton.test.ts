import { mount } from '@vue/test-utils';
import YkButtonVue from '../YkButton.vue';

describe('YkButtonVue', () => {
  it('renders the button text correctly', () => {
    const buttonText = 'Click me';
    const wrapper = mount(YkButtonVue, {
      slots: {
        default: buttonText,
      },
    });

    expect(wrapper.text()).toBe(buttonText);
  });

  it('emits a click event when clicked', async () => {
    const wrapper = mount(YkButtonVue);

    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  // it('disables the button when disabled prop is true', () => {
  //   const wrapper = mount(YkButtonVue, {
  //     props: {
  //       disabled: true,
  //     },
  //   });

  //   expect(wrapper.attributes('disabled')).toBe('disabled');
  // });

  // it('applies the correct size class based on the size prop', () => {
  //   const wrapper = mount(YkButtonVue, {
  //     props: {
  //       size: 'l',
  //     },
  //   });

  //   expect(wrapper.classes()).toContain('l');
  // });

  // it('applies the correct type class based on the type prop', () => {
  //   const wrapper = mount(YkButtonVue, {
  //     props: {
  //       type: 'primary',
  //     },
  //   });

  //   expect(wrapper.classes()).toContain('primary');
  // });

});
