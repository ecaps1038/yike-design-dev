<template>
  <yk-space wrap>
    <yk-dropdown>
      <template #title>下拉菜单</template>
      <yk-dropdown-item>Action 1</yk-dropdown-item>
      <yk-dropdown-item>Action 2</yk-dropdown-item>
      <yk-dropdown-item>Action 3</yk-dropdown-item>
      <yk-dropdown-item>Action 4</yk-dropdown-item>
    </yk-dropdown>
    <yk-dropdown trigger="click">
      <template #title>下拉菜单</template>
      <yk-dropdown-item>Action 1</yk-dropdown-item>
      <yk-dropdown-item>Action 2</yk-dropdown-item>
      <yk-dropdown-item>Action 3</yk-dropdown-item>
      <yk-dropdown-item>Action 4</yk-dropdown-item>
    </yk-dropdown>
    <yk-dropdown trigger="contextMenu">
      <template #title>下拉菜单</template>
      <yk-dropdown-item>Action 1</yk-dropdown-item>
      <yk-dropdown-item>Action 2</yk-dropdown-item>
      <yk-dropdown-item>Action 3</yk-dropdown-item>
      <yk-dropdown-item>Action 4</yk-dropdown-item>
    </yk-dropdown>
  </yk-space>
</template>
