<template>
  <div class="ykcolor-neutral">
    <h3>中性色</h3>
    <p class="ykcolor-quote">
      当然除了在浅色和深色主题内不同的常规配色外，系统还提供了通用的中性色
    </p>
    <div class="ykcolor-group">
      <div class="ykcolor-black">
        <ColorCard label="基础黑色" color="#1e2025" />
        <ColorCard label="常规黑色" color="#24262b" />
        <ColorCard label="次要黑色" color="#282a2f" />
        <ColorCard label="占位黑色" color="#1e2025" />
      </div>
      <div class="ykcolor-white">
        <ColorCard label="基础白色" color="#ffffff" />
        <ColorCard label="常规白色" color="#f6f6f8" />
        <ColorCard label="次要白色" color="#f3f3f4" />
        <ColorCard label="占位白色" color="#e8e9eb" />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.ykcolor-black,
.ykcolor-white {
  display: flex;
  flex-direction: column;
  :deep(.ykcolor-card) {
    margin-bottom: 20px;
  }
}
.ykcolor-white {
  :deep(.ykcolor-card) {
    border: 1px solid gray;
    span {
      color: #000;
    }
  }
}
</style>
