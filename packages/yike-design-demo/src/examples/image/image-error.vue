<template>
  <yk-space size="xl">
    <yk-image
      src="image-error.png"
      alt="图片加载失败"
      width="300"
      height="200"
    ></yk-image>
    <yk-image src="image-error.png" width="300" height="200">
      <template #error-icon>
        <IconTipOutline />
      </template>
    </yk-image>
  </yk-space>
</template>
