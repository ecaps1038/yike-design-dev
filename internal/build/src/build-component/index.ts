import fs from 'fs-extra';
import { glob } from 'fast-glob';
import { componentsPath, resolvePath } from '@yike/build-utils';

const sourceIconPath = '../components/svg-icon/icons.json';
const targetIconPath = '.es/components/svg-icon/icons.json';

export async function buildComponent() {
  const dirLists = ['es', 'lib', 'dist', sourceIconPath, targetIconPath];
  const [esDir, libDir, distDir, iconSource, iconTarget] = dirLists.map((p) =>
    resolvePath(p),
  );
  const files = glob.async('**/*.{ts,vue}', {
    absolute: true,
    cwd: componentsPath,
  });

  console.log(files);

  await cleanDirs(distDir, esDir, libDir);
}

// function buildESMAndCJS(esDir: string, libDir: string, source: string[]) {}

function cleanDirs(...dirs: string[]) {
  return Promise.all(dirs.map((dir) => fs.emptyDir(dir)));
}
