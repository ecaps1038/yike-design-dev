<template>
  <div class="yk-alert-group">
    <div>
      <yk-alert closable message="更换关闭图标">
        <template #closeElement>
          <IconCloseOutline />
        </template>
      </yk-alert>
    </div>
    <div>
      <yk-alert type="success" closable message="文字形式的关闭图标">
        <template #closeElement>Close Now</template>
      </yk-alert>
    </div>
  </div>
</template>
