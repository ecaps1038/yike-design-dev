我们重视每位参与者的贡献，感谢每一行代码的产生

### Run it
---
要运行组件库，请执行以下步骤：
1. 推荐先fork项目并给予此仓库进行操作
2. 克隆fork后的项目到本地 
`git clone https://github.com/xxxxxx/yike-design-dev.git`
3. 切换至monorepo-dev分支 `git checkout monorepo-dev`
4. 安装依赖：`pnpm i`
5. 启动开发服务器：`npm run dev:demo` 
6. 在浏览器中访问：`http://localhost:5173`

### 如何贡献
---
为了维护组件库代码提交规范性，项目前期(第一版正式发包前)推荐采用以下流程提交代码
1. fork项目 
前往[项目主页](https://github.com/ecaps1038/yike-design-dev.git,"github主页")fork工程至自己的git仓库,并基于此git仓库维护代码
2. 添加主仓库为远程仓库之一
`git remote add upstream https://github.com/ecaps1038/yike-design-dev.git`
3. 每当你准备开始一个新的功能开发或提交 PR 前，请先从主仓库拉取最新的代码并合并到仓库的对应分支
``` shell
git checkout -b monorepo-dev
git fetch upstream
git merge upstream/monorepo-dev
```
4. 创建需求分支
* ⚠️  对于每次代码提交需求，本地需创建一个新的分支，请尽量避免在同一个分支上处理多个需求
* ⚠️  根据你需要开发的新功能，推荐采用以下分支命名规范
* ⚠️  分支名称由三部分构成 `${type}/${component}/${feat}`
```
其中，type表示该分支类型,有以下选项

feature:功能分支

fix:修复分支

docs:文档修改分支

refactor:重构分支
```
```
component为你需要修改的组件

如 button、icon、upoload等

若需要修改脚手架能力，此处应为base
```
```
feat为你需要具体修改的内容
此处定义根据功能自由命名，命名采用短横线命名法
```
以下是具体实例:
- `feature/base/add-markdown-pure`
- `feature/button/add-style`
- `fix/icon/alignment-issue`
- `docs/upload/add-picture-demo`
- `refactor/base/refactor-router`
5. 在编写完代码后，在确保与目标分支不存在冲突的前提下可以将该功能分支提交PR到主仓库的对应分支（目前主要的开发分支为monorepo-dev分支）
6. PR将由具备权限的贡献者CR后进行merge,若提交的功能影响面较广，CR人员应当及时同其他成员共同参与讨论和检验

Commit 规范
---
同样的，我们推荐使用以下commmit说明，commmit包含三部分内容 与分支规范类似

`${type}(${component}): ${commit-word}`

另外，feature应采用缩写后的"feat"
以下是具体实例，当然，中文的提交说明目前也是可接受的 !
- `feat(button): add styles for button component`
- `fix(icon): resolve alignment issue in icon component`
- `docs(upload): update README file`
- `refactor(base): refactor router module`

目录结构
---

```
|- demo/                  # 演示样例web工程
|  |- package.json        # 演示样例 package.json 文件
|  |- tsconfig.json       # 演示样例 TypeScript 配置文件
|  |- vite.config.ts      # 演示样例 Vite 配置文件
|  |- plugins/            # 插件目录
|  |- public/             # 公共文件夹
|  |- src/
|     |- router/           # 路由目录
|        |- index.ts       # 处理demo路由
|     |- components/       # 组件目录
|        |- example/       # 示例文件夹
|     |- main.ts          # 入口文件
|     |- App.vue
|- packages/               # 组件库开发目录
|  |- yike-design-ui/
|     |- src/
|        |- assets/        # 资源文件夹
|        |- components/    # 组件目录
|        |- styles/        # 样式文件夹
|            |- base.less  # 公共基础样式
|        |- types/         # 类型文件夹
|        |- utils/         # 工具文件夹
|        |- index.ts       # 组件库入口文件
|     |- package.json      # 组件库 package.json 文件
|- package.json           # 根目录下的 package.json 文件
|- README.md              # 根目录下的 README.md 文件
|- tsconfig.json          # 根目录下的 TypeScript 配置文件
|- ...
```

公共样式、方法及类型
---
- 公共样式
Yike-Design 设计稿

https://codesign.qq.com/s/6W3G0m4m8q9lOwL

为保持组件库样式风格上的统一，请遵循YIke设计稿中的样式进行开发，并推荐采用base.less中提供的各通用样式如

```
@pcolor: #2b5aed; // 全局主色
@lcolor: #1890ff; // 链接色
@scolor: #1fb4a2; // 成功色
@wcolor: #f5ac08; // 警告色
@ecolor: #fa5247; // 错误色
@gray: #1e2025;
```

- 公共类型 
- 目前utils下方已有tools.ts 提供公共方法 constance.ts 提供公共类型

⚠️ 文档开发相关
---
#### 文档目录结构

文档目录应该按照以下结构进行组织：
```
- /demo/src/examples/button: 根目录，包含组件示例和文档
  |- /button: 按钮组件目录
    |- doc.md: 按钮组件文档
    |- button-example1.vue: 按钮组件示例文件1
    |- button-example2.vue: 按钮组件示例文件2
    |- ...
  |- /component2: 第二个组件目录
    |- doc.md: 第二个组件文档
    |- component2-example1.vue: 第二个组件示例文件1
    |- component2-example2.vue: 第二个组件示例文件2
    |- ...
```

⚠️ 每个组件目录下都应该包含一个 doc.md 文件和若干示例文件

#### 组件文档 doc.md
组件文档使用 Markdown 格式编写，提供关于组件的说明、用法、API 等相关信息。以下是一个组件文档的基本结构示例：
```
## yk-button 按钮  （文档首页标题）


:::snippet  （每个demo对应信息采用 :::snippet::: 标志位进行维护）
按钮类型 type
按钮有三种类型：`主按钮` 、`次按钮` 、`线框按钮` 。主按钮在同一个操作区域建议最多出现一次。
<ButtonPrimary/>
:::

:::snippet 
按钮尺寸 size
按钮分为：`s`、`m`、`l`、`xl` 四种尺寸。高度分别为：`24px`、`32px`、`36px`、`48px`。默认尺寸为 l。
<ButtonSize/>
:::

:::snippet 
title
desc
<DemoFileName/>
:::
...

### API (API标题)

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> size -> shape -> status -> disabled。 (API说明)

|参数      | 描述     | 类型     | 默认值 | (md表格结构)
| ------------------ | ----------------- | ---------------| ---------------- |
| type | 按钮的类型   | 'primary'或'secondary'或'outline'   | primary |
| 单元格信息 | 单元格信息 | 单元格信息 | 单元格信息 |
| 单元格信息 | 单元格信息 | 单元格信息 | 单元格信息 |
```
- 每个demo对应信息采用 `:::snippet:::` 标志位进行维护
- 单个demo在doc.md中维护的信息有
  - Title: demo标题，说明该组组件demo共性
  - Desc: demo说明，支持md格式
  - DemoName demo名称，采用驼峰命名法的单标签，必须为文档目录下存在的文件，否则可能存在解析报错
- 每个demo文件⚠️只可在doc.md中引入一次


#### 7.10日新增 :::pure:::  标记符号，该标记位将直接渲染内部demo组件并自动引入相关依赖，具体用例如下
```
### 线性图标展示
复制对应图标下的名称获取该图标。
:::pure
<IconPrimary/>
:::
```
  

⚠️ 组件开发目录结构标准
---
```
- avatar: 单个组件的开发目录
  |- src: 源代码文件夹
    |- util.ts: 实用工具函数文件
    |- avatar.ts: 组件types、interface、props文件
    |- avatar.vue: 组件模板文件
  |- style: 样式文件夹
    |- index.less: 主样式文件
    |- index.ts: 样式导入文件
  |- index.ts: 组件入口文件
```

以下是建议的代码风格和规范,具体可参照avatar
- 组件props 在avatar.ts中定义类型并在.vue文件中采用withDefaults定义默认值

``` javascript
//src/avatar.vue
export type AvatarProps = {
  shape?: 'circle' | 'square';
  size?: number | string;
  icon?: string;
  imgUrl: string;
}

//
const props = withDefaults(defineProps<AvatarProps>(), {
  shape: 'circle',
  size: 40,
  icon: 'yk-touxiang1',
})
```




