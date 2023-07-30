<template>
  <yk-space>
    <yk-badge is-dot color="blueviolet">
      <yk-avatar size="l" shape="square"></yk-avatar>
    </yk-badge>
    <yk-badge :count="9" color="blueviolet">
      <yk-avatar size="l" shape="square"></yk-avatar>
    </yk-badge>
    <yk-badge :count="100" offset="right" color="blueviolet">
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
