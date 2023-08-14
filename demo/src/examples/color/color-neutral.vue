<template>
  <div class="ykcolor-neutral">
    <h3>中性色</h3>
    <p class="ykcolor-quote">
      当然除了在浅色和深色主题内不同的常规配色外，系统还提供了通用的中性色
    </p>
    <div class="ykcolor-group">
      <ColorCard
        class="ykdark"
        label="黑色"
        color="gray"
        step="gray"
      ></ColorCard>
      <ColorCard class="yklight" label="白色" color="white"></ColorCard>
    </div>
  </div>
</template>
<style lang="less" scoped>
.yklight {
  border: 1px solid #000;
  color: #000;
}
[data-theme='dark'] {
  .ykdark {
    border: 1px solid #fff;
    color: #fff;
  }
}
</style>
