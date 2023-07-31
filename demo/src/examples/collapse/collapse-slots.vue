<template>
  <div class="yk-collapse-demo">
    <yk-collapse-group>
      <yk-collapse title="你好，世界">
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <template #right>
          <div style="font-weight: bold; color: red">VIP 专享</div>
        </template>
      </yk-collapse>
      <yk-collapse :active="true" title="你好，世界">
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        <template #right>
          <div style="color: orange">
            特惠价
            <span style="font-size: 22px">999</span>
            元
          </div>
        </template>
      </yk-collapse>
    </yk-collapse-group>
  </div>
</template>
<style>
.yk-collapse-demo {
  width: 700px;
}
.yk-collapse p {
  margin: 0 16px;
}
</style>
