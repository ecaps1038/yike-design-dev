import chalk from 'chalk'
import fs from 'fs'

const msgPath = '.git/COMMIT_EDITMSG'
const msg = fs.readFileSync(msgPath, 'utf-8').trim()
if (!msg.startsWith('Merge branch')) {
  const commitRE =
    /^(v\d+\.\d+\.\d+(-(alpha|beta|rc.\d+))?)|((revert: )?(feat|fix|docs|refactor)(\(.+\))?!?: .{1,50})/
  if (!commitRE.test(msg)) {
    console.error(
      chalk.red(`\ncommit存在格式错误,请使用正确的格式编写提交信息. 例如:\n`) +
        `${chalk.green(`feat(compiler): 增加了 commit 参数`)}\n` +
        `${chalk.green(`fix(button): 修复按钮禁用失效问题 (close #28)`)}\n`,
    )
    process.exit(1)
  }
}
