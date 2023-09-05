<template>
  <yk-space>
    <div class="container">
      <div class="top">
        <div>
          <yk-popover placement="topLeft">
            <yk-button type="outline">TL</yk-button>
          </yk-popover>
        </div>
        <div>
          <yk-popover placement="top">
            <yk-button type="outline">Top</yk-button>
          </yk-popover>
        </div>
        <div>
          <yk-popover placement="topRight">
            <yk-button type="outline">TR</yk-button>
          </yk-popover>
        </div>
      </div>
      <div class="center">
        <div>
          <div>
            <yk-popover placement="leftTop">
              <yk-button type="outline">LT</yk-button>
            </yk-popover>
          </div>
          <div>
            <yk-popover placement="left">
              <yk-button type="outline">Left</yk-button>
            </yk-popover>
          </div>
          <div>
            <yk-popover placement="leftBottom">
              <yk-button type="outline">LB</yk-button>
            </yk-popover>
          </div>
        </div>
        <div>
          <div>
            <yk-popover placement="rightTop">
              <yk-button type="outline">RT</yk-button>
            </yk-popover>
          </div>
          <div>
            <yk-popover placement="right">
              <yk-button type="outline">Right</yk-button>
            </yk-popover>
          </div>
          <div>
            <yk-popover placement="rightBottom">
              <yk-button type="outline">RB</yk-button>
            </yk-popover>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div>
          <yk-popover placement="bottomLeft">
            <yk-button type="outline">BL</yk-button>
          </yk-popover>
        </div>
        <div>
          <yk-popover placement="bottom">
            <yk-button type="outline">Bottom</yk-button>
          </yk-popover>
        </div>
        <div>
          <yk-popover placement="bottomRight">
            <yk-button type="outline">BR</yk-button>
          </yk-popover>
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
