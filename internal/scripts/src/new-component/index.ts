import fs from 'fs-extra';
import readline from 'readline';
import { resolve } from 'path';
import {
  print,
  toPascalCase,
  getTemplates,
  replaceVariables,
  componentsPath,
  rootPath,
  yikePath,
  examplePath,
  routerPath,
} from '@yike/build-utils';
import { glob } from 'fast-glob';

interface NamesType {
  descName: string;
  lowDashName: string;
  upperCompName: string;
  tagName: string;
  propsName: string;
  upperFullCompName: string;
}

interface ImportMate {
  sortKey: string;
  data: string;
  childs: string[] | string;
}

interface Bar {
  title: string;
  list: Array<{
    name: string;
    src: string;
  }>;
}

const templates = getTemplates('new-component.md');
const getTemplate = (flag: string, data: object) => {
  return replaceVariables(templates[flag], data);
};

export default async function newComponent() {
  const [lowDashName, descName] = process.argv.slice(3);
  const data = handleCompName(lowDashName, descName);

  checkCompStatus(data);
  await selectAndAddRoute(data);
  await addCompRouter(data);
  createMainFiles(data, () => {
    Promise.all([
      updateImportStates(data),
      updateCompExport(),
      updateLessExport(),
    ]);
  });
}

function checkCompStatus({ lowDashName, descName }: NamesType) {
  if (!lowDashName || /[A-Z]/.test(lowDashName)) {
    print('warning', '请采用短横线为组件命名');
    print('warning', '如：npm run new back-top 回到顶部');
    process.exit(233);
  }

  if (!descName) {
    print('warning', '请输入正确的组件名称');
    print('warning', '如：npm run new pagination 分页');
    print('warning', '如：npm run new back-top 回到顶部');
    process.exit(233);
  }

  if (fs.existsSync(`${componentsPath}/${lowDashName}`)) {
    print('error', `${lowDashName} 组件已存在，请检查是否存在冲突`);
    process.exit(233);
  }
}

function handleCompName(lowDashName: string, descName: string) {
  const upperCompName = toPascalCase(lowDashName);

  return {
    descName,
    lowDashName,
    upperCompName,
    tagName: `Yk-${lowDashName}`,
    propsName: `${upperCompName}Props`,
    upperFullCompName: `Yk${upperCompName}`,
  };
}

async function selectAndAddRoute({
  lowDashName,
  upperCompName,
  descName,
}: NamesType) {
  const barFile = resolve(routerPath, 'config', 'bar.json');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const barFileData: Bar[] = await fs.readJSON(barFile);
    const titleList = barFileData.map((item, i) => `${i + 1}: ${item.title}`);

    print(
      'info',
      `请选择 ${lowDashName} 所属的组件分类:\n${titleList.join('\n')}`,
    );

    const answer = await new Promise((resolve) =>
      rl.question('请输入您的选择 (数字)：', resolve),
    );

    barFileData[Number(answer) - 1].list.push({
      name: `${upperCompName} ${descName}`,
      src: lowDashName,
    });
    fs.writeJSONSync(barFile, barFileData, { spaces: 2 });
    print('info', '开始创建组件...');
    rl.close();
  } catch (err: any) {
    print('error', err);
    process.exit(233);
  }
}

async function createMainFiles(
  {
    lowDashName,
    descName,
    upperCompName,
    upperFullCompName,
    tagName,
    propsName,
  }: NamesType,
  func: () => void,
) {
  const compPath = resolve(componentsPath, lowDashName);
  const srcPath = resolve(compPath, 'src');
  const stylePath = resolve(compPath, 'style');
  const compExamplePath = resolve(examplePath, lowDashName);
  const flagOption = {
    index: resolve(compPath, 'index.ts'),
    srcVue: resolve(srcPath, `${lowDashName}.vue`),
    srcTS: resolve(srcPath, `${lowDashName}.ts`),
    styleLess: resolve(stylePath, 'index.less'),
    styleTS: resolve(stylePath, 'index.ts'),
    doc: resolve(compExamplePath, 'doc.md'),
    primary: resolve(compExamplePath, `${lowDashName}Primary.vue`),
  };

  try {
    Promise.all(
      Object.entries(flagOption).map(async ([flag, path]) => {
        await fs.outputFile(
          path,
          getTemplate(flag, {
            lowDashName,
            descName,
            upperCompName,
            upperFullCompName,
            tagName,
            propsName,
          }),
        );
        print('success', `已生成 ${path.slice(rootPath.length)}`);
      }),
    ).then(() => func());
  } catch (err: any) {
    print('error', err);
    process.exit(233);
  }
}

