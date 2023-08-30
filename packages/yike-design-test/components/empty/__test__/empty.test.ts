import { mount } from '@vue/test-utils';
import YkEmpty from '../../../../yike-design-ui/src/components/empty/src/empty.vue';

describe('YkEmpty', () => {
  it('renders default description when no slot content is provided', () => {
    const wrapper = mount(YkEmpty);

    // 验证默认描述文本是否正确渲染
    expect(wrapper.find('.yk-empty__description p').text()).toBe('No Data');
  });

  it('slot', () => {
    const wrapper = mount(YkEmpty, {
      slots: {
        image: '<img src="custom-image.png" />',
      },
    });

    // 验证自定义图像是否正确渲染
    expect(wrapper.find('.yk-empty__image img').exists()).toBe(true);
    expect(wrapper.find('.yk-empty__image img').attributes('src')).toBe(
      'custom-image.png',
    );
  });

  it('no image and type is primary', () => {
    const wrapper = mount(YkEmpty, {
      props: {
        type: 'primary',
      },
    });

    // 验证主要类型图标是否正确渲染
    expect(wrapper.find('.primary').exists()).toBe(true);
  });

  it('no image and type is secondary', () => {
    const wrapper = mount(YkEmpty, {
      props: {
        type: 'secondary',
      },
    });

    // 验证次要类型图标是否正确渲染
    expect(wrapper.find('.secondary').exists()).toBe(true);
  });

  it('bottom slot', () => {
    const wrapper = mount(YkEmpty, {
      slots: {
        default: '<button>Retry</button>',
      },
    });

    // 验证插槽内容是否正确渲染在底部插槽中
    expect(wrapper.find('.yk-empty__bottom button').exists()).toBe(true);
    expect(wrapper.find('.yk-empty__bottom button').text()).toBe('Retry');
  });
});
