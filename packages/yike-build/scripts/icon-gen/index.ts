import path from 'path';
import fg from 'fast-glob';
import fs from 'fs-extra';
import { JSDOM } from 'jsdom';
import { optimize } from 'svgo';
import svgoConfig from './svgo.config';
import { iconComponents, iconSvgPath } from '../../utils/paths';
import { toPascalCase } from '../../utils/convert-case';
import {
  genComponentIndex,
  genEntryContent,
  genIconIndex,
  genIconType,
  getIconVue,
} from './vue-template';
import { print } from '../../utils/print';

interface IconData {
  title: string;
  type: string;
  list: Array<{
    name: string;
    componentName: string;
    path: string;
  }>;
}

const maps = {
  outline: '线性图标',
  fill: '面性图标',
  color: '多彩图标',
};

export const getSvgData = () => {
  const data: IconData[] = [];
  Object.entries(maps).forEach(([key, value]) => {
    const iconData: IconData = {
      title: value,
      type: key,
      list: [],
    };
    const files = fg.sync(`${key}/**/*.svg`, {
      cwd: iconSvgPath,
      absolute: true,
    });
    files.forEach((filePath) => {
      const name = `icon-${path.basename(filePath, '.svg')}-${key}`;
      iconData.list.push({
        name,
        componentName: toPascalCase(name),
        path: filePath,
      });
    });

    data.push(iconData);
  });

  return data;
};

const buildIconComponent = async (data: IconData[]) => {
  await fs.emptyDir(iconComponents);

  data.forEach((iconData) => {
    for (const item of iconData.list) {
      const svgFile = fs.readFileSync(item.path, 'utf8');
      const optimizedSvg = optimize(svgFile, {
        path: item.path,
        ...svgoConfig,
      });
      if ('data' in optimizedSvg) {
        const { data } = optimizedSvg;
        const svgElement = JSDOM.fragment(data).firstElementChild;
        if (svgElement) {
          fs.outputFile(
            path.resolve(iconComponents, `${item.name}/${item.name}.vue`),
            getIconVue({
              name: item.name,
              componentName: item.componentName,
              svgHtml: svgElement.outerHTML,
            }),
            (err) => {
              if (err) {
                print('error', `Build ${item.componentName} failed: ${err}`);
              } else {
                print('success', `Build ${item.componentName} success!`);
              }
            },
          );
        }

        const iconIndex = genComponentIndex({
          name: item.name,
          componentName: item.componentName,
        });

        fs.outputFile(
          path.resolve(iconComponents, `${item.name}/index.ts`),
          iconIndex,
          (err) => {
            if (err) {
              print(
                'error',
                `Build ${item.componentName} index.ts failed: ${err}`,
              );
            } else {
              print('success', `Build ${item.componentName} index.ts success!`);
            }
          },
        );
      }
    }
  });
};

const buildIconEntry = (data: IconData[]) => {
  const imports: string[] = [];
  const exports: string[] = [];
  const components: string[] = [];

  data.forEach((iconData) => {
    iconData.list.forEach((icon) => {
      const { componentName, name } = icon;
      components.push(icon.componentName);
      imports.push(`import ${componentName} from './${name}'`);
      exports.push(`export {default as ${componentName} } from './${name}'`);
    });
  });

  const compComp = genEntryContent({ imports, components });
  fs.outputFile(
    path.resolve(iconComponents, 'yike-icon.ts'),
    compComp,
    (err) => {
      if (err) {
        print('error', `Build yike-icon.ts failed: ${err}`);
      } else {
        print('success', `Build yike-icon.ts success!`);
      }
    },
  );

  const entry = genIconIndex({ exports });
  fs.outputFile(path.resolve(iconComponents, 'index.ts'), entry, (err) => {
    if (err) {
      print('error', `Build icon index failed: ${err}`);
    } else {
      print('success', `Build icon index success!`);
    }
  });
};

function buildIconType(data: IconData[]) {
  const exports: string[] = [];
  for (const iconData of data) {
    for (const item of iconData.list) {
      exports.push(
        `${item.componentName}: typeof import('yike-design-ui/es/svg-icon')['${item.componentName}'];`,
      );
    }
  }

  const typeContent = genIconType({ exports });

  fs.outputFile(
    path.resolve(iconComponents, 'icon-components.ts'),
    typeContent,
    (err) => {
      if (err) {
        print('error', `Build icon type failed: ${err}`);
      } else {
        print('success', `Build icon type success!`);
      }
    },
  );
}

function buildIconJSON(data: IconData[]) {
  fs.outputFile(
    path.resolve(iconComponents, 'icons.json'),
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) {
        print('error', `Build JSON failed: ${err}`);
      } else {
        print('success', `Build JSON success!`);
      }
    },
  );
}

export const iconGen = async () => {
  const data = getSvgData();
  await buildIconComponent(data);
  buildIconEntry(data);
  buildIconType(data);
  buildIconJSON(data);
};
