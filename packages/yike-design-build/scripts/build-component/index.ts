import fs from 'fs-extra';
import { Plugin, build } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import { genUmdConfig } from './umd.config';
import { resolvePath, componentSrc } from '../../utils/paths';
const EXPORT_HELPER_ID = 'plugin-vue:export-helper';
const helperCode = `
export default (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val
  }
  return sfc
}
`;

function virtualPlugin(): Plugin {
  return {
    name: 'vite:vue-export-helper',
    enforce: 'pre',
    resolveId(source: string) {
      if (source === EXPORT_HELPER_ID) {
        return `${EXPORT_HELPER_ID}.js`;
      }
      return null;
    },
    load(source) {
      if (source === `${EXPORT_HELPER_ID}.js`) {
        return helperCode;
      }
      return null;
    },
  };
}
function externalPlugin(): Plugin {
  return {
    name: 'vite:external-node_modules',
    enforce: 'pre',
    async resolveId(source: string, importer) {
      const result = await this.resolve(source, importer, {
        skipSelf: true,
        custom: { 'node-resolve': {} },
      });

      if (result && /node_modules/.test(result.id)) {
        return false;
      }

      return null;
    },
  };
}

export const buildComponent = async (umd = false) => {
  await fs.emptyDir(resolvePath('es'));
  await fs.emptyDir(resolvePath('lib'));

  // const entry = [
  //   ...glob
  //     .sync('**/*.{ts,vue}', {
  //       absolute: true,
  //       cwd: componentSrc,
  //     })
  //     .filter((file) => !file.includes('style')),
  // ];

  await build({
    mode: 'production',
    build: {
      target: 'ES2020',
      outDir: 'es',
      emptyOutDir: false,
      minify: false,
      rollupOptions: {
        input: ['index.ts', 'components/svg-icon/index.ts'],
        output: [
          {
            format: 'es',
            dir: 'es',
            entryFileNames: '[name].js',
            preserveModules: true,
            preserveModulesRoot: componentSrc,
          },
          {
            format: 'commonjs',
            dir: 'lib',
            entryFileNames: '[name].js',
            preserveModules: true,
            preserveModulesRoot: componentSrc,
          },
        ],
      },
      lib: {
        entry: 'components/index.ts',
        formats: ['es', 'cjs'],
      },
    },
    plugins: [externalPlugin(), vue(), vueJsx(), virtualPlugin(), dts()],
  });

  const s = resolvePath('components/svg-icon/icons.json');
  const t = resolvePath('es/components/svg-icon/icons.json');
  await fs.copy(s, t);

  if (umd) {
    await fs.emptyDir(resolvePath('dist'));
    await build(genUmdConfig('component'));
    await build(genUmdConfig('icon'));
  }

  console.log('build success');
};

// TODO
// remove this method and use other methods for compile svg-icon/index.js
// compileIconIndex();
export const alterIconIndex = async () => {
  const IndexPath = resolvePath('es/components/svg-icon/index.js');
  const TypeIndex = resolvePath('es/components/svg-icon/index.d.ts');
  await fs.copy(TypeIndex, IndexPath);
  const originalCode = fs.readFileSync(IndexPath, 'utf8');
  const lines = originalCode.split('\n');
  // 第一行添加 .js
  lines[0] = lines[0].replace(/';$/, ".js';");
  // 处理每一行，除了第一行和最后一行 替换';为/index.js';
  for (let i = 1; i < lines.length - 1; i++) {
    lines[i] = lines[i].replace(/';$/, "/index.js';");
  }
  // 删除多余行
  lines.pop();
  lines.pop();
  const modifiedCode = lines.join('\n');
  fs.writeFileSync(IndexPath, modifiedCode, 'utf8');
};

export default buildComponent;
