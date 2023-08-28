import { glob } from 'fast-glob';
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

const buildComponent = async (umd = false) => {
  await fs.emptyDir(resolvePath('es'));
  await fs.emptyDir(resolvePath('lib'));
  const entry = [
    ...glob
      .sync('**/*.{ts,vue}', {
        absolute: true,
        cwd: componentSrc,
      })
      .filter((file) => !file.includes('style')),
  ];

  await build({
    plugins: [
      vue({
        script: {
          defineModel: true,
        },
      }),
      vueJsx() as any,
      dts({
        tsconfigPath: resolvePath('./tsconfig.json'),
        outDir: [resolvePath('es'), resolvePath('lib')],
      }),
      virtualPlugin(),
    ],
    build: {
      minify: false,
      sourcemap: true,
      outDir: 'es',
      lib: {
        entry,
      },
      rollupOptions: {
        external: ['vue', '@vueuse/core'],
        treeshake: true,
        output: [
          {
            format: 'esm',
            dir: resolvePath('es'),
            exports: undefined,
            preserveModules: true,
            preserveModulesRoot: componentSrc,
            sourcemap: true,
            entryFileNames: `[name].mjs`,
          },
          {
            format: 'cjs',
            dir: resolvePath('lib'),
            exports: 'named',
            preserveModules: true,
            preserveModulesRoot: componentSrc,
            sourcemap: true,
            entryFileNames: `[name].js`,
          },
        ],
      },
    },
  });

  const s = resolvePath('src/components/svg-icon/icons.json');
  const t = resolvePath('es/components/svg-icon/icons.json');
  await fs.copy(s, t);

  if (umd) {
    await fs.emptyDir(resolvePath('dist'));
    await build(genUmdConfig('component'));
    await build(genUmdConfig('icon'));
  }

  console.log('build success');
};

export default buildComponent;
