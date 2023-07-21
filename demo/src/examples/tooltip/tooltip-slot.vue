<template>
  <yk-space>
    <yk-tooltip :overlay-style="{ background: '#fff' }">
      <template #content>
        <img
          class="image"
          src="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"
          alt=""
        />
      </template>
      <yk-button type="outline">展示气泡</yk-button>
    </yk-tooltip>
  </yk-space>
</template>
<style scoped>
.image {
  font-size: 0;
  width: 100%;
}
</style>
