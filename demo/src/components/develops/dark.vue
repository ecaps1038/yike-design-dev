<template>
  <div class="module">
    <div class="top-title">
      <yk-title>暗黑模式</yk-title>
      <yk-text>
        既然这个主题这么优雅，那么我也在整套组件库加入了暗黑模式。
      </yk-text>
    </div>
    <yk-title :level="3">加载暗黑模式</yk-title>
    <yk-paragraph type="secondary">
      内部已将暗黑模式封装为
      <yk-text type="primary">yk-theme</yk-text>
      组件，可以按组件形式引入该组件使用，组件默认跟随系统主题切换
      。默认设有开关，本文档顶部的“太阳”和“月亮”就是该组件的一个展示模式。您可以点击看效果。
    </yk-paragraph>
    <yk-title :level="3">模式行为</yk-title>
    <yk-paragraph type="secondary">
      暗黑模式也是主题的一种，我们应该根据用户喜好做到最自由的搭配，我们遵从用户自由搭配和使用该两套主题。
    </yk-paragraph>
    <yk-title :level="3">颜色</yk-title>
    <yk-paragraph type="secondary">
      我们因遵从视觉直觉，暗黑模式下的信息内容需要和浅色模式保持一致性，不应该打破原有的层级关系。
    </yk-paragraph>

    <div class="colorss">
      <div class="light">
        <yk-space size="l">
          <yk-space size="m">
            <div class="color p"></div>
            <div class="color l"></div>
            <div class="color s"></div>
            <div class="color w"></div>
            <div class="color e"></div>
          </yk-space>
          <yk-space size="m">
            <div class="color d1"></div>
            <div class="color d2"></div>
            <div class="color d3"></div>
            <div class="color d4"></div>
            <div class="color d5"></div>
            <div class="color d6"></div>
            <div class="color d7"></div>
            <div class="color d8"></div>
          </yk-space>
        </yk-space>
      </div>
      <div class="dark">
        <yk-space size="l">
          <yk-space size="m">
            <div class="color p"></div>
            <div class="color l"></div>
            <div class="color s"></div>
            <div class="color w"></div>
            <div class="color e"></div>
          </yk-space>
          <yk-space size="m">
            <div class="color d1"></div>
            <div class="color d2"></div>
            <div class="color d3"></div>
            <div class="color d4"></div>
            <div class="color d5"></div>
            <div class="color d6"></div>
            <div class="color d7"></div>
            <div class="color d8"></div>
          </yk-space>
        </yk-space>
      </div>
    </div>
    <yk-title :level="3">API</yk-title>
    <yk-paragraph type="secondary">
      yk-theme主题组件设有两个变量，分别skin、control。两个相互联系配合完成对主题的控制。其中
      skin 控制模式主题，control 控制是否显示“太阳”和“月亮”组件
    </yk-paragraph>
    <yk-title :level="4">控制</yk-title>
    <yk-paragraph type="secondary">
      skin有三种模式，分别为：auto、light、dark，默认为
      auto；control为boolean属性值，默认为 true
    </yk-paragraph>
    <codes-vue :code="datas[0]" />
    <yk-title :level="3">源码原理</yk-title>
    <yk-paragraph type="secondary">
      源码中可以看到针对各模式下设置一套颜色变量。在此您可以根据设计需求进行自己调整或增减颜色变量。代码在
      <yk-text type="primary">yike-design-ui</yk-text>
      ->
      <yk-text type="primary">src</yk-text>
      ->
      <yk-text type="primary">styles</yk-text>
      ->
      <yk-text type="primary">theme.less</yk-text>
    </yk-paragraph>
    <codes-vue :code="datas[1]" />
  </div>
