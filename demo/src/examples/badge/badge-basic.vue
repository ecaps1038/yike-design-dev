<template>
  <yk-space>
    <yk-badge :count="2">
      <template #default>
        <yk-button>主要按钮</yk-button>
      </template>
    </yk-badge>
    <yk-badge is-dot>
      <template #default>
        <yk-avatar size="l" shape="square"></yk-avatar>
      </template>
    </yk-badge>
    <yk-badge is-dot out-dot>
      <template #default>
        <yk-avatar size="l" shape="square"></yk-avatar>
      </template>
    </yk-badge>
    <yk-badge :count="2">
      <template #default>
        <div
          style="
            width: 40px;
            height: 40px;
            background: #f6f6f8;
            border-radius: 8px;
          "
        ></div>
      </template>
    </yk-badge>
    <yk-badge :count="100">
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