function updateImportStates(nameOption: NamesType) {
  const filePath = resolve(yikePath, 'component.ts');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const carry = processImportState(nameOption, data);

    carry.sort((a: any, b: any) => {
      const porpA = a.sortKey;
      const propB = b.sortKey;
      return porpA.localeCompare(propB);
    });
    fs.outputFileSync(
      filePath,
      getTemplate('component', {
        importItems: carry.map((item) => item.data),
        lists: carry.map((item) => item.childs).flat(),
      }),
    );
    print('success', `已更新 ${filePath.slice(rootPath.length)}`);
  } catch (err: any) {
    print('error', err);
    process.exit(233);
  }
}

function processImportState(
  { lowDashName, upperFullCompName }: NamesType,
  data: string,
) {
  /** @see https://regex101.com/r/9fTD0A/1 */
  const importRegex =
    /import\s+({[^}]+}|[^{}\n]+)\s+from.+components\/(.+)['"];?/g;
  let match: RegExpExecArray | null;
  const carry = new Set<ImportMate>([
    {
      sortKey: lowDashName,
      data: `import ${upperFullCompName} from '@yike/components/${lowDashName}';`,
      childs: upperFullCompName,
    },
  ]);

  while ((match = importRegex.exec(data))) {
    const [matchString, childs, compName] = match;

    carry.add({
      sortKey: compName,
      data: matchString,
      childs:
        childs?.at(0) === '{'
          ? childs
              .replace(/[{\s}]+/g, '')
              .split(',')
              .filter(Boolean)
          : childs,
    });
  }

  return Array.from(carry);
}

function updateCompExport() {
  const content: string[] = [];
  const compPath = resolve(componentsPath, 'index.ts');
  const files = glob.sync('*', {
    deep: 0,
    onlyDirectories: true,
    ignore: ['**/node_modules'],
    cwd: componentsPath,
  });

  try {
    files.forEach((comp) => content.push(`export * from './${comp}';`));
    fs.outputFileSync(compPath, content.join('\n'));
    print('success', `已更新 ${compPath.slice(rootPath.length)}`);
  } catch (err: any) {
    print('error', err);
    process.exit(233);
  }
}

function updateLessExport() {
  const lessContent = ["@import '@yike/styles/index.less';\n"];
  const lessPath = resolve(yikePath, 'index.less');
  const lessFile = glob.sync('**/style/index.less', {
    cwd: componentsPath,
  });

  try {
    lessFile.forEach((f) =>
      lessContent.push(`@import '@yike/components/${f}';`),
    );
    fs.outputFileSync(lessPath, lessContent.join('\n'));
    print('success', `已更新 ${lessPath.slice(rootPath.length)}`);
  } catch (err: any) {
    print('error', err);
    process.exit(233);
  }
}

async function addCompRouter({ lowDashName }: NamesType) {
  const generalPath = `${routerPath}/modules/general.ts`;
  const carry = `  {
    path: '${lowDashName}',
    component: () => import('@/examples/${lowDashName}/doc.md'),
  },
]`;

  try {
    const fileContent = await fs.readFile(generalPath, 'utf-8');
    const replaceConent = fileContent.replace(']', carry);

    await fs.outputFile(generalPath, replaceConent);
    print('success', '成功添加路由配置');
  } catch (err: any) {
    print('error', err);
    process.exit(233);
  }
}
