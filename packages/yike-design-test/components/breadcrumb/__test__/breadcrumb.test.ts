import { mount } from '@vue/test-utils';
import YkBreadcrumb from '../../../../yike-design-ui/src/components/breadcrumb/src/breadcrumb.vue';
import YkBreadcrumbItem from '../../../../yike-design-ui/src/components/breadcrumb/src/breadcrumb-item.vue';

describe('YkBreadcrumb', () => {
  // 测试是否能正确渲染子组件
  it('render', () => {
    const wrapper = mount(YkBreadcrumb, {
      slots: {
        default: '<div>Test Slot Content</div>',
      },
    });

    expect(wrapper.html()).toContain('Test Slot Content');
  });

  // 测试是否能正确提供属性和插槽
  it('props and slots', () => {
    const wrapper = mount(YkBreadcrumb, {
      propsData: {
        separator: '>',
      },
      slots: {
        default: YkBreadcrumbItem,
      },
    });

    expect(wrapper.findComponent(YkBreadcrumbItem).vm.separator).toBe('>');
  });
});
