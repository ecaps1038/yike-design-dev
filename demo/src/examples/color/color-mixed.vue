<template>
  <div class="ykcolor-mixed">
    <div class="ykcolor-group">
      <ColorCard
        label="pcolor-1"
        :type="1"
        class="radius_first black pcolor-1"
      />
      <ColorCard label="pcolor-2" :type="1" class="black pcolor-2" />
      <ColorCard label="pcolor-3" :type="1" class="black pcolor-3" />
      <ColorCard label="pcolor-4" :type="1" class="black pcolor-4" />
      <ColorCard label="pcolor-5" :type="1" class="black pcolor-5" />
      <ColorCard label="pcolor-6" :type="1" class="pcolor-6" />
      <ColorCard label="pcolor" :type="1" class="pcolor-7" />
      <ColorCard label="pcolor-8" :type="1" class="pcolor-8" />
      <ColorCard label="pcolor-9" :type="1" class="pcolor-9" />
      <ColorCard label="pcolor-10" :type="1" class="radius_last pcolor-10" />
    </div>
    <div class="ykcolor-group">
      <ColorCard
        label="scolor-1"
        :type="1"
        class="radius_first black scolor-1"
      />
      <ColorCard label="scolor-2" :type="1" class="black scolor-2" />
      <ColorCard label="scolor-3" :type="1" class="black scolor-3" />
      <ColorCard label="scolor-4" :type="1" class="black scolor-4" />
      <ColorCard label="scolor-5" :type="1" class="black scolor-5" />
      <ColorCard label="scolor-6" :type="1" class="scolor-6" />
      <ColorCard label="scolor" :type="1" class="scolor-7" />
      <ColorCard label="scolor-8" :type="1" class="scolor-8" />
      <ColorCard label="scolor-9" :type="1" class="scolor-9" />
      <ColorCard label="scolor-10" :type="1" class="radius_last scolor-10" />
    </div>
    <div class="ykcolor-group">
      <ColorCard
        label="wcolor-1"
        :type="1"
        class="radius_first black wcolor-1"
      />
      <ColorCard label="wcolor-2" :type="1" class="black wcolor-2" />
      <ColorCard label="wcolor-3" :type="1" class="black wcolor-3" />
      <ColorCard label="wcolor-4" :type="1" class="black wcolor-4" />
      <ColorCard label="wcolor-5" :type="1" class="black wcolor-5" />
      <ColorCard label="wcolor-6" :type="1" class="wcolor-6" />
      <ColorCard label="wcolor" :type="1" class="wcolor-7" />
      <ColorCard label="wcolor-8" :type="1" class="wcolor-8" />
      <ColorCard label="wcolor-9" :type="1" class="wcolor-9" />
      <ColorCard label="wcolor-10" :type="1" class="radius_last wcolor-10" />
    </div>
    <div class="ykcolor-group">
      <ColorCard
        label="ecolor-1"
        :type="1"
        class="radius_first black ecolor-1"
      />
      <ColorCard label="ecolor-2" :type="1" class="black ecolor-2" />
      <ColorCard label="ecolor-3" :type="1" class="black ecolor-3" />
      <ColorCard label="ecolor-4" :type="1" class="black ecolor-4" />
      <ColorCard label="ecolor-5" :type="1" class="black ecolor-5" />
      <ColorCard label="ecolor-6" :type="1" class="ecolor-6" />
      <ColorCard label="ecolor" :type="1" class="ecolor-7" />
      <ColorCard label="ecolor-8" :type="1" class="ecolor-8" />
      <ColorCard label="ecolor-9" :type="1" class="ecolor-9" />
      <ColorCard label="ecolor-10" :type="1" class="radius_last ecolor-10" />
    </div>
    <div class="ykcolor-group">
      <ColorCard label="gray-1" :type="1" class="radius_first black gray-1" />
      <ColorCard label="gray-2" :type="1" class="black gray-2" />
      <ColorCard label="gray-3" :type="1" class="black gray-3" />
      <ColorCard label="gray-4" :type="1" class="black gray-4" />
      <ColorCard label="gray-5" :type="1" class="black gray-5" />
      <ColorCard label="gray-6" :type="1" class="gray gray-6" />
      <ColorCard label="gray-7" :type="1" class="gray gray-7" />
      <ColorCard label="gray-8" :type="1" class="gray gray-8" />
      <ColorCard label="gray-9" :type="1" class="gray gray-9" />
      <ColorCard label="gray-10" :type="1" class="radius_last gray gray-10" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.colors(@i,@name) when(@i<=10) {
  .@{name}-@{i} {
    background-color: ~'@{@{name}-@{i}}';
  }
  .colors(@i+1,@name);
}
.colors(1,pcolor);
.colors(1,scolor);
.colors(1,wcolor);
.colors(1,ecolor);
.colors(1,gray);
</style>
