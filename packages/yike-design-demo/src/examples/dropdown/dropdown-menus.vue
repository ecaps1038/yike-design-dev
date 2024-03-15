<template>
  <yk-space wrap>
    <yk-dropdown
      title="下拉菜单"
      @visible-change="handleChange"
      @selected="handleSelected"
    >
      <yk-dropdown-item value="1">Action 1</yk-dropdown-item>
      <yk-dropdown-item value="2">Action 2</yk-dropdown-item>
      <yk-dropdown-item value="3" submenu>
        <template #title>
          Action 3
          <IconRightOutline />
        </template>
        <yk-dropdown-item value="11">Action 11</yk-dropdown-item>
        <yk-dropdown-item value="22">Action 22</yk-dropdown-item>
        <yk-dropdown-item value="33">Action 33</yk-dropdown-item>
      </yk-dropdown-item>
      <yk-dropdown-item value="4">Action 4</yk-dropdown-item>
      <yk-dropdown-item value="5">Action 5</yk-dropdown-item>
    </yk-dropdown>

    <yk-dropdown
      title="下拉菜单"
      @visible-change="handleChange"
      @selected="handleSelected"
    >
      <yk-dropdown-item value="1">Action 1</yk-dropdown-item>
      <yk-dropdown-item value="2">Action 2</yk-dropdown-item>
      <yk-dropdown-item value="3" submenu dir="left" :arrow="false">
        <template #title>Action 3</template>
        <yk-dropdown-item value="11">Action 11</yk-dropdown-item>
        <yk-dropdown-item value="22">Action 22</yk-dropdown-item>
        <yk-dropdown-item value="33">Action 33</yk-dropdown-item>
      </yk-dropdown-item>
      <yk-dropdown-item value="4">Action 4</yk-dropdown-item>
      <yk-dropdown-item value="5">Action 5</yk-dropdown-item>
    </yk-dropdown>
  </yk-space>
</template>

<script setup>
function handleChange(value) {
  console.log('一级菜单：', value)
}

function handleSelected(value) {
  console.log(value)
}
</script>