</template>
<script setup lang="ts">
import codesVue from '@/components/Codes.vue'
const datas = [
  `<yk-theme/> //默认跟随系统颜色，并显示控制主题的“太阳”和“月亮”控件
<yk-theme :control='false'/> //默认跟随系统颜色，不显示控制主题的“太阳”和“月亮”控件
<yk-theme skin='light'/> //默认浅色颜色模式，并显示控制主题的“太阳”和“月亮”控件
<yk-theme skin='light' :control='false'/> //保持默认浅色模式，不显示控制主题的“太阳”和“月亮”控件
 `,
  `//默认
:root {
  // -------- Functional color light -----------
  --pcolor: palette(@pcolor-light); // 全局主色
  --lcolo: palette(@lcolor-light); // 链接色
  --scolor: palette(@scolor-light); // 成功色
  --wcolor: palette(@wcolor-light); // 警告色
  --ecolor: palette(@ecolor-light); // 错误色

  //----中性色----
  --gray1: palette(@gray1);
  --gray2: palette(@gray2);
  --gray3: palette(@gray3);
  --gray4: palette(@gray4);
  --gray7: palette(@gray7);
  --gray8: palette(@gray8);
  --gray9: palette(@gray9);
  --gray10: palette(@gray10);
  --gray5: palette(@gray1);
  --gray6: palette(@gray10);
}

// 亮色主题
[data-theme='light'] {
  // -------- Functional color light -----------
  --pcolor: palette(@pcolor-light); // 全局主色
  --lcolo: palette(@lcolor-light); // 链接色
  --scolor: palette(@scolor-light); // 成功色
  --wcolor: palette(@wcolor-light); // 警告色
  --ecolor: palette(@ecolor-light); // 错误色

  //----中性色----
  --gray1: palette(@gray1);
  --gray2: palette(@gray2);
  --gray3: palette(@gray3);
  --gray4: palette(@gray4);
  --gray7: palette(@gray7);
  --gray8: palette(@gray8);
  --gray9: palette(@gray9);
  --gray10: palette(@gray10);
  --gray5: palette(@gray1);
  --gray6: palette(@gray10);
}
// 暗色主题
[data-theme='dark'] {
  // -------- Functional color light -----------
  --pcolor: palette(@pcolor-dark); // 全局主色
  --lcolo: palette(@lcolor-dark); // 链接色
  --scolor: palette(@scolor-dark); // 成功色
  --wcolor: palette(@wcolor-dark); // 警告色
  --ecolor: palette(@ecolor-dark); // 错误色

  //----中性色----
  --gray1: palette(@gray10);
  --gray2: palette(@gray9);
  --gray3: palette(@gray8);
  --gray4: palette(@gray7);
  --gray7: palette(@gray4);
  --gray8: palette(@gray3);
  --gray9: palette(@gray2);
  --gray10: palette(@gray1);
  --gray5: palette(@gray3);
  --gray6: palette(@gray2);
}
`,
]
</script>
<style scoped lang="less">
.colorss {
  background-color: #fff;
  border-radius: @radius-m;
  border: 1px solid @line-color-s;
  max-width: 1000px;
  overflow: hidden;
  .light,
  .dark {
    padding: 20px;
  }
  .light {
    .p {
      background-color: @pcolor-light;
    }
    .l {
      background-color: @lcolor-light;
    }
    .s {
      background-color: @scolor-light;
    }
    .w {
      background-color: @wcolor-light;
    }
    .e {
      background-color: @ecolor-light;
    }
    .d1 {
      background-color: @gray10;
      border: 1px solid @gray7;
    }
    .d2 {
      background-color: @gray9;
    }
    .d3 {
      background-color: @gray8;
    }
    .d4 {
      background-color: @gray7;
    }
    .d5 {
      background-color: rgba(@gray1, 0.24);
    }
    .d6 {
      background-color: rgba(@gray1, 0.32);
    }
    .d7 {
      background-color: rgba(@gray1, 0.56);
    }
    .d8 {
      background-color: rgba(@gray1, 0.8);
    }
  }
  .dark {
    background-color: #000;
    .p {
      background-color: @pcolor-dark;
    }
    .l {
      background-color: @lcolor-dark;
    }
    .s {
      background-color: @scolor-dark;
    }
    .w {
      background-color: @wcolor-dark;
    }
    .e {
      background-color: @ecolor-dark;
    }
    .d1 {
      background-color: @gray1;
    }
    .d2 {
      background-color: @gray2;
    }
    .d3 {
      background-color: @gray3;
    }
    .d4 {
      background-color: @gray4;
    }
    .d5 {
      background-color: rgba(@gray10, 0.24);
    }
    .d6 {
      background-color: rgba(@gray10, 0.32);
    }
    .d7 {
      background-color: rgba(@gray10, 0.56);
    }
    .d8 {
      background-color: rgba(@gray10, 0.8);
    }
  }
  .color {
    width: 40px;
    height: 40px;
    border-radius: @radius-s;
    background-color: #eee;
  }
}
</style>
