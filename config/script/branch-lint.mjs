import { log, error, warn, Console } from 'node:console'

import { ArgumentParser } from 'argparse'

import { exec } from 'node:child_process'
import lintStaged from 'lint-staged'


import colors from 'ansi-colors'
import { existsSync } from 'node:fs'
const { bgGreen, yellow, red, green } = colors

log(bgGreen)

const parser = new ArgumentParser({ description: '进行到某分支何入的文件lint检测' })

parser.addArgument('--target', { help: '想要何如的分支', type: 'string', defaultValue: 'upstream/monorepo-dev' })
parser.addArgument('--current', { help: '当前想要测试的分支', type: 'string', defaultValue: 'HEAD' })

const args = parser.parseArgs()

log('args for branch lint are: ', args)


localRun(args.current, args.target).then(() => process.exit(0))



async function localRun(current, target) {
  await invoke('git fetch --all')
  await sharedRun(current, target)
  await extraMergeCheck(current, target)
}

function registerTimeoutProcess() {
  const sec5min = 5 * 60 * 1000
  setTimeout(() => {
    warn('warn: the console timeout reached, pass')
    process.exit()
  }, sec5min)
}

async function invoke(command) {
  return new Promise((resolve, reject) => {
    console.log('[exec]:', command)
    exec(command, { encoding: 'utf-8', timeout: 10 * 10000 }, (error, stdout, stderr) => {
      if (error) reject(error)
      resolve(stdout?.trim?.())
    })
  })
}


/**
 * return the merge base for tow git refs
 * @param {string} gitRef1 a commit hash or branch name
 * @param {string} gitRef2 a commit hash or branch name
 * @returns {Promise<string>} the merge base commit hash
 */
async function getMergeBase(gitRef1, gitRef2) {
  return invoke(`git merge-base --octopus ${gitRef1} ${gitRef2}`)
}


async function sharedRun(current, target) {
  log('target branch/ref is: ', target)
  log('current branch/ref is: ', current)
  const mergeBase = await getMergeBase(current, target)
  log(`the common merge-base for ${current} ${target} is: `, mergeBase)
  log('the changed file are / 文件变动为:')
  log(await invoke(`git diff --name status --diff-filter=ACMR ${mergeBase}...${current}`))

  let command = {
    allowEmpty: true,
    concurrent: false,
    cwd: process.cwd(),
    shell: true,
    stash: false,
    diff: `${mergeBase}...${current}`,
    verbose: true,
    debug: true
  }

  if (current === 'HEAD') {
    command.diff = mergeBase
  }

  log('invoke: lint-branch', command)
  registerTimeoutProcess()

  try {
    if (!(await lintStaged(command))) {
      throw new Error('lint staged failed')
    }

    log(green('lint-staged checked succeed'))
    log(green('lint-staged 检测成功'))
  } catch (e) {
    error(red('lint-staged check failed'))
    error(red('lint-staged 检测失败'))
    process.execArgv(e.status ?? 1)
  }

}



async function extraMergeCheck(current, target) {
  log(bgGreen('>>>> in merge simulate check'))
  log(bgGreen('>>>> 进行本地合入模拟检查'))
  const diffText = await invoke('git status --porcelain=v1')
  if (diffText !== '') {
    log(yellow('current workspace is not clean, skipped'))
    log(yellow('当前工作区不为空，跳过合并检查'))
    log(yellow('please stash / commit current changes to continue'))
    log(yellow('请 提交/暂存 当前工作区变更再继续'))
    log(yellow('such as using "git stash push" to stash changed and run lint again and git stash pop'))
    log(yellow('比如使用 "git stash push" 来暂存变更然后再次跑 lint 然后使用 "git stash pop" 恢复'))
    return
  }

  const headHash = await invoke('git rev-parse HEAD')
  const headLabel = await invoke('git rev-parse --abbrev-ref HEAD')

  const restoreLocation = headLabel === 'HEAD' ? headHash : headLabel
  log(`common restore point is / 通用还原点为: ${restoreLocation}`)

  const currentHash = await invoke(`git rev-parse ${current}`)
  let hasError = true

  try {
    await invoke(`git checkout --detach ${currentHash}`)
    await invoke(`git merge ${target}`)
    if (existsSync('../../.git/MERGE_HEAD')) {
      await invoke('git merge --abort')
      throw new Error(`conflict with ${current} / 和目标 ${target} 有合并冲突`)
    }

    const mergeBase = await getMergeBase(current, target)
    let command = {
      allowEmpty: true,
      concurrent: false,
      cwd: process.cwd(),
      shell: true,
      stash: false,
      diff: `${mergeBase}...${current}`,
      verbose: true,
      debug: true
    }

    if (current === 'HEAD') {
      command.diff = `${mergeBase}...${currentHash}`
    }

    log('invoke: lint-branch', command)

    try {
      if (!(await lintStaged(command))) {
        throw new Error('lint-branch falide')
      }

      log(green('lint-staged check merged result succeed'))
      log(green('lint-staged 检测合并的结果成功'))
      hasError = false
    } catch (error) {
      error(red('lint-staged check merged result failed'))
      error(red('lint-staged 检测合并的结果失败'))
      error(red(`please user "git merge ${target}" to show accurate errors`))
      error(red(`请使用命令 "git merge ${target}" 来正确显示错误`))
      throw error
    } finally {
      await invoke(`git reset --hard ${currentHash}`)
    }
  } catch (e) {
    error(red('发现错误:'))
    error(red(`encounter error: ${e?.message ?? e}`))

  } finally {
    log('restore workspace / 恢复工作区')
    await invoke(`git checkout ${restoreLocation}`)
    if (hasError) {
      log(red('lint-staged has error or has merge conflicts'))
      log(red('lint-staged 有错误 或者 合入有冲突'))
    } else {
      log(green('lint-staged check succeed, no problems found'))
      log(green('lint-staged 检测成功, 没有错误和异常'))
    }
  }
}
