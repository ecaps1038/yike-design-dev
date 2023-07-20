<template>
  <yk-space>
    <yk-tooltip :overlay-style="{ backgroundColor: 'pink' }">
      <yk-button type="outline">pink</yk-button>
    </yk-tooltip>
    <yk-tooltip :overlay-style="{ backgroundColor: 'red' }">
      <yk-button type="outline">red</yk-button>
    </yk-tooltip>
    <yk-tooltip :overlay-style="{ backgroundColor: 'green' }">
      <yk-button type="outline">green</yk-button>
    </yk-tooltip>
    <yk-tooltip :overlay-style="{ backgroundColor: 'orange' }">
      <yk-button type="outline">orange</yk-button>
    </yk-tooltip>
    <yk-tooltip overlay-class-name="tooltip-class-name">
      <yk-button type="outline">blue</yk-button>
    </yk-tooltip>
  </yk-space>
</template>
<style scoped>
:deep .tooltip-class-name {
  background-color: blue !important;
}
</style>
