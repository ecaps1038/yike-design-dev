import { mount } from '@vue/test-utils';
import YkProgress from '../../../../yike-design-ui/src/components/progress/src/progress.vue';

describe('YkProgress', () => {
  // 线形进度条
  it('render line', () => {
    const wrapper = mount(YkProgress, {
      props: {
        type: 'line',
        percent: 50,
        strokeColor: '#e8e8e8',
        size: 'm',
        status: 'normal',
        showText: true,
      },
    });

    const progressLineWrapper = wrapper.find('.yk-progress-line-wrapper');
    expect(progressLineWrapper.exists()).toBe(true);

    const progressInner = wrapper.find('.yk-progress-inner');
    expect(progressInner.exists()).toBe(true);

    expect(progressInner.classes()).not.toContain('yk-progress-circle');

    const progressText = wrapper.find('.yk-progress-text');
    expect(progressText.exists()).toBe(true);

    const slotContent = wrapper.find('.yk-progress-text > div:first-child');
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe('50%');

    const svgElement = wrapper.find('svg');
    expect(svgElement.exists()).toBe(false);
  });

  // 渲染环形进度条
  it('render circle', () => {
    const wrapper = mount(YkProgress, {
      props: {
        type: 'circle',
        percent: 75,
        strokeColor: '#e8e8e8',
        size: 'm',
        status: 'normal',
        showText: true,
      },
    });

    const progressCircleWrapper = wrapper.find('.yk-progress-circle-wrapper');
    expect(progressCircleWrapper.exists()).toBe(true);
    // 环形的有svg
    const svgElement = wrapper.find('svg');
    expect(svgElement.exists()).toBe(true);
    // m号是64px
    expect(svgElement.attributes().style).toContain(
      'width: 64px; height: 64px',
    );

    const progressCircle = wrapper.findAll('.yk-progress-circle');
    expect(progressCircle.length).toBe(2);

    const slotContent = wrapper.find(
      '.yk-progress-circle-text > div:last-child',
    );
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe('75%');
  });
});
