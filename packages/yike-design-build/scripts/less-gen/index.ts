import { glob } from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import { componentSrc } from '../../utils/paths';
import { print } from '../../utils/print';

const lessGen = () => {
  // let lessContent = `@import 'components/styles/index.less';\n`;
  let lessContent = '';
  const lessFile = glob.sync('**/style/index.less', {
    cwd: componentSrc,
  });
  lessFile.forEach((f) => {
    if (f.startsWith('components')) {
      lessContent += `@import '${f}';\n`;
    }
  });
  fs.outputFileSync(path.resolve(componentSrc, 'index.less'), lessContent);
  print('success', 'gen index.less success!');
};

export default lessGen;
