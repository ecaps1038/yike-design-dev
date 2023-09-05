import{p,o as d,b as h,j as o,e as t,w as s,v as u,y as g,z as k,a as _,f as v,k as e}from"./index-79e930ed.js";const m={},l=c=>(g("data-v-929240de"),c=c(),k(),c),y={class:"colors"},f={class:"light"},$=l(()=>o("div",{class:"color p"},null,-1)),w=l(()=>o("div",{class:"color l"},null,-1)),x=l(()=>o("div",{class:"color s"},null,-1)),I=l(()=>o("div",{class:"color w"},null,-1)),B=l(()=>o("div",{class:"color e"},null,-1)),P=l(()=>o("div",{class:"color d1"},null,-1)),z={class:"dark"},C=l(()=>o("div",{class:"color p"},null,-1)),F=l(()=>o("div",{class:"color l"},null,-1)),N=l(()=>o("div",{class:"color s"},null,-1)),S=l(()=>o("div",{class:"color w"},null,-1)),V=l(()=>o("div",{class:"color e"},null,-1)),b=l(()=>o("div",{class:"color d1"},null,-1));function A(c,i){const a=u;return d(),h("div",y,[o("div",f,[t(a,{size:"m"},{default:s(()=>[$,w,x,I,B,P]),_:1})]),o("div",z,[t(a,{size:"m"},{default:s(()=>[C,F,N,S,V,b]),_:1})])])}const D=p(m,[["render",A],["__scopeId","data-v-929240de"]]),L=o("p",null,"既然这个主题这么优雅，那么我也在整套组件库加入了暗黑模式。",-1),j=o("p",null,[e("内部已将暗黑模式封装为 "),o("code",null,"<yk-theme>"),e(" 组件，可以按组件形式引入该组件使用，组件默认跟随系统主题切换。默认设有开关，本文档顶部的“太阳”和“月亮”就是该组件的一个展示模式。您可以点击看效果。")],-1),E=o("p",null,"暗黑模式也是主题的一种，我们应该根据用户喜好做到最自由的搭配，我们遵从用户自由搭配和使用该两套主题。",-1),T=o("p",null,"我们因遵从视觉直觉，暗黑模式下的信息内容需要和浅色模式保持一致性，不应该打破原有的层级关系。",-1),q={class:"yk-pure-doc"},G=o("p",null,"yk-theme 主题组件设有两个变量，分别 skin、control。两个相互联系配合完成对主题的控制。其中 skin 控制模式主题，control 控制是否显示“太阳”和“月亮”组件。",-1),H=o("p",null,[o("strong",null,"控制"),e("：")],-1),J=o("p",null,"skin 有三种模式，分别为：auto、light、dark，默认为 auto；control 为 boolean 属性值，默认为 true。",-1),K=o("pre",null,[o("code",{class:"language-html"},`<!-- 默认跟随系统颜色，并显示控制主题的“太阳”和“月亮”控件 -->
<yk-theme />

<!-- 默认跟随系统颜色，不显示控制主题的“太阳”和“月亮”控件 -->
<yk-theme :control="false" />

<!-- 默认浅色颜色模式，并显示控制主题的“太阳”和“月亮”控件 -->
<yk-theme skin="light" />

<!-- 保持默认浅色模式，不显示控制主题的“太阳”和“月亮”控件 -->
<yk-theme skin="light" :control="false" />
`)],-1),M=o("p",null,"源码中可以看到针对各模式下设置一套颜色变量。在此您可以根据设计需求进行自己调整或增减颜色变量。",-1),O=o("p",null,[e("代码在 "),o("code",null,"@yike-design/ui/src/styles/theme.less"),e("。")],-1),Q=o("pre",null,[o("code",{class:"language-less"},`//默认
:root {
  // -------- Functional color light -----------
  --pcolor: palette(@pcolor-light); // 全局主色
  --lcolo : palette(@lcolor-light); // 链接色
  --scolor: palette(@scolor-light); // 成功色
  --wcolor: palette(@wcolor-light); // 警告色
  --ecolor: palette(@ecolor-light); // 错误色
  --gray  : palette(@gray);         // 中性色
}

// 亮色主题
[data-theme='light'] {
  // -------- Functional color light -----------
  --pcolor: palette(@pcolor-light); // 全局主色
  --lcolo : palette(@lcolor-light); // 链接色
  --scolor: palette(@scolor-light); // 成功色
  --wcolor: palette(@wcolor-light); // 警告色
  --ecolor: palette(@ecolor-light); // 错误色
  --gray  : palette(@gray);         // 中性色
}

// 暗色主题
[data-theme='dark'] {
  // -------- Functional color light -----------
  --pcolor: palette(@pcolor-dark); // 全局主色
  --lcolo : palette(@lcolor-dark); // 链接色
  --scolor: palette(@scolor-dark); // 成功色
  --wcolor: palette(@wcolor-dark); // 警告色
  --ecolor: palette(@ecolor-dark); // 错误色
  --gray  : palette(@white);       // 中性色
`)],-1),U={__name:"dark-model",setup(c){return(i,a)=>{const n=_("yk-title"),r=_("DocPage");return d(),v(r,null,{default:s(()=>[t(n,{level:2,id:"黑暗模式"},{default:s(()=>[e("黑暗模式")]),_:1}),L,t(n,{level:3,id:"使用"},{default:s(()=>[e("使用")]),_:1}),j,t(n,{level:3,id:"模式行为"},{default:s(()=>[e("模式行为")]),_:1}),E,t(n,{level:3,id:"颜色"},{default:s(()=>[e("颜色")]),_:1}),T,o("div",q,[t(D)]),t(n,{level:3,id:"API"},{default:s(()=>[e("API")]),_:1}),G,H,J,K,t(n,{level:3,id:"源码管理"},{default:s(()=>[e("源码管理")]),_:1}),M,O,Q]),_:1})}}};export{U as default};
