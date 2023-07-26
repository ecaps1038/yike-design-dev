<template>
  <yk-space direction="vertical">
    <yk-space>
      <yk-badge :count="2" offset="left">
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
    <yk-space>
      <yk-badge :count="100" offset="right">
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
    <yk-space>
      <yk-badge :count="1">
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
      <yk-badge :count="1" :offset="[20, 20]">
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
    </yk-space>
  </yk-space>
</template>
