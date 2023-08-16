import { Command } from 'commander';
import genIcon from './src/gen-icon';
import newComponent from './src/new-component';

const program = new Command();

program
  .command('newcomp')
  .description('create new components')
  .action(() => newComponent());

program
  .command('genicon')
  .description('generate icon components')
  .action(() => genIcon());

program.parse(process.argv);
