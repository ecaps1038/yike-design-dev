// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///Users/artsmp/Documents/studyspace/os-code/yike-design-dev/node_modules/.pnpm/vite@4.0.0_@types+node@18.11.12_less@4.0.0/node_modules/vite/dist/node/index.js";
import createVuePlugin from "file:///Users/artsmp/Documents/studyspace/os-code/yike-design-dev/node_modules/.pnpm/@vitejs+plugin-vue@4.2.2_vite@4.0.0_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/artsmp/Documents/studyspace/os-code/yike-design-dev/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.1_vite@4.4.7_vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";

// plugins/vite-plugin-md.mjs
import MarkdownIt from "file:///Users/artsmp/Documents/studyspace/os-code/yike-design-dev/node_modules/.pnpm/markdown-it@12.3.2/node_modules/markdown-it/index.js";
import hljs from "file:///Users/artsmp/Documents/studyspace/os-code/yike-design-dev/node_modules/.pnpm/highlight.js@11.7.0/node_modules/highlight.js/es/index.js";
import fs from "fs";
import path from "path";
function camelToDashCase(str) {
  return str.replace(/([a-zA-Z])([A-Z])/g, "$1-$2").toLowerCase();
}
function fetchDemoCode(componentName, id) {
  const targetFile = `${componentName}.vue`;
  const absolutePath = path.resolve(path.dirname(id), targetFile);
  try {
    const content = fs.readFileSync(absolutePath, "utf-8");
    return content;
  } catch (error) {
    return "";
  }
}
var vite_plugin_md_default = () => ({
  name: "vitePluginMarkdown",
  transform(src, id) {
    if (id.endsWith(".md")) {
      let importContent = "";
      const importBucket = /* @__PURE__ */ new Set();
      const markdownIt = MarkdownIt({
        html: true,
        xhtmlOut: false
      });
      if (!id.includes("demo/src")) {
        return {
          code: `<template>
          <div class='yk-demo-doc'>
          ${markdownIt.render(src)}
        </div>
        </template>`
        };
      }
      const snippetPattern = /:::snippet\s+(.*?)\s+:::/gs;
      const matches = src.matchAll(snippetPattern);
      for (const match of matches) {
        const [title, desc, demoName] = match[1].split("\n");
        const tagPattern = /<(\w+)\/>/;
        const demoTagName = demoName.match(tagPattern)[1];
        const demoComponentName = camelToDashCase(demoTagName).replace(
          /([a-zA-Z])([A-Z])/g,
          "$1-$2"
        );
        const demoCode = fetchDemoCode(demoComponentName, id);
        const importLine = `import ${demoTagName} from './${demoComponentName}.vue';
`;
        if (!importBucket.has(importLine)) {
          importContent += importLine;
          importBucket.add(importLine);
        }
        const caseCardContent = `<yk-snippet title="${title}" code="${encodeURIComponent(
          demoCode
        )}" >
          <template v-slot:demo>${demoName}</template>
          <template v-slot:desc>${markdownIt.render(desc)}</template>
        </yk-snippet>
        `;
        src = src.replace(match[0], caseCardContent);
      }
      const purePattern = /:::pure\s+(.*?)\s+:::/gs;
      const pureMatches = src.matchAll(purePattern);
      for (const match of pureMatches) {
        const demoName = match[1];
        const tagPattern = /<(\w+)\/>/;
        const demoTagName = demoName.match(tagPattern)[1];
        const demoComponentName = camelToDashCase(demoTagName);
        const importLine = `import ${demoTagName} from './${demoComponentName}.vue';
`;
        if (!importBucket.has(importLine)) {
          importContent += importLine;
          importBucket.add(importLine);
        }
        src = src.replace(
          match[0],
          `
<div class='yk-pure-doc'>${demoName}</div>`
        );
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
        map: null
      };
    }
  }
});

