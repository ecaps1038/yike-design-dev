<template>
  <yk-space>
    <yk-tooltip trigger="hover">
      <yk-button type="outline">hover</yk-button>
    </yk-tooltip>
    <yk-tooltip trigger="click">
      <yk-button type="outline">click</yk-button>
    </yk-tooltip>
    <yk-tooltip trigger="contextMenu">
      <yk-button type="outline">contextmenu</yk-button>
    </yk-tooltip>
    <yk-tooltip trigger="focus">
      <input />
    </yk-tooltip>
    <yk-tooltip :trigger="['contextMenu', 'click']">
      <yk-button type="outline">click/contextMenu</yk-button>
    </yk-tooltip>
  </yk-space>
</template>
