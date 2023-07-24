import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
// component root path
const packagePath = 'packages/yike-design-ui/src'

function mkdirSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  }
  if (mkdirSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname)
    return true
  }
  return false
}

function log(...rest) {
  console.log(chalk.bgGreen.black(`[INFO]`), ...rest)
}
function warn(msg) {
  console.warn(chalk.bgRed.black(`[ERROR]`), msg)
}

function logCreateFile(filename) {
  log(`${filename} 生成完毕`)
}

// yk-message -> YkMessage
function dashToCamelCase(str) {
  return str
    .replace(/-([a-z])/g, function (match, letter) {
      return letter.toUpperCase()
    })
    .replace(/^(.)/, function (match, letter) {
      return letter.toUpperCase()
    })
}

const componentLowDashName = process.argv[2] // component-name
const componentDescName = process.argv[3] // 组件名
const upperRegex = /[A-Z]/

if (!componentLowDashName || upperRegex.test(componentLowDashName)) {
  warn('请采用短横线为组件命名')
  warn('如：npm run new back-top 回到顶部')
  process.exit(233)
}

if (!componentDescName) {
  warn('请输入正确的组件名称')
  warn('如：npm run new pagination 分页')
  warn('如：npm run new back-top 回到顶部')
  process.exit(233)
}

const upperComponentName = dashToCamelCase(componentLowDashName) // ComponentName
const upperFullComponentName = 'Yk' + upperComponentName // YkComponentName
const tagName = 'yk-' + componentLowDashName // yk-component-name
const packageIndexFile = path.join(packagePath, 'index.ts')

function createComponentMainFiles() {
  const componentBaseDir = packagePath + '/components/' + componentLowDashName

  if (fs.existsSync(componentBaseDir)) {
    warn(`${componentLowDashName}组件已存在，请检查是否存在冲突`)
    process.exit(233)
  }

  const childFIleList = [`/src`, `/style`]

  // create default folders
  childFIleList.forEach((fileName) => {
    mkdirSync(componentBaseDir + fileName)
  })

  const componentMainVuePath = `${componentBaseDir}/src/${componentLowDashName}.vue`
  const componentMainPropsPath = `${componentBaseDir}/src/${componentLowDashName}.ts`
  const componentMainLessPath = `${componentBaseDir}/style/index.less`
  const componentMainStylePath = `${componentBaseDir}/style/index.ts`

  const propsName = `${upperComponentName}Props`

  const vueContent = `<template>
  <div class="${tagName}">${upperComponentName}</div>
</template>
<script setup lang="ts">
import { ${upperComponentName}Props } from './${componentLowDashName}'
import { createCssScope } from '../../../utils/bem'
import '../style'

const bem = createCssScope('${componentLowDashName}')

defineOptions({
  name: '${upperFullComponentName}',
})
const props = withDefaults(defineProps<${propsName}>(), {
  id: '',
})
</script>
  `

  fs.writeFileSync(componentMainVuePath, vueContent)
  logCreateFile(componentMainVuePath)

  // export default props content
  const propsContent = `export type ${propsName} = {
  id?: string;
};
  `

  fs.writeFileSync(componentMainPropsPath, propsContent)
  logCreateFile(componentMainPropsPath)

  const lessContent = `.yk-${componentLowDashName} {

}`
  // create default less content
  fs.writeFileSync(componentMainLessPath, lessContent)
  logCreateFile(componentMainLessPath)

  fs.writeFileSync(componentMainStylePath, `import './index.less';`)
  logCreateFile(componentMainStylePath)

  const exportContent = `import ${upperComponentName} from './src/${componentLowDashName}.vue';
import { withInstall } from '../../utils/index';
export const ${upperFullComponentName} = withInstall(${upperComponentName});
export default ${upperFullComponentName};
export * from './src/${componentLowDashName}';
  `
  // create index.ts
  fs.writeFileSync(`${componentBaseDir}/index.ts`, exportContent)
  logCreateFile(`${componentBaseDir}/index.ts`)
}

function addComponentExport() {
  // src/main.ts
  // 将YkAlert前替换为添加新增组件后的语句
  const importReplacement = "import YkAlert from './components/alert';"
  const newImport = `import ${upperFullComponentName} from './components/${componentLowDashName}';\n${importReplacement}`
  // replace import and export component
  const componentsReplacement = `YkAlert,`
  // 读取文件内容
  fs.readFile(packageIndexFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const replacedData = data
      .replace(importReplacement, newImport)
      .replaceAll(
        componentsReplacement,
        `${upperFullComponentName},\n\t${componentsReplacement}`,
      )
    fs.writeFile(packageIndexFile, replacedData, 'utf8', (err) => {
      if (err) {
        console.error(err)
        return
      }
      log(`${packageIndexFile} 添加组件导出成功`)
    })
  })
}

// add default demo file
function addDemoFile() {
  const exampleBasePath = 'demo/src/examples/'
  const examplePath = `${exampleBasePath}${componentLowDashName}/`
  mkdirSync(examplePath)
  const mdContent = `## ${upperFullComponentName} ${componentDescName}
:::snippet
基本用法
这里展示基本用法
<${upperComponentName}Primary/>
:::
  `
  fs.writeFileSync(`${examplePath}doc.md`, mdContent)
  logCreateFile(`${examplePath}doc.md`)

  fs.writeFileSync(
    `${examplePath}/${componentLowDashName}-primary.vue`,
    `<template>
  <${tagName}></${tagName}>
</template>`,
  )
  log(`基础demo文件 生成完毕`)
}

function selectAddRouter() {
  const barFile = 'demo/src/router/config/bar.json'
  fs.readFile(barFile, 'utf8', (err, data) => {
    if (err) {
      warn('路由配置文件读取失败')
      warn(err)
      process.exit(233)
    }
    const barData = JSON.parse(data).bar
    const titleList = barData.map(
      (item, index) => `${index + 1}: ${item.title}`,
    )
    // select and add classify routers
    console.log(
      chalk.yellow(`请选择${componentDescName}所属的组件分类:\n`),
      titleList,
    )
    rl.question(chalk.yellow('请输入您的选择 (数字)：'), (answer) => {
      barData[Number(answer) - 1].list.push({
        name: `${upperComponentName} ${componentDescName}`,
        src: componentLowDashName,
      })
      fs.writeFile(
        barFile,
        JSON.stringify({ bar: barData }, null, 2),
        'utf8',
        (err) => {
          if (err) {
            warn(err)
            return
          }
          log(
            `${barFile} ${componentDescName}组件已添加至${
              titleList[answer - 1]
            }路由类目下`,
          )
        },
      )
      rl.close()
      log('已完成组件目录及初始化文件的创建')
    })
  })
}

function addRouter() {
  // add doc.md into general.ts
  const generalRouterPath = 'demo/src/router/modules/general.ts'

  const addRouterContent = `  {
    path: '${componentLowDashName}',
    component: () => import('@/examples/${componentLowDashName}/doc.md'),
  },
]`
  fs.readFile(generalRouterPath, 'utf8', (err, data) => {
    if (err) {
      warn(err)
      return
    }
    const replacedData = data.replace(']', addRouterContent)
    fs.writeFile(generalRouterPath, replacedData, 'utf8', (err) => {
      if (err) {
        warn(err)
        return
      }
      log(`${generalRouterPath} demo路由添加成功`)
      selectAddRouter()
    })
  })
}

createComponentMainFiles()

addComponentExport()

addDemoFile()

addRouter()
