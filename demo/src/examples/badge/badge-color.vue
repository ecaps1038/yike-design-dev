<template>
  <yk-space>
    <yk-badge is-dot color="blueviolet">
      <template #default>
        <yk-avatar size="l" shape="square"></yk-avatar>
      </template>
    </yk-badge>
    <yk-badge :count="9" color="blueviolet">
      <template #default>
        <yk-avatar size="l" shape="square"></yk-avatar>
      </template>
    </yk-badge>
    <yk-badge :count="100" offset="right" color="blueviolet">
      <template #default>
        <div
          style="
            width: 100px;
            height: 40px;
            background: #f6f6f8;
            border-radius: 8px;
          "
        ></div>
      </template>
    </yk-badge>
  </yk-space>
</template>
