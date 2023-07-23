<template>
  <yk-space direction="vertical">
    <yk-space>
      <yk-badge :count="2" offset="left">
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
    <yk-space>
      <yk-badge :count="100" offset="right">
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
  </yk-space>
</template>
