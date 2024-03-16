import { Command } from 'commander';
import { iconGen } from './scripts/icon-gen';
import fs from 'fs';
import path from 'path';
import lessGen from './scripts/less-gen';
import buildStyle from './scripts/build-style';
import { buildComponent, alterIconIndex } from './scripts/build-component';
const program = new Command();

const packageContent = fs.readFileSync(
  path.resolve(__dirname, '../package.json'),
  'utf8',
);
const packageData: any = JSON.parse(packageContent);

program
  .version(packageData.version)
  .name('yike-build')
  .usage('command [options]');

program
  .command('icongen')
  .description('generate icon components.')
  .action(() => {
    iconGen();
  });

program
  .command('lessgen')
  .description('generate index.less.')
  .action(() => {
    lessGen();
  });

program
  .command('buildStyle')
  .description('compile less to css.')
  .action(() => {
    buildStyle();
  });

program
  .command('buildComp')
  .description('build component module.')
  .action(async () => {
    await buildComponent();
    await buildComponent(true);
    await alterIconIndex();
  });

program.parse(process.argv);
