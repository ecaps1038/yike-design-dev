<template>
  <div class="ykcolor-background">
    <ColorCard label="line-color-s" :type="2" class="line-color-s" />
    <ColorCard label="line-color-m" :type="2" class="line-color-m" />
    <ColorCard label="line-color-l" :type="2" class="line-color-l" />
  </div>
</template>
<style lang="less" scoped>
.colors(@name) {
  .line-color-@{name} {
    border: ~'@{line-color-@{name}}' 1px solid;
    color: @font-color-l;
  }
}
.colors(s);
.colors(m);
.colors(l);
</style>
