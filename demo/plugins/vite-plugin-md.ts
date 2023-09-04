import path from 'path';
import fs from 'fs-extra';
import MarkdownIt from 'markdown-it';
import { mdCustomH3, mdCustomLinkCls } from './md-plugin';
import { getTemplates, replaceVariables } from './util';
import { Plugin } from 'vite';

const md = MarkdownIt({
  html: true,
  xhtmlOut: false,
});

md.use(mdCustomH3);
md.use(mdCustomLinkCls);

const templates = getTemplates('./vite-plugin-md.md');
const getTemplate = (flag: string, variables: unknown) =>
  replaceVariables(templates[flag], variables);

export default function (): Plugin {
  return {
    name: 'vitePluginMarkdown',
    transform(code: string, id: string) {
      if (!id.endsWith('.md')) return;
      if (!id.includes('demo/src')) {
        // /yike-design-dev/CONTRIBUTING.md
        return {
          code: getTemplate('CONTRIBUTING', {
            content: md.render(code),
          }),
        };
      }

      // demo/src/*
      const importBucket = new Set<string>();
      const result = transformSnippetOrPure(id, code, importBucket);
      const importContent = Array.from(importBucket).join('\n');

      return {
        map: null,
        code: getTemplate('default', {
          importContent,
          content: md
            .render(result)
            .replace(
              /(<table>[\s\S]*?<\/table>)/g,
              '<div class="table-container">$1</div>',
            ),
        }),
      };
    },
  };
}

function transformSnippetOrPure(
  id: string,
  code: string,
  importBucket: Set<string>,
) {
  const tagReg = /<(\w+)\s?\/>/;
  /** @see https://regex101.com/r/ySFiGU/3 */
  const snippetReg =
    /(?<q>:{3})(?<flag>snippet|pure)\s+(?<content>[\s\S]+?)\s+\k<q>/g;
  const matches = code.matchAll(snippetReg);
  let result = code;

  for (const match of matches) {
    const { flag, content } = match.groups;
    const { title, desc, demoName } = handleMatch(content);
    const demoTagName = demoName.match(tagReg)[1];
    const demoCompName = toKebabCase(demoTagName);
    const demoCode = fetchDemoCode(id, demoCompName);
    const importItem = `import ${demoTagName} from './${demoCompName}.vue';`;

    if (!importBucket.has(importItem)) {
      importBucket.add(importItem);
    }

    result = result.replace(
      match[0],
      getTemplate(flag, {
        title,
        demoName,
        demoCode: encodeURIComponent(demoCode),
        content: md.render(desc),
      }),
    );
  }

  return result;
}

function handleMatch(content: string) {
  const lines = content.split(/\r?\n/);
  const len = lines.length;

  if (len === 1) {
    return {
      title: '',
      desc: '',
      demoName: lines[0],
    };
  } else if (len === 2) {
    return {
      title: lines[0],
      desc: '<p></p>',
      demoName: lines[1],
    };
  } else {
    return {
      title: lines[0],
      desc: lines[1] || '<p></p>',
      demoName: lines[2],
    };
  }
}

// fetch demo source code by relative path
export function fetchDemoCode(id: string, componentName: string) {
  const targetFile = `${componentName}.vue`;
  const absolutePath = path.resolve(path.dirname(id), targetFile);

  try {
    return fs.readFileSync(absolutePath, 'utf-8');
  } catch (error) {
    console.error(error);
  }
}

/** @example ButtonPrimary -> button-primary */
export function toKebabCase(str: string) {
  return str.replace(/([a-zA-Z])([A-Z])/g, '$1-$2').toLowerCase();
}
