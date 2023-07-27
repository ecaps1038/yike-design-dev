<template>
  <yk-space direction="vertical">
    <yk-progress :type="'circle'" :size="'s'"></yk-progress>
    <yk-progress :type="'circle'" :percent="99"></yk-progress>
    <yk-progress
      :status="'success'"
      :type="'circle'"
      :percent="99"
    ></yk-progress>
    <yk-progress :type="'circle'" :percent="90" :size="'l'"></yk-progress>
    <yk-progress :type="'circle'" :percent="110"></yk-progress>
  </yk-space>
</template>
