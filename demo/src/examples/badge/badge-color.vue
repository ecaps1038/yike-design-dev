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
          background: #f6f6f8;
          border-radius: 8px;
        "
      ></div>
    </yk-badge>
  </yk-space>
</template>
