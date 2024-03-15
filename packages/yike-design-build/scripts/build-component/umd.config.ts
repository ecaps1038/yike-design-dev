import { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolvePath } from '../../utils/paths';

export const genUmdConfig = (type: 'component' | 'icon'): InlineConfig => {
  const entry =
    type === 'component'
      ? resolvePath('index.ts')
      : resolvePath('components/svg-icon/yike-icon.ts');
  const entryFileName =
    type === 'component' ? 'yike-design-ui' : 'yike-design-icon';
  const name = type === 'component' ? 'YikeDesignUI' : 'YikeDesignIcon';

  return {
    mode: 'production',
    build: {
      target: 'modules',
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: true,
      minify: false,
      rollupOptions: {
        external: 'vue',
        output: [
          {
            format: 'umd',
            entryFileNames: `${entryFileName}.js`,
            name,
            globals: {
              vue: 'Vue',
              '@vueuse/core': 'VueUse',
            },
          },
          {
            format: 'umd',
            entryFileNames: `${entryFileName}.min.js`,
            name,
            globals: {
              vue: 'Vue',
              '@vueuse/core': 'VueUse',
            },
          },
        ],
      },
      // 开启lib模式
      lib: {
        entry,
      },
    },
    plugins: [vue(), vueJsx()],
  };
};
