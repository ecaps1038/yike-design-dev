import path from 'path';

export const root = process.cwd();
export const resolvePath = (...p: any) => {
  return path.resolve(root, ...p);
};
export const componentSrc = path.resolve(root);
export const iconSvgPath = path.resolve(process.cwd(), './icon');
export const iconComponents = path.resolve(root, './components/svg-icon');