// vite.config.ts
import Components from "file:///Users/artsmp/Documents/studyspace/os-code/yike-design-dev/node_modules/.pnpm/unplugin-vue-components@0.25.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import path2 from "path";
var __vite_injected_original_dirname = "/Users/artsmp/Documents/studyspace/os-code/yike-design-dev/demo";
var __vite_injected_original_import_meta_url = "file:///Users/artsmp/Documents/studyspace/os-code/yike-design-dev/demo/vite.config.ts";
var vuePlugin = createVuePlugin({ include: [/\.vue$/, /\.md$/] });
var compDir = path2.resolve(__vite_injected_original_dirname, "..\\packages\\yike-design-ui\\src\\index.ts").replace(/\\/g, "/");
var aliasDir = fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  plugins: [
    vite_plugin_md_default(),
    vuePlugin,
    vueJsx(),
    Components({
      resolvers: [
        (componentName) => {
          if (componentName.startsWith("Yk"))
            return { name: componentName, from: compDir };
        }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": aliasDir
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import (reference) "../packages/yike-design-ui/src/styles/index.less";'
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGx1Z2lucy92aXRlLXBsdWdpbi1tZC5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYXJ0c21wL0RvY3VtZW50cy9zdHVkeXNwYWNlL29zLWNvZGUveWlrZS1kZXNpZ24tZGV2L2RlbW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hcnRzbXAvRG9jdW1lbnRzL3N0dWR5c3BhY2Uvb3MtY29kZS95aWtlLWRlc2lnbi1kZXYvZGVtby92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYXJ0c21wL0RvY3VtZW50cy9zdHVkeXNwYWNlL29zLWNvZGUveWlrZS1kZXNpZ24tZGV2L2RlbW8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBjcmVhdGVWdWVQbHVnaW4gZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XG5pbXBvcnQgdml0ZVBsdWdpbk1hcmtkb3duIGZyb20gJy4vcGx1Z2lucy92aXRlLXBsdWdpbi1tZC5tanMnO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmNvbnN0IHZ1ZVBsdWdpbiA9IGNyZWF0ZVZ1ZVBsdWdpbih7IGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXSB9KTsgLy8gXHU5MTREXHU3RjZFXHU1M0VGXHU3RjE2XHU4QkQxIC52dWUgXHU0RTBFIC5tZCBcdTY1ODdcdTRFRjZcblxuY29uc3QgY29tcERpciA9IHBhdGhcbiAgLnJlc29sdmUoX19kaXJuYW1lLCAnLi5cXFxccGFja2FnZXNcXFxceWlrZS1kZXNpZ24tdWlcXFxcc3JjXFxcXGluZGV4LnRzJylcbiAgLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcbmNvbnN0IGFsaWFzRGlyID0gZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdml0ZVBsdWdpbk1hcmtkb3duKCksXG4gICAgdnVlUGx1Z2luLFxuICAgIHZ1ZUpzeCgpIGFzIGFueSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAoY29tcG9uZW50TmFtZSkgPT4ge1xuICAgICAgICAgIGlmIChjb21wb25lbnROYW1lLnN0YXJ0c1dpdGgoJ1lrJykpXG4gICAgICAgICAgICByZXR1cm4geyBuYW1lOiBjb21wb25lbnROYW1lLCBmcm9tOiBjb21wRGlyIH07XG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogYWxpYXNEaXIsXG4gICAgfSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgLy8gY3NzXHU5ODg0XHU1OTA0XHU3NDA2XHU1NjY4XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgbGVzczoge1xuICAgICAgICBjaGFyc2V0OiBmYWxzZSxcbiAgICAgICAgYWRkaXRpb25hbERhdGE6XG4gICAgICAgICAgJ0BpbXBvcnQgKHJlZmVyZW5jZSkgXCIuLi9wYWNrYWdlcy95aWtlLWRlc2lnbi11aS9zcmMvc3R5bGVzL2luZGV4Lmxlc3NcIjsnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hcnRzbXAvRG9jdW1lbnRzL3N0dWR5c3BhY2Uvb3MtY29kZS95aWtlLWRlc2lnbi1kZXYvZGVtby9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYXJ0c21wL0RvY3VtZW50cy9zdHVkeXNwYWNlL29zLWNvZGUveWlrZS1kZXNpZ24tZGV2L2RlbW8vcGx1Z2lucy92aXRlLXBsdWdpbi1tZC5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FydHNtcC9Eb2N1bWVudHMvc3R1ZHlzcGFjZS9vcy1jb2RlL3lpa2UtZGVzaWduLWRldi9kZW1vL3BsdWdpbnMvdml0ZS1wbHVnaW4tbWQubWpzXCI7aW1wb3J0IE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnXG5pbXBvcnQgaGxqcyBmcm9tICdoaWdobGlnaHQuanMnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsVG9EYXNoQ2FzZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oW2EtekEtWl0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpXG59XG5cbi8vIGZldGNoIGRlbW8gc291cmNlIGNvZGUgYnkgcmVsYXRpdmUgcGF0aFxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoRGVtb0NvZGUoY29tcG9uZW50TmFtZSwgaWQpIHtcbiAgY29uc3QgdGFyZ2V0RmlsZSA9IGAke2NvbXBvbmVudE5hbWV9LnZ1ZWBcbiAgY29uc3QgYWJzb2x1dGVQYXRoID0gcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZShpZCksIHRhcmdldEZpbGUpXG4gIHRyeSB7XG4gICAgY29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhhYnNvbHV0ZVBhdGgsICd1dGYtOCcpXG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gJydcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiAoe1xuICBuYW1lOiAndml0ZVBsdWdpbk1hcmtkb3duJyxcbiAgdHJhbnNmb3JtKHNyYywgaWQpIHtcbiAgICBpZiAoaWQuZW5kc1dpdGgoJy5tZCcpKSB7XG4gICAgICAvLyBcdTVCRkNcdTUxNjVkZW1vXHU3RUM0XHU0RUY2XHU0RjlEXHU4RDU2XG4gICAgICBsZXQgaW1wb3J0Q29udGVudCA9ICcnXG4gICAgICAvLyBcdTRGOURcdThENTZcdTY4NzZcdUZGMENcdTk2MzJcdTZCNjJcdTkxQ0RcdTU5MERcdTVGMTVcdTUxNjVcbiAgICAgIGNvbnN0IGltcG9ydEJ1Y2tldCA9IG5ldyBTZXQoKVxuICAgICAgLy8gXHU1MjFEXHU1OUNCXHU4RkQ4TWFya2Rvd25JdFx1NzUyOFx1NEU4RVx1OEY2Q1x1NjM2Mm1kXHU2NTg3XHU0RUY2XHU0RTNBaHRtbFxuXG4gICAgICBjb25zdCBtYXJrZG93bkl0ID0gTWFya2Rvd25JdCh7XG4gICAgICAgIGh0bWw6IHRydWUsXG4gICAgICAgIHhodG1sT3V0OiBmYWxzZSxcbiAgICAgIH0pXG5cbiAgICAgIC8vIHBhcnNlIHByaW1hcnkgbWFya2Rvd24gZG9jc1xuICAgICAgaWYgKCFpZC5pbmNsdWRlcygnZGVtby9zcmMnKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvZGU6IGA8dGVtcGxhdGU+XG4gICAgICAgICAgPGRpdiBjbGFzcz0neWstZGVtby1kb2MnPlxuICAgICAgICAgICR7bWFya2Rvd25JdC5yZW5kZXIoc3JjKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdGVtcGxhdGU+YCxcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBtYXRjaCA6OnNuaXBwZXQ6OjogYmxvY2tzXG4gICAgICBjb25zdCBzbmlwcGV0UGF0dGVybiA9IC86OjpzbmlwcGV0XFxzKyguKj8pXFxzKzo6Oi9nc1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IHNyYy5tYXRjaEFsbChzbmlwcGV0UGF0dGVybilcbiAgICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykge1xuICAgICAgICAvLyBwYXJzZSB0aHJlZSBsaW5lcyBpbiBzbmlwcGV0IGJsb2NrXG4gICAgICAgIGNvbnN0IFt0aXRsZSwgZGVzYywgZGVtb05hbWVdID0gbWF0Y2hbMV0uc3BsaXQoJ1xcbicpXG5cbiAgICAgICAgLy8gbWF0Y2ggZGVtbyBWdWUgY29tcG9uZW50c1xuICAgICAgICBjb25zdCB0YWdQYXR0ZXJuID0gLzwoXFx3KylcXC8+L1xuICAgICAgICBjb25zdCBkZW1vVGFnTmFtZSA9IGRlbW9OYW1lLm1hdGNoKHRhZ1BhdHRlcm4pWzFdIC8vIDxCdXR0b25QcmltYXJ5Lz4gLT4gQnV0dG9uUHJpbWFyeVxuICAgICAgICBjb25zdCBkZW1vQ29tcG9uZW50TmFtZSA9IGNhbWVsVG9EYXNoQ2FzZShkZW1vVGFnTmFtZSkucmVwbGFjZShcbiAgICAgICAgICAvKFthLXpBLVpdKShbQS1aXSkvZyxcbiAgICAgICAgICAnJDEtJDInLFxuICAgICAgICApIC8vIEJ1dHRvblByaW1hcnkgLT4gYnV0dG9uLXByaW1hcnlcblxuICAgICAgICBjb25zdCBkZW1vQ29kZSA9IGZldGNoRGVtb0NvZGUoZGVtb0NvbXBvbmVudE5hbWUsIGlkKVxuICAgICAgICBjb25zdCBpbXBvcnRMaW5lID0gYGltcG9ydCAke2RlbW9UYWdOYW1lfSBmcm9tICcuLyR7ZGVtb0NvbXBvbmVudE5hbWV9LnZ1ZSc7XFxuYFxuICAgICAgICBpZiAoIWltcG9ydEJ1Y2tldC5oYXMoaW1wb3J0TGluZSkpIHtcbiAgICAgICAgICBpbXBvcnRDb250ZW50ICs9IGltcG9ydExpbmVcbiAgICAgICAgICBpbXBvcnRCdWNrZXQuYWRkKGltcG9ydExpbmUpXG4gICAgICAgIH1cbiAgICAgICAgLy9pbXBvcnQgdnVlIGRlcGVuZGVuY2VcbiAgICAgICAgY29uc3QgY2FzZUNhcmRDb250ZW50ID0gYDx5ay1zbmlwcGV0IHRpdGxlPVwiJHt0aXRsZX1cIiBjb2RlPVwiJHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgZGVtb0NvZGUsXG4gICAgICAgICl9XCIgPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6ZGVtbz4ke2RlbW9OYW1lfTwvdGVtcGxhdGU+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpkZXNjPiR7bWFya2Rvd25JdC5yZW5kZXIoZGVzYyl9PC90ZW1wbGF0ZT5cbiAgICAgICAgPC95ay1zbmlwcGV0PlxuICAgICAgICBgXG4gICAgICAgIHNyYyA9IHNyYy5yZXBsYWNlKG1hdGNoWzBdLCBjYXNlQ2FyZENvbnRlbnQpIC8vIGh0bWwgcmVuZGVyXG4gICAgICB9XG5cbiAgICAgIC8vIG1hdGNoIDo6cHVyZTo6OiBibG9ja3NcbiAgICAgIGNvbnN0IHB1cmVQYXR0ZXJuID0gLzo6OnB1cmVcXHMrKC4qPylcXHMrOjo6L2dzXG4gICAgICBjb25zdCBwdXJlTWF0Y2hlcyA9IHNyYy5tYXRjaEFsbChwdXJlUGF0dGVybilcbiAgICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgcHVyZU1hdGNoZXMpIHtcbiAgICAgICAgY29uc3QgZGVtb05hbWUgPSBtYXRjaFsxXVxuICAgICAgICBjb25zdCB0YWdQYXR0ZXJuID0gLzwoXFx3KylcXC8+L1xuICAgICAgICBjb25zdCBkZW1vVGFnTmFtZSA9IGRlbW9OYW1lLm1hdGNoKHRhZ1BhdHRlcm4pWzFdXG4gICAgICAgIGNvbnN0IGRlbW9Db21wb25lbnROYW1lID0gY2FtZWxUb0Rhc2hDYXNlKGRlbW9UYWdOYW1lKVxuXG4gICAgICAgIGNvbnN0IGltcG9ydExpbmUgPSBgaW1wb3J0ICR7ZGVtb1RhZ05hbWV9IGZyb20gJy4vJHtkZW1vQ29tcG9uZW50TmFtZX0udnVlJztcXG5gXG4gICAgICAgIGlmICghaW1wb3J0QnVja2V0LmhhcyhpbXBvcnRMaW5lKSkge1xuICAgICAgICAgIGltcG9ydENvbnRlbnQgKz0gaW1wb3J0TGluZVxuICAgICAgICAgIGltcG9ydEJ1Y2tldC5hZGQoaW1wb3J0TGluZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHNyYyA9IHNyYy5yZXBsYWNlKFxuICAgICAgICAgIG1hdGNoWzBdLFxuICAgICAgICAgIGBcXG48ZGl2IGNsYXNzPSd5ay1wdXJlLWRvYyc+JHtkZW1vTmFtZX08L2Rpdj5gLFxuICAgICAgICApXG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiBgXG4gICAgICAgIDxzY3JpcHQgc2V0dXA+XG4gICAgICAgICAgJHtpbXBvcnRDb250ZW50fVxuICAgICAgICA8L3NjcmlwdD5cbiAgICAgICAgPHRlbXBsYXRlPlxuICAgICAgICAgIDxkaXYgY2xhc3M9J3lrLWRlbW8tZG9jJz5cbiAgICAgICAgICAgICR7bWFya2Rvd25JdC5yZW5kZXIoc3JjKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC90ZW1wbGF0ZT5gLFxuICAgICAgICBtYXA6IG51bGwsXG4gICAgICB9XG4gICAgfVxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1csU0FBUyxlQUFlLFdBQVc7QUFDbFosU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxZQUFZOzs7QUNINFgsT0FBTyxnQkFBZ0I7QUFDdGEsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sUUFBUTtBQUNmLE9BQU8sVUFBVTtBQUNWLFNBQVMsZ0JBQWdCLEtBQUs7QUFDbkMsU0FBTyxJQUFJLFFBQVEsc0JBQXNCLE9BQU8sRUFBRSxZQUFZO0FBQ2hFO0FBR08sU0FBUyxjQUFjLGVBQWUsSUFBSTtBQUMvQyxRQUFNLGFBQWEsR0FBRyxhQUFhO0FBQ25DLFFBQU0sZUFBZSxLQUFLLFFBQVEsS0FBSyxRQUFRLEVBQUUsR0FBRyxVQUFVO0FBQzlELE1BQUk7QUFDRixVQUFNLFVBQVUsR0FBRyxhQUFhLGNBQWMsT0FBTztBQUNyRCxXQUFPO0FBQUEsRUFDVCxTQUFTLE9BQU87QUFDZCxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBRUEsSUFBTyx5QkFBUSxPQUFPO0FBQUEsRUFDcEIsTUFBTTtBQUFBLEVBQ04sVUFBVSxLQUFLLElBQUk7QUFDakIsUUFBSSxHQUFHLFNBQVMsS0FBSyxHQUFHO0FBRXRCLFVBQUksZ0JBQWdCO0FBRXBCLFlBQU0sZUFBZSxvQkFBSSxJQUFJO0FBRzdCLFlBQU0sYUFBYSxXQUFXO0FBQUEsUUFDNUIsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUdELFVBQUksQ0FBQyxHQUFHLFNBQVMsVUFBVSxHQUFHO0FBQzVCLGVBQU87QUFBQSxVQUNMLE1BQU07QUFBQTtBQUFBLFlBRUosV0FBVyxPQUFPLEdBQUcsQ0FBQztBQUFBO0FBQUE7QUFBQSxRQUcxQjtBQUFBLE1BQ0Y7QUFHQSxZQUFNLGlCQUFpQjtBQUN2QixZQUFNLFVBQVUsSUFBSSxTQUFTLGNBQWM7QUFDM0MsaUJBQVcsU0FBUyxTQUFTO0FBRTNCLGNBQU0sQ0FBQyxPQUFPLE1BQU0sUUFBUSxJQUFJLE1BQU0sQ0FBQyxFQUFFLE1BQU0sSUFBSTtBQUduRCxjQUFNLGFBQWE7QUFDbkIsY0FBTSxjQUFjLFNBQVMsTUFBTSxVQUFVLEVBQUUsQ0FBQztBQUNoRCxjQUFNLG9CQUFvQixnQkFBZ0IsV0FBVyxFQUFFO0FBQUEsVUFDckQ7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUVBLGNBQU0sV0FBVyxjQUFjLG1CQUFtQixFQUFFO0FBQ3BELGNBQU0sYUFBYSxVQUFVLFdBQVcsWUFBWSxpQkFBaUI7QUFBQTtBQUNyRSxZQUFJLENBQUMsYUFBYSxJQUFJLFVBQVUsR0FBRztBQUNqQywyQkFBaUI7QUFDakIsdUJBQWEsSUFBSSxVQUFVO0FBQUEsUUFDN0I7QUFFQSxjQUFNLGtCQUFrQixzQkFBc0IsS0FBSyxXQUFXO0FBQUEsVUFDNUQ7QUFBQSxRQUNGLENBQUM7QUFBQSxrQ0FDeUIsUUFBUTtBQUFBLGtDQUNSLFdBQVcsT0FBTyxJQUFJLENBQUM7QUFBQTtBQUFBO0FBR2pELGNBQU0sSUFBSSxRQUFRLE1BQU0sQ0FBQyxHQUFHLGVBQWU7QUFBQSxNQUM3QztBQUdBLFlBQU0sY0FBYztBQUNwQixZQUFNLGNBQWMsSUFBSSxTQUFTLFdBQVc7QUFDNUMsaUJBQVcsU0FBUyxhQUFhO0FBQy9CLGNBQU0sV0FBVyxNQUFNLENBQUM7QUFDeEIsY0FBTSxhQUFhO0FBQ25CLGNBQU0sY0FBYyxTQUFTLE1BQU0sVUFBVSxFQUFFLENBQUM7QUFDaEQsY0FBTSxvQkFBb0IsZ0JBQWdCLFdBQVc7QUFFckQsY0FBTSxhQUFhLFVBQVUsV0FBVyxZQUFZLGlCQUFpQjtBQUFBO0FBQ3JFLFlBQUksQ0FBQyxhQUFhLElBQUksVUFBVSxHQUFHO0FBQ2pDLDJCQUFpQjtBQUNqQix1QkFBYSxJQUFJLFVBQVU7QUFBQSxRQUM3QjtBQUVBLGNBQU0sSUFBSTtBQUFBLFVBQ1IsTUFBTSxDQUFDO0FBQUEsVUFDUDtBQUFBLDJCQUE4QixRQUFRO0FBQUEsUUFDeEM7QUFBQSxNQUNGO0FBQ0EsYUFBTztBQUFBLFFBQ0wsTUFBTTtBQUFBO0FBQUEsWUFFRixhQUFhO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FJWCxXQUFXLE9BQU8sR0FBRyxDQUFDO0FBQUE7QUFBQTtBQUFBLFFBRzVCLEtBQUs7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7O0FEM0dBLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU9BLFdBQVU7QUFOakIsSUFBTSxtQ0FBbUM7QUFBNkwsSUFBTSwyQ0FBMkM7QUFPdlIsSUFBTSxZQUFZLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxDQUFDO0FBRWxFLElBQU0sVUFBVUMsTUFDYixRQUFRLGtDQUFXLDZDQUE2QyxFQUNoRSxRQUFRLE9BQU8sR0FBRztBQUNyQixJQUFNLFdBQVcsY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBRWhFLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLHVCQUFtQjtBQUFBLElBQ25CO0FBQUEsSUFDQSxPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsTUFDVCxXQUFXO0FBQUEsUUFDVCxDQUFDLGtCQUFrQjtBQUNqQixjQUFJLGNBQWMsV0FBVyxJQUFJO0FBQy9CLG1CQUFPLEVBQUUsTUFBTSxlQUFlLE1BQU0sUUFBUTtBQUFBLFFBQ2hEO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUs7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBO0FBQUEsSUFFSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixTQUFTO0FBQUEsUUFDVCxnQkFDRTtBQUFBLE1BQ0o7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiLCAicGF0aCJdCn0K
