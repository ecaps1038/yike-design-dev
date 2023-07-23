<!-- eslint-disable no-irregular-whitespace -->
<template>
  <yk-space direction="vertical">
    <yk-space>
      <yk-badge :count="2">
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
    </yk-space>
    <yk-space>
      <yk-badge :count="MessageCount">
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
      <span style="font-size: 14px; font-weight: 700; margin-top: 10px">
        {{ `消息数量: ${MessageCount}` }}
      </span>
    </yk-space>
    <yk-space>
      <yk-badge :count="9999999" :overflow-count="9999">
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
      <span style="font-size: 14px; font-weight: 700; margin-top: 10px">
        {{ `消息数量: 9999999` }}
      </span>
    </yk-space>
    <yk-space>
      <yk-badge :count="MessageCount2">
        <template #default>
          <yk-avatar size="l" shape="square"></yk-avatar>
        </template>
      </yk-badge>
      <yk-badge :count="MessageCount2" :overflow-count="5">
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
          @click="MessageCount2--"
        >
          -
        </yk-button>
        <yk-button
          type="outline"
          style="border-top-left-radius: 0; border-bottom-left-radius: 0"
          @click="MessageCount2++"
        >
          +
        </yk-button>
      </div>
      <span style="font-size: 14px; font-weight: 700; margin-top: 10px">
        {{ `消息数量: ${MessageCount2}` }}
      </span>
    </yk-space>
  </yk-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const MessageCount = ref<number>(233)
const MessageCount2 = ref<number>(8)
</script>
