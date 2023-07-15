<template>
  <YkSpace>
    <div class="container">
      <div class="top">
        <div style="margin: 8px">
          <YkTooltip placement="topLeft">
            <YkButton type="outline">TL</YkButton>
          </YkTooltip>
        </div>
        <div style="margin: 8px">
          <YkTooltip placement="top">
            <YkButton type="outline">Top</YkButton>
          </YkTooltip>
        </div>
        <div style="margin: 8px">
          <YkTooltip placement="topRight">
            <YkButton type="outline">TR</YkButton>
          </YkTooltip>
        </div>
      </div>
      <div class="center">
        <div>
          <div style="margin: 8px">
            <YkTooltip placement="leftTop">
              <YkButton type="outline">LT</YkButton>
            </YkTooltip>
          </div>
          <div style="margin: 8px">
            <YkTooltip placement="left">
              <YkButton type="outline">Left</YkButton>
            </YkTooltip>
          </div>
          <div style="margin: 8px">
            <YkTooltip placement="leftBottom">
              <YkButton type="outline">LB</YkButton>
            </YkTooltip>
          </div>
        </div>
        <div>
          <div style="margin: 8px">
            <YkTooltip placement="rightTop">
              <YkButton type="outline">RT</YkButton>
            </YkTooltip>
          </div>
          <div style="margin: 8px">
            <YkTooltip placement="right">
              <YkButton type="outline">Right</YkButton>
            </YkTooltip>
          </div>
          <div style="margin: 8px">
            <YkTooltip placement="rightBottom">
              <YkButton type="outline">RB</YkButton>
            </YkTooltip>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div style="margin: 8px">
          <YkTooltip placement="bottomLeft">
            <YkButton type="outline">BL</YkButton>
          </YkTooltip>
        </div>
        <div style="margin: 8px">
          <YkTooltip placement="bottom">
            <YkButton type="outline">Bottom</YkButton>
          </YkTooltip>
        </div>
        <div style="margin: 8px">
          <YkTooltip placement="bottomRight">
            <YkButton type="outline">BR</YkButton>
          </YkTooltip>
        </div>
      </div>
    </div>
  </YkSpace>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(true)
</script>
<style scoped>
.top,
.bottom,
.center {
  display: flex;
  justify-content: center;
}
.center {
  justify-content: space-between;
}
.container {
  width: 100%;
  min-width: 350px;
}
</style>
