<template>
  <yk-space wrap>
    <yk-dropdown title="hover">
      <yk-dropdown-item value="1">Action 1</yk-dropdown-item>
      <yk-dropdown-item value="2">Action 2</yk-dropdown-item>
      <yk-dropdown-item value="3">Action 3</yk-dropdown-item>
      <yk-dropdown-item value="4">Action 4</yk-dropdown-item>
    </yk-dropdown>
    <yk-dropdown title="click" trigger="click">
      <yk-dropdown-item value="11">Action 1</yk-dropdown-item>
      <yk-dropdown-item value="22">Action 2</yk-dropdown-item>
      <yk-dropdown-item value="33">Action 3</yk-dropdown-item>
      <yk-dropdown-item value="44">Action 4</yk-dropdown-item>
    </yk-dropdown>
    <yk-dropdown title="contextmenu" trigger="contextmenu">
      <yk-dropdown-item value="111">Action 1</yk-dropdown-item>
      <yk-dropdown-item value="222">Action 2</yk-dropdown-item>
      <yk-dropdown-item value="333">Action 3</yk-dropdown-item>
      <yk-dropdown-item value="444">Action 4</yk-dropdown-item>
    </yk-dropdown>
    <yk-dropdown
      title="click & contextmenu"
      :trigger="['click', 'contextmenu']"
    >
      <yk-dropdown-item value="111">Action 1</yk-dropdown-item>
      <yk-dropdown-item value="222">Action 2</yk-dropdown-item>
      <yk-dropdown-item value="333">Action 3</yk-dropdown-item>
      <yk-dropdown-item value="444">Action 4</yk-dropdown-item>
    </yk-dropdown>
  </yk-space>
</template>
