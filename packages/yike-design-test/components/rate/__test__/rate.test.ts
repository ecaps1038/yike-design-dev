// 引入 mount 方法和组件
import { mount } from '@vue/test-utils';
import YkRate from '../../../../yike-design-ui/src/components/rate/src/rate.vue';

// 测试用例
describe('YkRate', () => {
  // 渲染组件
  it('render', () => {
    const wrapper = mount(YkRate);
    expect(wrapper.exists()).toBe(true);
  });

  // 显示正确数量的星星
  it('number', () => {
    const wrapper = mount(YkRate, {
      props: {
        count: 5,
      },
    });
    expect(wrapper.findAll('.yk-rate-icon')).toHaveLength(5);
  });

  // 在单击时更新 modelValue
  it('update', async () => {
    const wrapper = mount(YkRate, {
      props: {
        count: 5,
        modelValue: 1,
      },
    });
    const icon = wrapper.find('.yk-rate-icon');
    expect(icon.exists()).toBe(true);

    await icon.trigger('click'); // 触发点击事件

    await wrapper.vm.$nextTick(); // 等待 Vue 实例更新

    // 修改下面的断言，确保事件触发和属性更新正确
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
  });

  // 正确显示选中的星星数量
  it('number of selected stars', async () => {
    const wrapper = mount(YkRate, {
      props: {
        count: 5,
        modelValue: 3,
      },
    });
    await wrapper.vm.$nextTick(); // 等待 Vue 实例更新
    expect(wrapper.findAll('.yk-rate-icon--select')).toHaveLength(3);
  });

  // 正确显示半选的星星数量
  it('number of half stars', async () => {
    const wrapper = mount(YkRate, {
      props: {
        count: 5,
        modelValue: 3.5,
      },
    });
    await wrapper.vm.$nextTick(); // 等待 Vue 实例更新
    // 传了3.5，则应该.yk-rate-half--select半颗星星应该有一个
    expect(wrapper.findAll('.yk-rate-half--select')).toHaveLength(1);
  });

  // 在单击时清除选中的星星数量，当 allowClear 为 true 时
  it('allowClear', async () => {
    const wrapper = mount(YkRate, {
      props: {
        count: 5,
        allowClear: true,
        modelValue: 3,
      },
    });
    await wrapper.vm.$nextTick(); // 等待 Vue 实例更新
    const selectedIcon = wrapper.find('.yk-rate-icon--select');
    expect(selectedIcon.exists()).toBe(true); // 验证已选中星星元素存在
    await selectedIcon.trigger('click'); // 触发点击事件
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]);
  });

  // 在只读模式下正确显示星星数量
  it('readonly', async () => {
    const wrapper = mount(YkRate, {
      props: {
        count: 5,
        readonly: true,
      },
    });
    expect(wrapper.classes()).toContain('yk-rate-readonly');
  });

  // 在禁用模式下正确显示星星数量
  it('disabled', async () => {
    const wrapper = mount(YkRate, {
      props: {
        count: 5,
        disabled: true,
      },
    });
    expect(wrapper.classes()).toContain('yk-rate-disabled');
  });
});
