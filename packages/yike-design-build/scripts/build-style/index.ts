import path from 'path';
import fs from 'fs-extra';
import { glob } from 'fast-glob';
import { componentSrc, resolvePath } from '../../utils/paths';
import less from 'less';
import CleanCSS from 'clean-css';
import { build } from 'vite';

const buildComponentCssModule = () => {
  const files = glob.sync('**/*.{less,js}', {
    cwd: resolvePath('components'),
  });
  for (const filename of files) {
    const absolute = resolvePath(componentSrc, 'components', filename);
    fs.copySync(absolute, resolvePath(`es/components/${filename}`));
    fs.copySync(absolute, resolvePath(`lib/components/${filename}`));
    if (!/.less$/.test(filename)) continue;
    const lessContent = fs.readFileSync(absolute, 'utf8');
    less.render(
      lessContent,
      {
        paths: [resolvePath(`components/${path.dirname(filename)}`)],
      },
      (err, output) => {
        if (err) {
          return err;
        } else if (output && output.css) {
          const cssFilename = filename.replace('.less', '.css');
          fs.writeFileSync(
            resolvePath(`es/components/${cssFilename}`),
            output.css,
          );
          fs.writeFileSync(
            resolvePath(`lib/components/${cssFilename}`),
            output.css,
          );
        }
      },
    );
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
    async generateBundle(outputOptions, bundle) {
      for (const filename of Object.keys(bundle)) {
        // const chunk = bundle[filename];
        this.emitFile({
          type: 'asset',
          fileName: filename.replace('index.js', 'css.js'),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // FIX ME
          // Change the content of index.js to be correct
          source: "'../index.css'",
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

const buildStyle = () => {
  buildComponentCssModule();
  buildCssIndex();
  buildStyleModule();
};

export default buildStyle;
