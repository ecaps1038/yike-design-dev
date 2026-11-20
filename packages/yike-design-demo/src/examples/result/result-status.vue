<template>
  <yk-space dir="vertical" style="width: 100%">
    <yk-result
      status="error"
      title="提交失败"
      subtitle="请检查网络连接后重试，或联系管理员。"
    >
      <template #extra>
        <yk-button>重新提交</yk-button>
      </template>
    </yk-result>
    <yk-result
      status="warning"
      title="存在风险操作"
      subtitle="当前操作可能影响数据完整性，请谨慎确认。"
    />
    <yk-result
      status="info"
      title="暂无数据"
      subtitle="当前筛选条件下没有找到相关内容。"
    />
  </yk-space>
</template>
