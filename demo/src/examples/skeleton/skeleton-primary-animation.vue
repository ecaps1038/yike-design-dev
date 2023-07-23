<template>
  <yk-skeleton :animation="true">
    <yk-space direction="vertical" :style="{ width: '100%' }" size="large">
      <yk-skeleton-line :rows="3" />
      <yk-skeleton-shape />
    </yk-space>
  </yk-skeleton>
</template>
