<template>
  <yk-space size="xl">
    <yk-image
      src="https://www.huohuo90.com:3005/logo/yike3.png"
      width="320"
      height="200"
      fit="cover"
      title="Yike-Design"
      description="包容万物，从源头出发，一切从简。"
    >
      <template #extra>
        <yk-space size="s">
          <span class="image-extra-btn">
            <IconDownloadOutline />
          </span>
          <span class="image-extra-btn">
            <IconTipOutline />
          </span>
        </yk-space>
      </template>
    </yk-image>
    <yk-image
      src="https://www.huohuo90.com:3005/logo/yike2.png"
      width="320"
      height="200"
      fit="cover"
      footer-position="outer"
      title="Yike-Design"
      description="包容万物，从源头出发，一切从简。"
    >
      <template #extra>
        <yk-space size="s">
          <span class="image-extra-btn">
            <IconDownloadOutline />
          </span>
          <span class="image-extra-btn">
            <IconTipOutline />
          </span>
        </yk-space>
      </template>
    </yk-image>
  </yk-space>
</template>
<style lang="less">
.image-extra-btn {
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: rgb(0 0 0 / 50%);
  }
}
</style>
