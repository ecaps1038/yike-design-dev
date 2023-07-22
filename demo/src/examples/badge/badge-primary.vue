<template>
  <yk-badge is-dot>
    <template #default>
      <yk-avatar size="l" shape="square"></yk-avatar>
    </template>
  </yk-badge>
  <yk-badge is-dot color="blueviolet">
    <template #default>
      <yk-avatar size="l" shape="square"></yk-avatar>
    </template>
  </yk-badge>
  <div style="margin-top: 30px" />
  <yk-badge is-dot out-dot>
    <template #default>
      <yk-avatar size="xl" shape="square"></yk-avatar>
    </template>
  </yk-badge>
  <yk-badge is-dot out-dot color="blueviolet">
    <template #default>
      <yk-avatar size="xl" shape="square"></yk-avatar>
    </template>
  </yk-badge>
  <h4>================</h4>
  <yk-badge :count="2">
    <template #default>
      <yk-avatar size="l" shape="square"></yk-avatar>
    </template>
  </yk-badge>
  <div style="margin-top: 30px" />
  <yk-badge :count="23344" offset="right">
    <template #default>
      <div style="width: 100px; height: 40px; background: #f6f6f8"></div>
    </template>
  </yk-badge>
  <div style="margin-top: 30px" />
  <yk-badge :count="2" offset="left">
    <template #default>
      <div style="width: 100px; height: 40px; background: #f6f6f8"></div>
    </template>
  </yk-badge>
  <div style="margin-top: 30px" />
  <yk-badge :count="22">
    <template #default>
      <yk-avatar size="l" shape="square"></yk-avatar>
    </template>
  </yk-badge>
  <yk-badge :count="1000">
    <template #default>
      <yk-avatar size="l" shape="square"></yk-avatar>
    </template>
  </yk-badge>
</template>
