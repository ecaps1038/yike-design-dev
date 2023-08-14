<template>
  <div class="ykcolor-dark">
    <h3>深色主题</h3>
    <p class="ykcolor-quote">以下为深色主题配色色卡</p>
    <h4>全局主色</h4>
    <p>YIKE 深色主题下全局主色调是鲜艳的蓝色</p>
    <ColorCard label="Primary Color" theme="dark" step="pcolor" />
    <h4>链接色</h4>
    <p>在深色主题下同样提供有对应的链接色</p>
    <ColorCard label="Link Color" theme="dark" color="lcolor-dark"></ColorCard>
    <h4>辅助色</h4>
    <p>除了主色及链接色外，深色主题下对于不同场景也有不同的配色支持</p>
    <div class="ykcolor-group">
      <ColorCard label="Success Color" theme="dark" step="scolor" />
      <ColorCard label="Warning Color" theme="dark" step="wcolor" />
      <ColorCard label="Error Color" theme="dark" step="ecolor" />
    </div>
  </div>
</template>
