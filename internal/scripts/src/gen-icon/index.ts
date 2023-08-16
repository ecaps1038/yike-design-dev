import path from 'path';
import fg from 'fast-glob';
import fs from 'fs-extra';
import { JSDOM } from 'jsdom';
import { optimize } from 'svgo';
import svgoConfig from './svgo.config';
import { getTemplate, iconMaps, IconNs } from './util';
import {
  print,
  iconsPath,
  componentsPath,
  toPascalCase,
} from '@yike/build-utils';

const svgIconPath = path.join(componentsPath, 'svg-icon');

export default async function genIcon() {
  const data = getSvgData(iconsPath);

  await genIconComponent(data);
  genIconEntryFiles(data);
  genIconTypeFile(data);
  genIconJSONFile(data);
}

export function getSvgData(svgPath: string) {
  const data: IconNs.IconData[] = [];

  Object.entries(iconMaps).forEach(([key, value]) => {
    const files = fg.sync(`${key}/*.svg`, {
      cwd: svgPath,
      absolute: true,
    });

    data.push({
      title: value,
      type: key,
      list: files.map((filePath) => {
        const name = `icon-${path.basename(filePath, '.svg')}-${key}`;

        return {
          name,
          componentName: toPascalCase(name),
          path: filePath,
        };
      }),
    });
  });

  return data;
}

// svg-icon/[component]/[component].vue
// svg-icon/[component]/index.ts
async function genIconComponent(data: IconNs.IconData[]) {
  try {
    await fs.emptyDir(svgIconPath);

    Promise.all(
      data.map((iconData) => {
        for (const item of iconData.list) {
          processIcon(item).then((result) => {
            if (!result) return;
            const { indexContent, vueContent } = result;

            outputIconFiles({
              item,
              indexContent,
              vueContent,
            });
          });
        }
      }),
    );
  } catch (error) {
    print('error', `Build failed: ${error}`);
  }
}

async function processIcon({ path, name, componentName }: IconNs.ListType) {
  const svgFile = await fs.readFile(path, 'utf8');
  const optimizedSvg = optimize(svgFile, {
    path,
    ...svgoConfig,
  });

  if (!('data' in optimizedSvg)) return;
  const data = optimizedSvg.data;
  const svgElement = JSDOM.fragment(data).firstElementChild;
  if (!svgElement) return;

  return {
    vueContent: getTemplate('iconVue', {
      name,
      componentName,
      svgHtml: svgElement.outerHTML,
    }),
    indexContent: getTemplate('iconIndex', {
      name,
      componentName,
    }),
  };
}

function outputIconFiles(data: {
  item: IconNs.ListType;
  vueContent: string;
  indexContent: string;
}) {
  const { item, vueContent, indexContent } = data;
  const iconDir = path.resolve(svgIconPath, item.name);
  const vueFilePath = path.join(iconDir, `${item.name}.vue`);
  const indexFilePath = path.join(iconDir, 'index.ts');

  fs.ensureDir(iconDir);
  fs.outputFile(vueFilePath, vueContent);
  fs.outputFile(indexFilePath, indexContent);

  print('success', `Build ${item.componentName} success!`);
}

// svg-icon/index.ts
// svg-icon/yike-icon.ts
function genIconEntryFiles(icons: IconNs.IconData[]) {
  const imports: string[] = [];
  const exports: string[] = [];
  const components: string[] = [];

  icons.forEach((iconData) => {
    iconData.list.forEach((icon) => {
      const { componentName, name } = icon;

      components.push(componentName);
      imports.push(`import ${componentName} from './${name}';`);
      exports.push(`export * from './${name}';`);
    });
  });

  const compComp = getTemplate('yikeIcon', { imports, components });
  const entry = getTemplate('index', { exports });

  try {
    fs.outputFile(path.resolve(svgIconPath, 'yike-icon.ts'), compComp);
    print('success', 'Build yike-icon.ts success!');

    fs.outputFile(path.resolve(svgIconPath, 'index.ts'), entry);
    print('success', 'Build icon index success!');
  } catch (error) {
    print('error', `Build failed: ${error}`);
  }
}

// svg-icon/icon-components.ts
function genIconTypeFile(data: IconNs.IconData[]) {
  const iconPath = 'yike-design-ui/es/svg-icon';
  const exports: string[] = [];

  for (const iconData of data) {
    for (const item of iconData.list) {
      const compName = item.componentName;

      exports.push(`${compName}: typeof import('${iconPath}')['${compName}'];`);
    }
  }

  const typeContent = getTemplate('iconComponents', { exports });

  try {
    fs.outputFile(path.resolve(svgIconPath, 'icon-components.ts'), typeContent);
    print('success', 'Build icon type success!');
  } catch (error) {
    print('error', `Build icon type failed: ${error}`);
  }
}

// svg-icon/icons.json
function genIconJSONFile(data: IconNs.IconData[]) {
  const iconsJsonPath = path.resolve(svgIconPath, 'icons.json');

  try {
    fs.writeJSON(iconsJsonPath, data, { spaces: 2 });
    print('success', 'Build JSON success!');
  } catch (error) {
    print('error', `Build JSON failed: ${error}`);
  }
}
