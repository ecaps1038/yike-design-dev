<template>
  <div class="ykcolor-background">
    <ColorCard label="bg-color-ss" :type="2" class="bg-color-ss" />
    <ColorCard label="bg-color-s" :type="2" class="bg-color-s" />
    <ColorCard label="bg-color-m" :type="2" class="bg-color-m" />
    <ColorCard label="bg-color-l" :type="2" class="bg-color-l bg-l" />
  </div>
</template>
<style lang="less" scoped>
.colors(@name) {
  .bg-color-@{name} {
    color: @font-color-l;
    background-color: ~'@{bg-color-@{name}}';
  }
}
.colors(ss);
.colors(s);
.colors(m);
.colors(l);
.bg-l {
  border: 1px solid @line-color-s;
}
</style>
