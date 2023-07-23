<template>
  <yk-space direction="vertical">
    <yk-space>
      <yk-badge is-dot>
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
      <yk-badge is-dot status="primary">
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
      <yk-badge is-dot status="success">
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
      <yk-badge is-dot status="warning">
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
    </yk-space>
    <yk-space>
      <yk-badge :count="0" show-zero>
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
      <yk-badge :count="5" status="primary">
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
      <yk-badge :count="88" status="success">
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
      <yk-badge :count="102" status="warning">
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
    </yk-space>
  </yk-space>
</template>
