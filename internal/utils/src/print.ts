import chalk from 'chalk';

export function print(
  type: 'info' | 'success' | 'warning' | 'error',
  msg: string,
) {
  let coloredMsg: string;

  // 根据type选择不同的颜色和背景颜色
  switch (type) {
    case 'info':
      coloredMsg = chalk.bgGray.white('[INFO]');
      break;
    case 'success':
      coloredMsg = chalk.bgGreen.white('[SUCCESS]');
      break;
    case 'warning':
      coloredMsg = chalk.bgYellow.red('[WARN]');
      break;
    case 'error':
      coloredMsg = chalk.bgRedBright.black('[ERROR]');
      break;
    default:
      coloredMsg = msg;
  }

  console.log(coloredMsg, msg);
}
