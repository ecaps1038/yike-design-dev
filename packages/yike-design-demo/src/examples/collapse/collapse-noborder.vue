<template>
  <div class="yk-collapse-demo">
    <yk-collapse-group :border="false">
      <yk-collapse title="你好，世界">
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
      </yk-collapse>
      <yk-collapse :active="true" title="你好，世界">
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
      </yk-collapse>
      <yk-collapse title="你好，世界">
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
      </yk-collapse>
    </yk-collapse-group>
  </div>
</template>
<style>
.yk-collapse-demo {
  width: 700px;
}
</style>
