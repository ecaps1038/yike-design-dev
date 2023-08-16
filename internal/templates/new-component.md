## components/[component]/index.ts

```ts: index
import #{upperCompName}# from './src/#{lowDashName}#.vue';
import { withInstall } from '@yike/utils';

export const #{upperFullCompName}# = withInstall(#{upperCompName}#);
export default #{upperFullCompName}#;
export * from './src/#{lowDashName}#';
```

## components/[component]/src/[component].vue

```vue: srcVue
<template>
  <div :class="bem()">#{upperCompName}#</div>
</template>

<script setup lang="ts">
import type { #{upperCompName}#Props } from './#{lowDashName}#';
import { createCssScope } from '@yike/utils';

defineOptions({
  name: '#{upperFullCompName}#',
});

const bem = createCssScope('#{lowDashName}#')
const props = withDefaults(defineProps<#{propsName}#>(), {
  id: '',
});
</script>
```

## components/[component]/src/[component].ts

```ts: srcTS
export type #{propsName}# = {
  id?: string;
};
```

## components/[component]/style/[component].less

```ts: styleLess
@import '@yike/styles/colors/colors.less';

.yk-#{lowDashName}# {}
```

## components/[component]/style/[component].ts

```ts: styleTS
import './index.less';
```

## yike-design-ui/component.ts

```ts: component
#{importItems.join('\n')}#

import type { Plugin } from 'vue';

export default [
  #{lists.join(',\n  ')}#
] as Plugin[];
```

## demo/src/example/[component]/doc.md

```md: doc
## #{upperFullCompName}# #{descName}#

:::snippet
基本用法
这里展示基本用法
<#{upperCompName}#Primary/>
:::
```

## demo/src/example/[component]/[component]-primary.vue

```vue: primary
<template>
  <yk-space wrap>
    <#{tagName}#></#{tagName}#>
  </yk-space>
</template>
```
