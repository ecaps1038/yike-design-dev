import path from 'path';
import fs from 'fs-extra';
import { glob } from 'fast-glob';
import { componentPath, resolvePath } from '../../utils/paths';
import less from 'less';
import CleanCSS from 'clean-css';

const buildComponentCssModule = () => {
  const files = glob.sync('**/*.{less,js}', {
    cwd: resolvePath('src/components'),
  });
  for (const filename of files) {
    const absolute = resolvePath(componentPath, 'components', filename);
    fs.copySync(absolute, resolvePath(`es/${filename}`));
    if (!/.less$/.test(filename)) continue;
    const lessContent = fs.readFileSync(absolute, 'utf8');
    less.render(
      lessContent,
      {
        paths: [resolvePath(`src/components/${path.dirname(filename)}`)],
      },
      (err, output) => {
        if (err) {
          console.log('err: ', err);
          return err;
        } else if (output && output.css) {
          const cssFilename = filename.replace('.less', '.css');
          fs.writeFileSync(resolvePath(`es/${cssFilename}`), output.css);
          console.log(`${filename} build success`);
        }
      },
    );
  }
};

const buildCssIndex = async () => {
  const indexLessPath = resolvePath('src/index.less');
  fs.copyFileSync(indexLessPath, 'es/index.less');

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

const buildStyle = () => {
  buildComponentCssModule();
  buildCssIndex();
};

export default buildStyle;
