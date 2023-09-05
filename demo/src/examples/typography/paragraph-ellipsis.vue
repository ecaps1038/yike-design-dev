<template>
  <yk-paragraph :ellipsis="{ rows: 2 }">
    出于对前端组件的好奇，利用业余时间将设计的一个应用提炼出部分设计规范，从而创建出此套对应的前端组件。期望人人都能直面源码，更佳灵活的使用在型项目中。
  </yk-paragraph>
  <yk-paragraph :ellipsis="{ rows: 2, showMore: true }">
    思路：1、判断当前内容是否超过三行。此处可以给每行设置一个行高line-height,渲染完后超过三倍的行高即认为是内容超过了三行。2、展示/收起状态的切换可以通过data中的参数来绑定。3、在底部使用来绝对定位展开该在的位置。4、根据业务需求来设定好展开和收起按钮需要呆的地方。
  </yk-paragraph>
</template>
