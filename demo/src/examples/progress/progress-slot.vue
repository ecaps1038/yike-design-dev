<template>
  <yk-space direction="vertical">
    <yk-progress>
      <template #format="{ percent }">
        <span style="color: red">剩余{{ percent }}</span>
      </template>
    </yk-progress>
  </yk-space>
</template>
