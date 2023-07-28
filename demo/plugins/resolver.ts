import { ComponentResolver } from 'unplugin-vue-components/types';

function sideEffects(from: string) {
  return `${from}/style/index`;
}

const kebabize = (str: string) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
  );

// 当一个组件目录导出多个组件时，需要维护这样一个匹配列表
const matchComponents = [
  {
    pattern: /^(YkText|YkTitle|YkParagraph)/,
    componentDir: 'typography',
  },
  {
    pattern: /^(YkRadio|YkRadioGroup)/,
    componentDir: 'radio',
  },
  {
    pattern: /^(YkCheckbox|YkCheckboxGroup)/,
    componentDir: 'checkbox',
  },
  {
    pattern: /^(YkAvatar|YkAvatarGroup)/,
    componentDir: 'avatar',
  },
];

export const YikeDevResolver: ComponentResolver = (componentName) => {
  if (componentName.startsWith('Yk')) {
    let componentDir = kebabize(componentName.slice(2));
    for (const item of matchComponents) {
      if (item.pattern.test(componentName)) {
        componentDir = item.componentDir;
        break;
      }
    }
    const from = `../packages/yike-design-ui/src/index.ts`;
    return {
      name: componentName,
      from,
      sideEffects: sideEffects(
        `../packages/yike-design-ui/src/components/${componentDir}`,
      ),
    };
  }
  if (componentName.startsWith('Icon')) {
    return {
      name: componentName,
      from: '../packages/yike-design-ui/src/components/svg-icon/index.ts',
    };
  }
};
