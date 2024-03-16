<template>
  <yk-space>
    <yk-badge :count="2">
      <yk-button>主要按钮</yk-button>
    </yk-badge>
    <yk-badge is-dot>
      <yk-avatar size="l" shape="square"></yk-avatar>
    </yk-badge>
    <yk-badge is-dot in-dot>
      <yk-avatar size="l" shape="square"></yk-avatar>
    </yk-badge>
    <yk-badge :count="2">
      <div
        style="
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #f6f6f8;
        "
      ></div>
    </yk-badge>
    <yk-badge :count="100">
      <div
        style="
          width: 100px;
          height: 40px;
          border-radius: 8px;
          background: #f6f6f8;
        "
      ></div>
    </yk-badge>
  </yk-space>
</template>
