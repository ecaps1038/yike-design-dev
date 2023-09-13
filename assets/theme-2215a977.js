import{p as i,a as l,f as a,w as n,o as r,e as t,k as e,j as s}from"./index-ac581855.js";const d={},_=s("p",null,"Yike Design 从本人一个笔记项目中提炼，采用蓝色主题，可符合一般开发使用，但这套组件库就思想就是为了适应设计任何想法而设计，改它就得了。",-1),p=s("p",null,"Yike Design 使用 less 作为预编译语言。为寻求最合理最少的变量，我已将涉及组题变量全部放在同一个 less 文件中，使用时直接修改该文档即可。作为全局变量，建议您全局引入该 less 文件。",-1),u=s("p",null,[s("strong",null,"全局引入"),e("：")],-1),f=s("p",null,[e("文件在 "),s("code",null,"@yike-design/ui/src/components/styles/colors/color.less")],-1),g=s("p",null,[s("strong",null,"Vite 引入方法"),e("：")],-1),h=s("p",null,"在 vite.config.ts 文件内加入：",-1),m=s("pre",null,[s("code",{class:"language-ts"},`  export default defineConfig({
  ...
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/yike-design/assets/style/index.less";',
      },
    },
  },
})
`)],-1),k=s("p",null,[s("strong",null,"vue-cli 引入方法"),e("：")],-1),y=s("p",null,"在 vite.config.ts 文件内加入：",-1),x=s("pre",null,[s("code",{class:"language-ts"},`const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/yike-design/assets/style/index.less'),
      ], // 引入全局样式变量
    },
  },
}
`)],-1),v=s("p",null,[e("其中，"),s("code",null,"yike-design/ui/src/components/styles/colors/color.less"),e(" 文件存放所有全局变量，在项目使用上，全局变量完全可以直接修改该文档内容。")],-1),D=s("pre",null,[s("code",{class:"language-ts"},`// -------- Colors -----------
@pcolor: #2B5AED; // 全局主色
@lcolor: #1890ff; // 链接色
@scolor: #1FB4A2; // 成功色
@wcolor: #F5AC08; // 警告色
@ecolor: #FA5247; // 错误色

// Animation
@animats: 0.3s; // Modal
@animatb: 0.2s;
@animatf: 0.1s; // Tooltip

//font-size
@size-ss: 12px; // 小号

`)],-1);function A(B,C){const o=l("yk-title"),c=l("DocPage");return r(),a(c,null,{default:n(()=>[t(o,{level:2,id:"定制主题"},{default:n(()=>[e("定制主题")]),_:1}),_,t(o,{level:3,id:"变量修改"},{default:n(()=>[e("变量修改")]),_:1}),p,u,f,g,h,m,k,y,x,t(o,{level:3,id:"源码"},{default:n(()=>[e("源码")]),_:1}),v,D]),_:1})}const w=i(d,[["render",A]]);export{w as default};
