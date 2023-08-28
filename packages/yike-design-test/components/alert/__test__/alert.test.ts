import { mount } from '@vue/test-utils';
import YkAlert from '../../../../yike-design-ui/src/components/alert/src/alert.vue';

describe('YkAlert', () => {
  // 测试 Alert 组件能否正确地渲染出不同的样式、内容和功能
  it('renders correctly with props', () => {
    const wrapper = mount(YkAlert, {
      props: {
        type: 'success',
        title: 'Success Alert',
        message: 'This is a success alert message.',
        closable: true,
        showIcon: false,
        center: true,
        banner: true,
      },
    });

    // 验证 Alert 组件是否渲染出正确的样式类
    expect(wrapper.find('.yk-alert').classes()).toContain('yk-alert-success');

    // 验证 Alert 组件是否正确渲染出标题和描述
    expect(wrapper.find('.yk-alert-title').text()).toBe('Success Alert');
    expect(wrapper.find('.yk-alert-description').text()).toBe(
      'This is a success alert message.',
    );

    // 验证 Alert 组件是否正确渲染出关闭按钮
    expect(wrapper.find('.yk-alert-close-icon').exists()).toBe(true);

    // 验证 Alert 组件是否正确渲染出图标
    expect(wrapper.find('.yk-alert-icon').exists()).toBe(false);

    // 验证 Alert 组件是否渲染出带标题的样式类
    expect(wrapper.find('.yk-alert').classes()).toContain(
      'yk-alert-with-title',
    );

    // 验证 Alert 组件是否渲染出居中显示的样式类
    expect(wrapper.find('.yk-alert').classes()).toContain('yk-alert-center');

    // 验证 Alert 组件是否渲染出横幅式的样式类
    expect(wrapper.find('.yk-alert').classes()).toContain('yk-alert-banner');
  });

  // 测试 Alert 组件的关闭事件是否能够正确地触发
  it('emits', async () => {
    const wrapper = mount(YkAlert, {
      props: {
        closable: true,
      },
    });

    // 触发 Alert 组件的关闭按钮的点击事件
    await wrapper.find('.yk-alert-close-icon').trigger('click');

    // 验证 Alert 组件是否正确地触发了关闭事件
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  // 测试 Alert 组件在关闭按钮不显示时是否能够正确地隐藏该元素
  it('does not render the close button when "closable" prop is false', () => {
    const wrapper = mount(YkAlert, {
      props: {
        closable: false,
      },
    });

    // 验证 Alert 组件是否正确地隐藏了关闭按钮
    expect(wrapper.find('.yk-alert-close-icon').exists()).toBe(false);
  });

  // 测试 Alert 组件在图标显示时是否能够正确地渲染出该元素
  it('renders the icon when "showIcon" prop is true', () => {
    const wrapper = mount(YkAlert, {
      props: {
        showIcon: true,
        type: 'warning',
      },
    });

    // 验证 Alert 组件是否正确地渲染出了图标
    expect(wrapper.find('.yk-alert-icon').exists()).toBe(true);
  });

  // 测试 Alert 组件在图标不显示时是否能够正确地隐藏该元素
  it('does not render the icon when "showIcon" prop is false', () => {
    const wrapper = mount(YkAlert, {
      props: {
        showIcon: false,
        type: 'warning',
      },
    });

    // 验证 Alert 组件是否正确地隐藏了图标
    expect(wrapper.find('.yk-alert-icon').exists()).toBe(false);
  });
});
