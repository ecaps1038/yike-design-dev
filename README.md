# Yike-Design-Dev

Yike-Design 前端UI组件库

---

### 注意事项

感谢您从B站或者是掘金等平台了解到我们的项目，并想要参加到我们的项目中来，感谢您的支持

首先您需要先加入到我们的Q群中来：740076696

进群后您可以观看群公告，并观看其中的飞书的任务文档，我们的项目任务文档是基于飞书来进行管理的，我们会记录任务情况，避免冲突，所以目前尽可能不要直接提PR，感谢您的理解。

如果您有想开发的组件或者基建任务，可以直接@`yike`进行讨论，或者直接在群里交流，我们也会及时去看到的。

接下来如果您开始着手开发工作，请阅读下面的CONTRIBUTING.md

## 出发点

本人作为一名设计人员，非常希望有一套属自己的前端UI框架，用以表达我的设计。而在组件上，我不期望我的设计被前端UI框架束缚。所以最初的想法是能更灵活的运用和调整每一个组件，比如我甚至不希望它成为一个依赖包深深的藏在node_modules里面，我要它能时刻修改每一段源码，以用到我每一次独特的设计需求中；我希望我能够做到可见的按需引入单个组件，我可以将不要的组件统统删除...

在对前端的兴趣，我已经开始了这项工作。

## 为何创建这个仓库

本人不才，开发只是我的一点兴趣，很多关于开发的东西都不懂，始终是徘徊在开发的大门处，并没有期望能跟开发大佬们一起协作完成一个作品。本人也一直对作品的视觉很在乎，有时候甚至看不得前端有一毫的破坏我的界面。所以一直都在自己单独写些东西。但团队的力量是不可预计的。在跟他人谈能共同完成一个项目时，我也会心潮澎湃，我应该信任一个团队，我应该能为一个团队去服务去创造。我要无限的开源这个项目（虽然说它还什么都不是），来期望每一位有兴趣的和认同我的想法的大佬们一起加入开发，来打造一套不一样的框架体验。

## 开发计划

### 第一步

按进度开发完现在流行前端组件库的基础组件。

### 第二步

从第一步基础组件出发，开始封装功能性组件。

例如：用户组件、登录组件、评论组件、富文本等等。

### 第三步

封装前后端组件。该步会将组件封装为单个功能模块，解决前后端功能，做到类似低代码模块能力（我相信他是很不一样的，我期望并坚持站在设计体验的角度去思考这一步）。

---

# 以下为贡献指南

我们重视每位参与者的贡献，感谢每一行代码的产生

## Run it

要运行组件库，请执行以下步骤：

1. 推荐先 fork 项目并基于此仓库进行操作
2. 克隆 fork 后的项目到本地 `git clone https://github.com/xxxxxx/yike-design-dev.git`
3. 切换至 monorepo-dev 分支 `git checkout monorepo-dev`
4. 安装依赖：`pnpm i`
5. 启动开发服务器：`npm run dev:demo`
6. 在浏览器中访问：`http://localhost:5173`

## 如何贡献？

为了维护组件库代码提交规范性，采用以下流程提交代码。

### fork 项目

