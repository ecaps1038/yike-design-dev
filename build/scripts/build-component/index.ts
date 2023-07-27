import { glob } from 'fast-glob';
import { componentSrc, resolvePath } from '../../utils/paths';
import fs from 'fs-extra';
import { Plugin, build } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';

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

const buildComponent = async () => {
  await fs.emptyDir(resolvePath('es'));
  await fs.emptyDir(resolvePath('lib'));
  const entry = [
    ...glob
      .sync('**/*.{ts,vue}', {
        absolute: true,
        cwd: componentSrc,
      })
      .filter((file) => !file.includes('svg-icon') && !file.includes('style')),
  ];

  await build({
    plugins: [vue(), vueJsx() as any, virtualPlugin()],
    build: {
      lib: {
        entry,
      },
      outDir: 'es',
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
};

export default buildComponent;
