import path from 'path';

export const root = process.cwd();
export const resolvePath = (...p: any) => {
  return path.resolve(root, ...p);
};
export const componentSrc = path.resolve(root, './src');
export const iconSvgPath = path.resolve(process.cwd(), './src/icon');
export const iconComponents = path.resolve(root, './src/components/svg-icon');
