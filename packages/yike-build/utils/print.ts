import chalk from 'chalk';

export function print(type: 'success' | 'error', info: string) {
  console.log(
    chalk[type === 'success' ? 'bgGreen' : 'bgRed'].black('[SUCCESS]'),
    chalk[type === 'success' ? 'green' : 'red'](info),
  );
}
