<template>
  <div class="yk-alert-group">
    <div>
      <yk-alert type="info" :show-icon="false" message="showIcon = false" />
    </div>
    <div>
      <yk-alert type="success" message="hello，欢迎使用 Yike Design 组件库">
        <template #icon>
          <yk-icon name="yk-biaoqing"></yk-icon>
        </template>
      </yk-alert>
    </div>
    <div>
      <yk-alert
        type="warning"
        title="警告提示"
        :show-icon="false"
        message="您无权访问当前内容，请登录后重试。"
      >
        <template #icon>
          <yk-icon name="yk-suo"></yk-icon>
        </template>
      </yk-alert>
    </div>
    <div>
      <yk-alert
        type="error"
        closable
        title="错误提示"
        message="您当前访问的内容已经被删除。"
      >
        <template #icon>
          <yk-icon name="yk-shanchu"></yk-icon>
        </template>
      </yk-alert>
    </div>
  </div>
</template>
