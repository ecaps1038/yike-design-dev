<template>
  <yk-space wrap>
    <yk-dropdown title="下拉菜单" @visible-change="handleChange">
      <yk-dropdown-item>Action 1</yk-dropdown-item>
      <yk-dropdown-item>Action 2</yk-dropdown-item>
      <yk-dropdown-item>
        <yk-dropdown
          trigger="click"
          placement="rightTop"
          :overlay-style="{ top: '-4px', right: '-8px' }"
          @selected="handleSelected"
        >
          <template #title>二级菜单</template>
          <yk-dropdown-item value="11">Action 11</yk-dropdown-item>
          <yk-dropdown-item value="12">Action 12</yk-dropdown-item>
          <yk-dropdown-item value="13">Action 13</yk-dropdown-item>
          <yk-dropdown-item value="14">Action 14</yk-dropdown-item>
        </yk-dropdown>
      </yk-dropdown-item>
      <yk-dropdown-item>Action 4</yk-dropdown-item>
      <yk-dropdown-item>Action 5</yk-dropdown-item>
    </yk-dropdown>
  </yk-space>
</template>

<script setup>
function handleSelected(value) {
  console.log(value)
}

function handleChange(value) {
  console.log('一级下拉菜单：', value)
}
</script>
