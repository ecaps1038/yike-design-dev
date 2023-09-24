<template>
  <div class="ykcolor-background">
    <ColorCard label="font-color-ss" :type="2" class="font-color-ss" />
    <ColorCard label="bg-color-s" class="font-color-s" :type="2" />
    <ColorCard label="bg-color-m" class="font-color-m" :type="2" />
    <ColorCard label="bg-color-l" class="font-color-l" :type="2" />
  </div>
</template>
<style lang="less" scoped>
.colors(@name) {
  .font-color-@{name} {
    color: @light;
    background-color: ~'@{font-color-@{name}}';
  }
}
.colors(ss);
.colors(s);
.colors(m);
.colors(l);
</style>
