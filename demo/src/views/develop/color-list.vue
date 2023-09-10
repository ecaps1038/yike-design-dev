<template>
  <div class="colors">
    <div class="light">
      <yk-space size="m">
        <div class="color p"></div>
        <div class="color l"></div>
        <div class="color s"></div>
        <div class="color w"></div>
        <div class="color e"></div>
        <div class="color d1"></div>
      </yk-space>
    </div>
    <div class="dark">
      <yk-space size="m">
        <div class="color p"></div>
        <div class="color l"></div>
        <div class="color s"></div>
        <div class="color w"></div>
        <div class="color e"></div>
        <div class="color d1"></div>
      </yk-space>
    </div>
  </div>
</template>

<style scoped lang="less">
.colors {
  overflow: hidden;
  max-width: 1200px;
  border: 1px solid @line-color-s;
  border-radius: @radius-m;
  background-color: #fff;

  .color {
    width: 40px;
    height: 40px;
    border-radius: @radius-s;
    background-color: #eee;
  }

  .light,
  .dark {
    padding: 20px;
  }

  .light {
    .p {
      background-color: @pcolor-light;
    }

    .l {
      background-color: @lcolor-light;
    }

    .s {
      background-color: @scolor-light;
    }

    .w {
      background-color: @wcolor-light;
    }

    .e {
      background-color: @ecolor-light;
    }

    .d1 {
      background-color: @gray;
    }
  }

  .dark {
    background-color: #000;

    .p {
      background-color: @pcolor-dark;
    }

    .l {
      background-color: @lcolor-dark;
    }

    .s {
      background-color: @scolor-dark;
    }

    .w {
      background-color: @wcolor-dark;
    }

    .e {
      background-color: @ecolor-dark;
    }

    .d1 {
      background-color: @white;
    }
  }
}
</style>
