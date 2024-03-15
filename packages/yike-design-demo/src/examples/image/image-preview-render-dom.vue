<template>
  <div id="image-container" class="image-container">
    <yk-image
      src="https://www.huohuo90.com:3005/logo/yike.png"
      width="200"
      height="200"
      popup-container="#image-container"
    ></yk-image>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less">
.image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background-color: aliceblue;
}
</style>