前往[项目主页](https://github.com/ecaps1038/yike-design-dev.git,"github主页") fork 工程至自己的 git 仓库，并基于此 git 仓库维护代码。

### 添加主仓库为远程仓库

执行下面 git 命令

```sh
git remote add upstream https://github.com/ecaps1038/yike-design-dev.git
```

### 提交 pr

每当你准备开始一个新的功能开发或提交 PR 前，请先从主仓库拉取最新的代码并合并到仓库的对应分支。

```sh
git checkout -b monorepo-dev
git fetch upstream
git merge upstream/monorepo-dev
```

### 创建需求分支

对于每次代码提交需求，本地需创建一个新的分支，请尽量避免在同一个分支上处理多个需求。

根据你需要开发的新功能，推荐采用：`${type}/${component}/${feat}` 分支命名规范。

其中，type 表示该分支类型，有以下选项：

- feature：功能分支
- fix：修复分支
- docs：文档修改分支
- refactor：重构分支

component 为你需要修改的组件，如 button、icon、upoload等。若需要修改脚手架能力，此处应为 base。

feat 为你需要具体修改的内容。此处定义根据功能自由命名，命名采用短横线命名法。

以下是具体例子:

- `feature/base/add-markdown-pure`
- `feature/button/add-style`
- `fix/icon/alignment-issue`
- `docs/upload/add-picture-demo`
- `refactor/base/refactor-router`

### 创建组件

使用指令 `npm run new component-name [组件名]`。

例如 `npm run new checkbox 复选框` 即可自动创建组件目录及文件。

在编写完代码后，在确保与目标分支不存在冲突的前提下可以将该功能分支提交 PR 到主仓库的对应分支（目前主要的开发分支为 monorepo-dev 分支）。

PR 将由具备权限的贡献者 CR 后进行 merge，若提交的功能影响面较广，CR 人员应当及时同其他成员共同参与讨论和检验。

## Commit 规范

我们推荐使用以下 commmit message 格式。

`${type}(${component}): ${commit-word}`

以下是具体实例，当然，中文的提交说明目前也是可接受的 !

- `feat(button): add styles for button component`
- `fix(icon): resolve alignment issue in icon component`
- `docs(upload): update README file`
- `refactor(base): refactor router module`

更多请阅读：<https://www.conventionalcommits.org/zh-hans/v1.0.0/>

## 目录结构

## 公共样式、方法及类型

**公共样式**：

Yike-Design 设计稿：<https://codesign.qq.com/s/6W3G0m4m8q9lOwL>

为保持组件库样式风格上的统一，请遵循 YIke 设计稿中的样式进行开发，并推荐采用 base.less 中提供的各通用样式如：

```less
@pcolor: #2b5aed; // 全局主色
@lcolor: #1890ff; // 链接色
@scolor: #1fb4a2; // 成功色
@wcolor: #f5ac08; // 警告色
@ecolor: #fa5247; // 错误色
@gray: #1e2025;
```

**公共类型**：

目前 utils 下方已有 tools.ts 提供公共方法 constance.ts 提供公共类型。

## 文档目录结构

文档目录应该按照以下结构进行组织：

```plaintext
yike-design-dev/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── README.md
└── packages/
    ├── yike-design-ui/               # 组件库主包
    │   ├── package.json
    │   │── index.ts              # 统一导出组件
    │   └── components/
    │       ├── button/
    │       │   ├── src/
    │       │   │   ├── button.vue
    │       │   │   └── button.ts
    │       │   └── style/
    │       │       ├── index.ts
    │       │       └── index.less
    │       └── ...                   # 其他组件
    ├── yike-design-resolver/        # 按需引入插件
    │   ├── package.json
    │   └── src/
    │       ├── index.ts
    │       └── _utils.ts
    ├── yike-design-build/           # 构建/打包工具
    │   ├── package.json
    │   └── scripts/
    │       ├── build-style.ts
    │       └── build-entry.ts
    └── yike-design-demo/            # 示例/文档项目
        ├── package.json
        ├── vite.config.ts
        ├── index.html
        └── src/
            ├── App.vue
            └── main.ts


```

⚠️ 每个组件目录下都应该包含一个 doc.md 文件和若干示例文件

### 组件文档 doc.md

组件文档使用 Markdown 格式编写，提供关于组件的说明、用法、API 等相关信息。以下是一个组件文档的基本结构示例：

```md
## yk-button 按钮 （文档首页标题）

<!-- ⚠️ snippet 标签内必须有三行内容对应所需填写的信息，如果不足将会造成解析错误 -->

:::snippet （每个demo对应信息采用 :::snippet::: 标志位进行维护）
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

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> size -> shape -> status -> disabled。

| 参数 | 描述       | 类型   | 可选值                             | 默认值    |
| ---- | ---------- | ------ | ---------------------------------- | --------- |
| type | 按钮的类型 | string | `primary`、`secondarly`、`outline` | `primary` |

- 每个demo对应信息采用 `:::snippet:::` 标志位进行维护
- 单个demo在doc.md中维护的信息有
  - Title: demo标题，说明该组组件demo共性
  - Desc: demo说明，支持md格式
  - DemoName demo名称，采用驼峰命名法的单标签，必须为文档目录下存在的文件，否则可能存在解析报错
- 每个demo文件⚠️只可在doc.md中引入一次

---

## 7.10 日新增

`:::pure:::` 标记符号，该标记位将直接渲染内部demo组件并自动引入相关依赖，具体用例如下：

### 线性图标展示

复制对应图标下的名称获取该图标。
:::pure
<IconPrimary/>
:::
```

### ⚠️ 组件开发目录结构标准

```plaintext
|- avatar: 单个组件的开发目录
  |- src: 源代码文件夹
    |- util.ts: 实用工具函数文件
    |- avatar.ts: 组件 types、interface、props 文件
    |- avatar.vue: 组件模板文件
  |- style: 样式文件夹
    |- index.less: 主样式文件
    |- index.ts: 样式导入文件
  |- index.ts: 组件入口文件
```
