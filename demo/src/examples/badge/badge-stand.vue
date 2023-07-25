<template>
  <yk-space direction="vertical">
    <yk-space align="center">
      <yk-badge :count="2" status="primary"></yk-badge>
      <yk-badge :count="2"></yk-badge>
      <yk-badge :count="100" status="success"></yk-badge>
      <yk-badge :count="100" color="blueviolet"></yk-badge>
    </yk-space>
    <yk-space>
      <yk-badge is-dot></yk-badge>
      <yk-badge is-dot status="success"></yk-badge>
      <yk-badge is-dot status="primary"></yk-badge>
      <yk-badge is-dot color="blueviolet"></yk-badge>
    </yk-space>
  </yk-space>
</template>
