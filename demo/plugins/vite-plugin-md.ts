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
    return escapeString(content);
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
        xhtmlOut: true,
        // 将markdown中的代码块用hljs高亮显示
        highlight(str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value
              }</code></pre>`;
          }
          return `<pre class="hljs"><code>${markdownIt.utils.escapeHtml(
            str,
          )}</code></pre>`;
        },
      });
      const snappetPattern = /:::snippet\s+(.*?)\s+:::/gs;
      const matchs = src.matchAll(snappetPattern)
      for (const match of matchs) {
        const [title, desc, demoName] = match[1].split('\n')
        const tagPattern = /<(\w+)\/>/;
        const demoTagName = demoName.match(tagPattern)[1]
        const demoComponentName = camelToDashCase(demoTagName)
        const demoCode = fetchDemoCode(demoComponentName, id)
        importContent += `import ${demoTagName} from './${demoComponentName}.vue';\n`
        const caseCardContent = `<CaseCard
        title="${title}"
        note="${desc}"
        code="123">
        ${demoName}</CaseCard>`
        src = src.replace(match[0], caseCardContent)
      }
      return {
        code: `
        <script setup>
          ${importContent}
        </script>
        <template>
          ${markdownIt.render(src)}
        </template>`,
        map: null,
      };
    }
  },
});
