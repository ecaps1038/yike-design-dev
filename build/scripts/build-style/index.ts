import fs from 'fs-extra';
import { glob } from 'fast-glob';
import { componentPath, resolvePath } from '../../utils/paths';
import less from 'less';
import path from 'path';

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
        filename: filename,
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

const buildStyle = () => {
  buildComponentCssModule();
};

export default buildStyle;
