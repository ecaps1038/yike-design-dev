<template>
  <div class="ykcolor-background">
    <ColorCard label="light" :type="2" class="light" />
    <ColorCard label="dark" :type="2" class="dark" />
  </div>
</template>
<style lang="less" scoped>
.light {
  border: 1px solid @line-color-s;
  color: @font-color-l;
  background-color: @light;
}
.dark {
  background-color: @dark;
}
</style>
