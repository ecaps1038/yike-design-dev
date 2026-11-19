import fs from 'fs'

/**
 * 校验 commit message 是否符合约定式提交（Conventional Commits）。
 * 参考 CONTRIBUTING 中的 `${type}(${component}): ${description}` 规范。
 *
 * 允许的类型与 .versionrc 保持一致；同时兼容本仓库历史中 `fix:xxx`（冒号后无空格）的写法。
 */
const msgPath = '.git/COMMIT_EDITMSG'

let msg = ''
try {
  msg = fs.readFileSync(msgPath, 'utf-8').trim()
} catch {
  // 没有 COMMIT_EDITMSG（例如 rebase 场景）时不做校验
  process.exit(0)
}

// merge / revert 等自动生成的提交不校验
if (!msg || /^(Merge |Revert "|revert:)/.test(msg)) {
  process.exit(0)
}

const types =
  'feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert|init'
// type(scope)?!?: description；冒号后的空格可选，以兼容历史提交
const commitRE = new RegExp(`^(${types})(\\([^)]+\\))?!?:\\s?\\S`)

if (!commitRE.test(msg)) {
  console.error(
    [
      '',
      '提交信息不符合约定式提交格式，请参考：',
      '  feat(button): 新增按钮 loading 状态',
      '  fix(input): 修复输入框清空后失焦问题 (close #28)',
      '  docs(upload): 更新上传组件文档',
      '',
      `当前提交信息：${msg}`,
      '',
    ].join('\n'),
  )
  process.exit(1)
}
