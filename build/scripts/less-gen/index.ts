import { glob } from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import { componentPath } from '../../utils/paths';

const lessGen = () => {
  let lessContent = `@import './styles/index.less';\n`;
  const lessFile = glob.sync('**/style/index.less', {
    cwd: componentPath,
  });
  lessFile.forEach((f) => {
    lessContent += `@import '${f}';\n`;
  });
  fs.outputFileSync(path.resolve(componentPath, 'index.less'), lessContent);
  console.log('gen index.less success!');
};

export default lessGen;
