<template>
  <yk-space direction="vertical">
    <yk-space>
      <yk-badge is-dot out-dot>
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
      <yk-badge is-dot out-dot status="primary">
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
      <yk-badge is-dot out-dot status="success">
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
      <yk-badge is-dot out-dot status="warning">
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
    </yk-space>
    <yk-space>
      <yk-badge :count="0" show-zero>
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
      <yk-badge :count="5" status="primary">
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
      <yk-badge :count="88" status="success">
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
      <yk-badge :count="102" status="warning">
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
    </yk-space>
  </yk-space>
</template>
