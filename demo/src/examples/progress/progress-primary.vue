<template>
  <yk-space direction="vertical">
    <yk-progress></yk-progress>
    <yk-progress :show-text="false"></yk-progress>
    <yk-progress :percent="50" :stroke-color="'red'"></yk-progress>
    <yk-progress :percent="90" :stroke-color="'#000'"></yk-progress>
  </yk-space>
</template>
