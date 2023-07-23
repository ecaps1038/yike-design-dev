<template>
  <yk-space direction="vertical">
    <yk-space>
      <yk-badge :count="0" show-zero>
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
      <span style="font-size: 14px; font-weight: 700; margin-top: 10px">
        {{ `show-zero: true` }} | {{ `count: 0` }}
      </span>
    </yk-space>
    <yk-space>
      <yk-badge :count="0">
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
      <span style="font-size: 14px; font-weight: 700; margin-top: 10px">
        {{ `show-zero: false` }} | {{ `count: 0` }}
      </span>
    </yk-space>
    <yk-space>
      <yk-badge :count="MessageCount" show-zero>
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
      <div class="btn-group">
        <yk-button
          type="outline"
          style="
            border-right: 1px solid #fff;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          "
          @click="MessageCount--"
        >
          -
        </yk-button>
        <yk-button
          type="outline"
          style="border-top-left-radius: 0; border-bottom-left-radius: 0"
          @click="MessageCount++"
        >
          +
        </yk-button>
      </div>
      <span style="font-size: 14px; font-weight: 700; margin-top: 10px">
        {{ `消息数量: ${MessageCount}` }}
      </span>
    </yk-space>
  </yk-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const MessageCount = ref<number>(3)
</script>
