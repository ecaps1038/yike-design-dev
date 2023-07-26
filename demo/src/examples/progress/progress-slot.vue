<template>
  <yk-space direction="vertical">
    <yk-progress>
      <template #format="percent">
        <span style="color: red">{{ percent }}</span>
      </template>
    </yk-progress>
  </yk-space>
</template>
