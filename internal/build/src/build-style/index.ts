import path from 'path';
import fs from 'fs-extra';
import less from 'less';
import CleanCSS from 'clean-css';
import { glob } from 'fast-glob';
import { build, Plugin } from 'vite';
import { componentsPath, resolvePath } from '@yike/build-utils';

export default function buildStyle() {
  buildComponentCssModule();
  buildCssIndex();
  buildStyleModule();
}

const buildComponentCssModule = () => {
  const files = glob.sync('**/*.{less,js}', {
    cwd: resolvePath('../components'),
  });

  for (const filename of files) {
    const absolute = resolvePath(componentsPath, filename);
    fs.copySync(absolute, resolvePath(`./es/components/${filename}`));
    fs.copySync(absolute, resolvePath(`./lib/components/${filename}`));
    if (!/.less$/.test(filename)) continue;

    const lessContent = fs.readFileSync(absolute, 'utf8');
    less.render(
      lessContent,
      {
        paths: [resolvePath(`../components/${path.dirname(filename)}`)],
      },
      (err, output) => {
        if (err) {
          return err;
        } else if (output && output.css) {
          const cssFilename = filename.replace('.less', '.css');
          fs.writeFileSync(
            resolvePath(`./es/components/${cssFilename}`),
            output.css,
          );
          fs.writeFileSync(
            resolvePath(`./lib/components/${cssFilename}`),
            output.css,
          );
        }
      },
    );
  }
};

const buildCssIndex = async () => {
  const indexLessPath = resolvePath('./index.less');
  fs.copyFileSync(indexLessPath, './es/index.less');
  fs.copyFileSync(indexLessPath, './lib/index.less');

  const indexLessContent = fs.readFileSync(indexLessPath, 'utf-8');
  const result = await less.render(indexLessContent, {
    paths: [resolvePath('./')],
  });

  fs.ensureDirSync(resolvePath('./dist'));

  fs.writeFileSync(
    resolvePath('./dist/index.less'),
    `@import "../es/index.less";`,
  );

  fs.writeFileSync(resolvePath('./dist/index.css'), result.css);

  const compress = new CleanCSS().minify(result.css);
  fs.writeFileSync(resolvePath('./dist/index.min.css'), compress.styles);
};

function cssjsPlugin(): Plugin {
  return {
    name: 'vite:cssjs',
    async generateBundle(outputOptions, bundle) {
      for (const filename of Object.keys(bundle)) {
        const chunk = bundle[filename];
        this.emitFile({
          type: 'asset',
          fileName: filename.replace('index.js', 'css.js'),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          source: chunk.code.replace(/\.less/g, '.css'),
        });
      }
    },
  };
}

const buildStyleModule = async () => {
  const entries = glob.sync(`**/style/index.ts`, {
    cwd: componentsPath,
    absolute: true,
  });
  console.log('entries: ', entries);
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
            preserveModulesRoot: resolvePath('./'),
          },
          {
            format: 'commonjs',
            dir: 'lib',
            entryFileNames: '[name].js',
            preserveModules: true,
            preserveModulesRoot: resolvePath('./'),
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
