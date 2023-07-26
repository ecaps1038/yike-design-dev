<template>
  <yk-space direction="vertical">
    <yk-space>
      <yk-badge :count="0" show-zero>
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
      <span style="margin-top: 10px; font-size: 14px; font-weight: 700">
        {{ `show-zero: true` }} | {{ `count: 0` }}
      </span>
    </yk-space>
    <yk-space>
      <yk-badge :count="0">
        <yk-avatar size="l" shape="square"></yk-avatar>
      </yk-badge>
      <span style="margin-top: 10px; font-size: 14px; font-weight: 700">
        {{ `show-zero: false` }} | {{ `count: 0` }}
      </span>
    </yk-space>
    <yk-space>
      <yk-badge :count="MessageCount" show-zero>
        <yk-avatar size="l" shape="square"></yk-avatar>
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
      <span style="margin-top: 10px; font-size: 14px; font-weight: 700">
        {{ `消息数量: ${MessageCount}` }}
      </span>
    </yk-space>
  </yk-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const MessageCount = ref<number>(3)
</script>
