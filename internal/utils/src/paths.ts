import { resolve } from 'path';

// rootPath => yike-design-dev 根目录
export const rootPath = process.cwd();
export const resolvePath = (...p: string[]) => resolve(rootPath, ...p);

// packages
export const packagePath = resolvePath('packages');
export const iconsPath = resolve(packagePath, 'icons');
export const stylesPath = resolve(packagePath, 'styles');
export const componentsPath = resolve(packagePath, 'components');
export const yikePath = resolve(packagePath, 'yike-design-ui');

// internal
export const internalPath = resolvePath('internal');
export const buildPath = resolve(internalPath, 'build');
export const scriptsPath = resolve(internalPath, 'scripts');
export const templatesPath = resolve(internalPath, 'templates');
export const utilsPath = resolve(internalPath, 'utils');

// demo
export const demoPath = resolvePath('demo');
export const demoSrcPath = resolve(demoPath, 'src');
export const examplePath = resolve(demoSrcPath, 'examples');
export const routerPath = resolve(demoSrcPath, 'router');
