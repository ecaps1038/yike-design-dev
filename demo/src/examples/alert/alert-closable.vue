<template>
  <div class="yk-alert-group">
    <div>
      <yk-alert type="info" closable message="这里是 info 提示" />
    </div>
    <div>
      <yk-alert type="success" closable message="这里是 success 提示" />
    </div>
    <div>
      <yk-alert
        type="warning"
        title="标题标题"
        closable
        message="这里是 warning 提示"
      />
    </div>
    <div>
      <yk-alert
        type="error"
        closable
        title="标题标题"
        message="这里是 error 提示"
      />
    </div>
  </div>
</template>
