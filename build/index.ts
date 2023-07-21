import { Command } from 'commander';
import { iconGen } from './scripts/icon-gen';
import fs from 'fs';
import path from 'path';

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

program.parse(process.argv);
