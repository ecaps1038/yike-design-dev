import path from 'path';
import fs from 'fs-extra';
import { glob } from 'fast-glob';
import { componentSrc, resolvePath } from '../../utils/paths';
import less from 'less';
import CleanCSS from 'clean-css';
import { build } from 'vite';

const buildComponentCssModule = async () => {
  const files = glob.sync('**/*.{less,js}', {
    cwd: resolvePath('components'),
  });

  for (const filename of files) {
    const absolute = resolvePath(componentSrc, 'components', filename);
    const targets = [
      resolvePath(`es/components/${filename}`),
      resolvePath(`lib/components/${filename}`),
    ];

    // 直接复制源文件
    for (const target of targets) {
      await fs.ensureDir(path.dirname(target));
      await fs.copy(absolute, target);
    }

    // 编译 .less 为 .css
    if (/\.less$/.test(filename)) {
      const lessContent = await fs.readFile(absolute, 'utf8');

      try {
        const { css } = await less.render(lessContent, {
          paths: [
            resolvePath('components'), // 确保能找到 styles 下的基础变量
            path.dirname(absolute),
          ],
          filename: absolute,
          javascriptEnabled: true,
        });

        const cssFilename = filename.replace(/\.less$/, '.css');
        for (const outputRoot of ['es', 'lib']) {
          const outputPath = resolvePath(
            `${outputRoot}/components/${cssFilename}`,
          );
          await fs.ensureDir(path.dirname(outputPath));
          await fs.writeFile(outputPath, css);
        }
      } catch (err) {
        console.error(`Less compile error in ${filename}:`, err);
      }
    }
  }
};

const buildCssIndex = async () => {
  const indexLessPath = resolvePath('index.less');
  fs.copyFileSync(indexLessPath, 'es/index.less');
  fs.copyFileSync(indexLessPath, 'lib/index.less');

  const indexLessContent = fs.readFileSync(indexLessPath, 'utf-8');
  const result = await less.render(indexLessContent, {
    paths: [resolvePath('src')],
  });

  fs.ensureDirSync(resolvePath('dist'));

  fs.writeFileSync(
    resolvePath('dist/index.less'),
    `@import "../es/index.less";`,
  );

  fs.writeFileSync(resolvePath('dist/index.css'), result.css);

  const compress = new CleanCSS().minify(result.css);
  fs.writeFileSync(resolvePath('dist/index.min.css'), compress.styles);
};

import type { Plugin } from 'vite';
function cssjsPlugin(): Plugin {
  return {
    name: 'vite:cssjs',
    async generateBundle(_, bundle) {
      for (const filename of Object.keys(bundle)) {
        if (!/style\/index\.js$/.test(filename)) continue;

        const cssFile = filename.replace('index.js', 'index.css');

        // Emit an empty CSS asset if it hasn't been generated yet (fallback)
        if (!fs.existsSync(resolvePath('es', cssFile))) {
          this.emitFile({
            type: 'asset',
            fileName: cssFile,
            source: '',
          });
        }

        // Emit css.js which re-exports index.cssbuildStyle
        this.emitFile({
          type: 'asset',
          fileName: filename.replace('index.js', 'css.js'),
          source: `import './index.css';\n`,
        });
      }
    },
  };
}

const buildStyleModule = async () => {
  const entries = glob.sync(`components/**/style/index.ts`, {
    cwd: componentSrc,
    absolute: true,
  });
  await build({
    build: {
      target: 'modules',
      outDir: 'es',
      emptyOutDir: false,
      minify: false,
      rollupOptions: {
        external: /\.less$/,
        input: entries,
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
        entry: '',
        formats: ['es', 'cjs'],
      },
    },
    plugins: [cssjsPlugin()],
  });
};

const buildStyle = async () => {
  await buildComponentCssModule(); // 编译 less -> css
  await buildCssIndex(); // 生成 dist/index.css 和 index.min.css
  await buildStyleModule(); // vite 编译所有 style/index.ts 为 js 文件
};

export default buildStyle;
