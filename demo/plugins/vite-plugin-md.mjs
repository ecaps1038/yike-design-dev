import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import fs from 'fs'
import path from 'path'

export function camelToDashCase(str) {
  return str.replace(/([a-zA-Z])([A-Z])/g, '$1-$2').toLowerCase()
}

// fetch demo source code by relative path
export function fetchDemoCode(componentName, id) {
  const targetFile = `${componentName}.vue`
  const absolutePath = path.resolve(path.dirname(id), targetFile)
  try {
    const content = fs.readFileSync(absolutePath, 'utf-8')
    return content
  } catch (error) {
    return ''
  }
}

export default () => ({
  name: 'vitePluginMarkdown',
  transform(src, id) {
    if (id.endsWith('.md')) {
      // 导入demo组件依赖
      let importContent = ''
      // 依赖桶，防止重复引入
      const importBucket = new Set()
      // 初始还MarkdownIt用于转换md文件为html

      const markdownIt = MarkdownIt({
        html: true,
        xhtmlOut: false,
      })

      // parse primary markdown docs
      if (!id.includes('demo/src')) {
        return {
          code: `<template>
          <div class='yk-demo-doc'>
          ${markdownIt.render(src)}
        </div>
        </template>`,
        }
      }

      // match ::snippet::: blocks
      const snippetPattern = /:::snippet\s+(.*?)\s+:::/gs
      const matches = src.matchAll(snippetPattern)
      for (const match of matches) {
        // parse three lines in snippet block
        const [title, desc, demoName] = match[1].split('\n')

        // match demo Vue components
        const tagPattern = /<(\w+)\/>/
        const demoTagName = demoName.match(tagPattern)[1] // <ButtonPrimary/> -> ButtonPrimary
        const demoComponentName = camelToDashCase(demoTagName).replace(
          /([a-zA-Z])([A-Z])/g,
          '$1-$2',
        ) // ButtonPrimary -> button-primary

        const demoCode = fetchDemoCode(demoComponentName, id).replace(
          /{{/g,
          '{ {',
        ) // fix {{}} in <pre> render
        const html = hljs.highlightAuto(demoCode).value

        const importLine = `import ${demoTagName} from './${demoComponentName}.vue';\n`
        if (!importBucket.has(importLine)) {
          importContent += importLine
          importBucket.add(importLine)
        }
        //import vue dependence
        const caseCardContent = `<yk-snippet title="${title}">
          <template v-slot:demo>${demoName}</template>
          <template v-slot:desc>${markdownIt.render(desc)}</template>
          <template v-slot:code>
            <pre class='hljs'><code>${html}</code></pre>
          </template>
        </yk-snippet>
        `
        src = src.replace(match[0], caseCardContent) // html render
      }

      // match ::pure::: blocks
      const purePattern = /:::pure\s+(.*?)\s+:::/gs
      const pureMatches = src.matchAll(purePattern)
      for (const match of pureMatches) {
        const demoName = match[1]
        const tagPattern = /<(\w+)\/>/
        const demoTagName = demoName.match(tagPattern)[1]
        const demoComponentName = camelToDashCase(demoTagName)

        const importLine = `import ${demoTagName} from './${demoComponentName}.vue';\n`
        if (!importBucket.has(importLine)) {
          importContent += importLine
          importBucket.add(importLine)
        }

        src = src.replace(
          match[0],
          `\n<div class='yk-pure-doc'>${demoName}</div>`,
        )
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
      }
    }
  },
})
