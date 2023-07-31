import { mount } from '@vue/test-utils';
import YkBadge from '../../../../yike-design-ui/src/components/badge/src/badge.vue';

describe('YkBadge', () => {
  it('is-dot is true and not hidden', () => {
    const wrapper = mount(YkBadge, {
      props: {
        isDot: true,
        hidden: false,
      },
    });

    // 验证是否渲染了红点样式
    expect(wrapper.find('.yk-badge__dot').exists()).toBe(true);
  });

  it('count and not hidden', () => {
    const wrapper = mount(YkBadge, {
      props: {
        count: 10,
        hidden: false,
      },
    });

    // 验证是否正确渲染了数字计数
    expect(wrapper.find('.yk-badge__count').exists()).toBe(true);
    expect(wrapper.find('.yk-badge__count').text()).toBe('10');
  });

  it('hide dot', () => {
    const wrapper = mount(YkBadge, {
      props: {
        isDot: true,
        hidden: true,
      },
    });

    // 验证是否隐藏了红点样式
    expect(wrapper.find('.yk-badge__dot').exists()).toBe(false);
  });

  it('hide count', () => {
    const wrapper = mount(YkBadge, {
      props: {
        count: 0,
        showZero: false,
      },
    });

    // 验证是否隐藏了数字计数
    expect(wrapper.find('.yk-badge__count').exists()).toBe(false);
  });

  it('hides count when negative', () => {
    const wrapper = mount(YkBadge, {
      props: {
        count: -5,
      },
    });

    // 验证是否隐藏了数字计数
    expect(wrapper.find('.yk-badge__count').exists()).toBe(false);
  });
});
