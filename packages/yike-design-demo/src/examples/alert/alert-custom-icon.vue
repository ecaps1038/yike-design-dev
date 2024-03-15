<template>
  <div class="yk-alert-group">
    <yk-alert type="info" :show-icon="false" message="showIcon = false" />
    <yk-alert type="success" message="hello，欢迎使用 Yike Design 组件库">
      <template #icon><IconEmojiOutline /></template>
    </yk-alert>
    <yk-alert
      type="warning"
      title="警告提示"
      :show-icon="false"
      message="您无权访问当前内容，请登录后重试。"
    >
      <template #icon><IconLockOutline /></template>
    </yk-alert>
    <yk-alert
      type="error"
      closable
      title="错误提示"
      message="您当前访问的内容已经被删除。"
    >
      <template #icon><IconDeleteOutline /></template>
    </yk-alert>
  </div>
</template>
