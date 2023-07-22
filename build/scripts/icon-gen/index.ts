import path from 'path';
import fg from 'fast-glob';
import fs from 'fs-extra';
import { JSDOM } from 'jsdom';
import { optimize } from 'svgo';
import svgoConfig from './svgo.config';
import { iconComponents, iconSvgPath, root } from '../../utils/paths';
import { toPascalCase } from '../../utils/convert-case';
import {
  genEntryContent,
  genIconIndex,
  genIconType,
  getIconVue,
} from './vue-template';

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
  outline: '线形图标',
  fill: '面性图标',
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
            path.resolve(iconComponents, `${iconData.type}/${item.name}.vue`),
            getIconVue({
              name: item.name,
              componentName: item.componentName,
              svgHtml: svgElement.outerHTML,
            }),
            (err) => {
              if (err) {
                console.log(`Build ${item.componentName} Failed: ${err}`);
              } else {
                console.log(`Build ${item.componentName} Success!`);
              }
            },
          );
        }
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
      imports.push(
        `import ${componentName} from './${iconData.type}/${name}.vue'`,
      );
      exports.push(
        `export {default as ${componentName} } from './${iconData.type}/${name}.vue'`,
      );
    });
  });

  const compComp = genEntryContent({ imports, components });
  fs.outputFile(
    path.resolve(iconComponents, 'yike-icon.ts'),
    compComp,
    (err) => {
      if (err) {
        console.log(`Build YikeIcon Failed: ${err}`);
      } else {
        console.log('Build YikeIcon Success!');
      }
    },
  );

  const entry = genIconIndex({ exports });
  fs.outputFile(path.resolve(iconComponents, 'index.ts'), entry, (err) => {
    if (err) {
      console.log(`Build Index Failed: ${err}`);
    } else {
      console.log('Build Index Success!');
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
        console.log(`Build Type Failed: ${err}`);
      } else {
        console.log('Build Type Success!');
      }
    },
  );
}

export const iconGen = async () => {
  const data = getSvgData();
  await buildIconComponent(data);
  buildIconEntry(data);
  buildIconType(data);
};
