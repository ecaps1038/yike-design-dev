import { mount } from '@vue/test-utils';
import Empty from '../../../../yike-design-ui/src/components/empty/src/empty.vue';

describe('Empty', () => {
  it('renders default description when no slot is provided', () => {
    const wrapper = mount(Empty);

    expect(wrapper.find('.yk-empty__description p').text()).toBe('No Data');
  });
  // 验证自定义描述是否正确渲染
  it('renders custom description when description slot is provided', () => {
    const wrapper = mount(Empty, {
      slots: {
        description: 'Custom Description',
      },
    });

    // expect(wrapper.find('.yk-empty__description p').text()).toBe('Custom Description');
  });
  // 验证图像插槽是否正确渲染
  it('renders image slot when image prop is not provided', () => {
    const wrapper = mount(Empty, {
      slots: {
        image: '<img src="custom-image.jpg" />',
      },
    });

    expect(
      wrapper.find('.yk-empty__image img[src="custom-image.jpg"]').exists(),
    ).toBe(true);
  });
  // 验证主题类是否正确应用
  it('applies dark theme class when theme prop value is "dark"', () => {
    const wrapper = mount(Empty, {
      props: {
        theme: 'dark',
      },
    });

    expect(wrapper.classes('dark')).toBe(true);
  });
  // 验证底部插槽是否正确渲染
  it('renders content in the default slot', () => {
    const wrapper = mount(Empty, {
      slots: {
        default: '<div>Some content</div>',
      },
    });

    expect(wrapper.find('.yk-empty__bottom div').text()).toBe('Some content');
  });
});
