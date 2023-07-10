import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import fs from 'fs';
import path from 'path';
export function camelToDashCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
export function fetchDemoCode(componentName, id) {
  const targetFile = `${componentName}.vue`
  const absolutePath = path.resolve(path.dirname(id), targetFile);
  try {
    // 读取文件内容
    const content = fs.readFileSync(absolutePath, 'utf-8');
    return content;
  } catch (error) {
    // 处理错误
    console.error(`Failed to read file "${componentName}": ${error}`);
    return '';
  }
}
export function escapeString(str) {
  // 使用正则表达式进行转义
  return str.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
}

export default () => ({
  name: 'vitePluginMarkdown',
  transform(src, id) {
    if (id.endsWith('.md')) {
      // 导入demo组件依赖
      let importContent = ''
      // 初始还MarkdownIt用于转换md文件为html
      const markdownIt = MarkdownIt({
        html: true,
        xhtmlOut: false,
      });
      const snippetPattern = /:::snippet\s+(.*?)\s+:::/gs;
      const matches = src.matchAll(snippetPattern)
      for (const match of matches) {
        const [title, desc, demoName] = match[1].split('\n')
        const tagPattern = /<(\w+)\/>/;
        const demoTagName = demoName.match(tagPattern)[1]
        const demoComponentName = camelToDashCase(demoTagName)
        const demoCode = fetchDemoCode(demoComponentName, id).replace(/ /g, '\u00A0')
        const html = hljs.highlightAuto(demoCode).value
        importContent += `import ${demoTagName} from './${demoComponentName}.vue';\n`
        const caseCardContent = `<Snippet
        title="${title}"
       >
          <template v-slot:demo>${demoName}</template>
          <template v-slot:desc>${markdownIt.render(desc)}</template>
          <template v-slot:code>
            <pre><code class='hljs'>${html}</code></pre>
          </template>
        </Snippet>
        `
        src = src.replace(match[0], caseCardContent)
      }
      return {
        code: `
        <script setup>
          ${importContent}
        </script>
        <template>
          <div class='yk-demo-doc'>
            ${markdownIt.render(src)}
          </div>
        </template>`,
        map: null,
      };
    }
  },
});
