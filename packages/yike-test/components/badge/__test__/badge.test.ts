import { mount } from '@vue/test-utils';
import Badge from '../../../../yike-design-ui/src/components/badge/src/badge.vue';

describe('Badge', () => {
  // 测试徽标默认渲染情况
  it('renders the badge by default', () => {
    const wrapper = mount(Badge);

    // 断言是否正确渲染了徽标容器
    expect(wrapper.find('#yk-badge').exists()).toBe(true);
  });

  // 测试带计数的徽标渲染情况
  it('renders the badge with count', async () => {
    const wrapper = mount(Badge, {
      props: { count: 5 },
    });

    // 断言徽标元素是否可见
    expect(wrapper.find('.yk-badge').isVisible()).toBe(true);
    // 断言计数文本是否正确显示
    expect(wrapper.find('.count').text()).toBe('5');
  });

  // 测试超过最大限制的计数显示情况
  it('renders the badge with max count', async () => {
    const wrapper = mount(Badge, {
      props: { count: 100, max: 99 },
    });

    // 断言计数文本是否正确显示为最大限制值加上'+'
    expect(wrapper.find('.count').text()).toBe('99+');
  });

  // 测试是否正确设置徽标样式
  it('renders the badge with custom styles', async () => {
    const wrapper = mount(Badge, {
      props: { color: 'red', border: 2 },
    });

    // 断言徽标容器的背景颜色和边框宽度是否正确设置
    expect(wrapper.find('.yk-badge').attributes().style).toContain(
      'background-color: red;',
    );
    expect(wrapper.find('.yk-badge').attributes().style).toContain(
      'border-width: 2px;',
    );
  });
});
