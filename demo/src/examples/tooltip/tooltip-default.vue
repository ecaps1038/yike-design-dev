<template>
  <yk-space>
    <div class="container">
      <div class="top">
        <div>
          <yk-tooltip placement="topLeft">
            <yk-button type="outline">TL</yk-button>
          </yk-tooltip>
        </div>
        <div>
          <yk-tooltip placement="top">
            <yk-button type="outline">Top</yk-button>
          </yk-tooltip>
        </div>
        <div>
          <yk-tooltip placement="topRight">
            <yk-button type="outline">TR</yk-button>
          </yk-tooltip>
        </div>
      </div>
      <div class="center">
        <div>
          <div>
            <yk-tooltip placement="leftTop">
              <yk-button type="outline">LT</yk-button>
            </yk-tooltip>
          </div>
          <div>
            <yk-tooltip placement="left">
              <yk-button type="outline">Left</yk-button>
            </yk-tooltip>
          </div>
          <div>
            <yk-tooltip placement="leftBottom">
              <yk-button type="outline">LB</yk-button>
            </yk-tooltip>
          </div>
        </div>
        <div>
          <div>
            <yk-tooltip placement="rightTop">
              <yk-button type="outline">RT</yk-button>
            </yk-tooltip>
          </div>
          <div>
            <yk-tooltip placement="right">
              <yk-button type="outline">Right</yk-button>
            </yk-tooltip>
          </div>
          <div>
            <yk-tooltip placement="rightBottom">
              <yk-button type="outline">RB</yk-button>
            </yk-tooltip>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div>
          <yk-tooltip placement="bottomLeft">
            <yk-button type="outline">BL</yk-button>
          </yk-tooltip>
        </div>
        <div>
          <yk-tooltip placement="bottom">
            <yk-button type="outline">Bottom</yk-button>
          </yk-tooltip>
        </div>
        <div>
          <yk-tooltip placement="bottomRight">
            <yk-button type="outline">BR</yk-button>
          </yk-tooltip>
        </div>
      </div>
    </div>
  </yk-space>
</template>
<style scoped>
.top,
.bottom,
.center {
  display: flex;
  justify-content: center;
}
.top > div,
.bottom > div,
.center > div > div {
  margin: 8px;
}
.center {
  justify-content: space-between;
}
.container {
  width: 100%;
  min-width: 350px;
}
</style>
