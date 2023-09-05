<template>
  <yk-space>
    <yk-button disabled>
      加入
      <IconCirclePlusOutline style="margin-left: 4px" />
    </yk-button>
    <yk-button disabled>
      <template #icon>
        <IconDeleteOutline />
      </template>
      删除
    </yk-button>
    <yk-button disabled shape="circle">
      <IconPlusOutline />
    </yk-button>
  </yk-space>
</template>
