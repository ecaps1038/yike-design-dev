<template>
  <div class="ykcolor-neutral">
    <h3>其他颜色</h3>
    <p class="ykcolor-quote">
      除了上述主题常用颜色外，系统也内置一部分背景和字体颜色
    </p>
    <div class="ykcolor-group">
      <div class="ykcolor-bg">
        <ColorCard label="基础背景色" color="bg-color-l" />
        <ColorCard label="常规背景色" color="bg-color-m" />
        <ColorCard label="次要背景色" color="bg-color-s" />
        <ColorCard label="其他背景色" color="bg-color-ss" />
      </div>
      <div class="ykcolor-font">
        <ColorCard label="基础字体色" color="font-color-l" />
        <ColorCard label="常规字体色" color="font-color-m" />
        <ColorCard label="次要字体色" color="font-color-s" />
        <ColorCard label="其他字体色" color="font-color-ss" />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.ykcolor-bg,
.ykcolor-font {
  display: flex;
  flex-direction: column;
  :deep(.ykcolor-card) {
    margin-bottom: 20px;
  }
}
.ykcolor-bg {
  :deep(.ykcolor-card) {
    border: 1px solid gray;
    color: #000;
  }
}
</style>
