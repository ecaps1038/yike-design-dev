<template>
  <div style="width: 360px">
    <yk-input-tag
      v-model="tag"
      class="input-tag-item"
      placeholder="超过三个将折叠"
      :mincollapsed-num="mincollapsedNum"
    ></yk-input-tag>

    <yk-input-tag
      v-model="tag"
      class="input-tag-item"
      placeholder="超过三个将折叠"
      :mincollapsed-num="mincollapsedNum"
    >
      <template #collapsedItems="{ collapsedTags }">
        <yk-popover
          placement="top"
          title="剩余部分:"
          :content="collapsedTags.join(',')"
        >
          <yk-tag class="more-tag" size="s">
            更多({{ collapsedTags.length }})
          </yk-tag>
        </yk-popover>
      </template>
    </yk-input-tag>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const mincollapsedNum = 3
const tag = ref([])
</script>

<style lang="less">
.input-tag-item {
  margin-bottom: 20px;
}
.yk-tooltip {
  display: inline-block;
}
</style>
