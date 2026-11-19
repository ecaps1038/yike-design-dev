import { matchComponents } from './yike';

function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim();
  return result.split(' ').join('-').toLowerCase();
}

/**
 * 根据组件名找到对应的组件目录。
 * 优先走 matchComponents（处理 TableColumn、AvatarGroup 这类子组件），
 * 未命中时按命名约定推导，例如 `YkFooBar` -> `foo-bar`。
 */
export function getComponentDir(importName: string) {
  for (const item of matchComponents) {
    if (item.pattern.test(importName)) {
      return item.componentDir;
    }
  }
  const componentDir = kebabCase(importName);
  return componentDir.startsWith('yk-') ? componentDir.slice(3) : componentDir;
}

/** 生产环境：按需引入的组件样式入口（css） */
export function sideEffects(importName: string) {
  return `@yike-design/ui/es/components/${getComponentDir(
    importName,
  )}/style/css.js`;
}

/** 开发环境（workspace 源码调试）：按需引入的组件样式入口（less） */
export function sideDevEffects(importName: string) {
  return `@yike-design/ui/components/${getComponentDir(
    importName,
  )}/style/index.less`;
}

const yikeSrcPath = '@yike-design/ui';

/**
 * 开发环境 resolver：直接从 workspace 源码入口导入，便于调试组件源码。
 * 仅用于本仓库 demo / 本地联调，发布包使用者请使用 `YikeResolver`。
 */
export function YikeDevResolver(compName: string) {
  if (compName.startsWith('Icon')) {
    return {
      name: compName,
      from: `${yikeSrcPath}/components/svg-icon`,
    };
  }

  // YkIcon 不是对外导出的组件，图标统一使用 IconXxx（svg-icon）
  if (compName === 'YkIcon') return null;

  if (compName.startsWith('Yk')) {
    return {
      name: compName,
      from: `${yikeSrcPath}/index.ts`,
      sideEffects: sideDevEffects(compName),
    };
  }

  return null;
}

/**
 * 生产环境 resolver：从构建产物 `es` 导入组件，并自动引入对应样式。
 */
export function YikeResolver(compName: string) {
  if (compName.startsWith('Icon')) {
    return {
      name: compName,
      from: `${yikeSrcPath}/es/components/svg-icon`,
    };
  }

  if (compName === 'YkIcon') return null;

  if (compName.startsWith('Yk')) {
    return {
      name: compName,
      from: `${yikeSrcPath}/es`,
      sideEffects: sideEffects(compName),
    };
  }

  return null;
}
