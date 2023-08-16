## svg-icon/index.ts

```ts: index
export { default } from './yike-icon';
export type {} from './icon-components';
#{exports.join('\n')}#
```

## svg-icon/yike-icon.ts

```ts: yikeIcon
#{imports.join('\n')}#

import type { Plugin } from 'vue';

export default [
  #{components.join(',\n  ')}#
] as Plugin[];
```

## svg-icon/icon-components.ts

```ts: iconComponents
export {};

// @ts-nocheck
declare module 'vue' {
  export interface GlobalComponents {
    #{exports.map((item) => item).join('\n    ')}#
  }
}
```

## svg-icon/[component]/index.ts

```ts: iconIndex
import _#{componentName}# from './#{name}#.vue';
import { withInstall } from '@yike/utils';

export const #{componentName}# = withInstall(_#{componentName}#);
export default #{componentName}#;
```

## svg-icon/[component].vue

```vue: iconVue
<script setup lang="ts">
import { CSSProperties, computed } from 'vue';

defineOptions({
  name: '#{componentName}#',
});

const props = withDefaults(
  defineProps<{
    size?: string | number
    strokeWidth?: number
    strokeLinecap?: 'butt' | 'round' | 'square'
    strokeLinejoin?: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round'
    rotate?: number
    spin?: boolean
  }>(),
  {
    strokeWidth: 0,
    strokeLinecap: 'butt',
    strokeLinejoin: 'arcs',
    size: 'inherit',
    rotate: undefined,
    spin: false,
  },
);

const cls = ['yk-icon', '#{name}#'];
const innerStyle = computed(() => {
  const styles: CSSProperties = { fill: 'currentColor' };

  if (props.size) {
    const isNumber = typeof props.size === 'number'
    styles.fontSize = isNumber ? `${props.size}px` : props.size;
  }
  if (props.rotate) {
    styles.transform = `rotate(${props.rotate}deg)`;
  }
  return styles;
});
</script>

<template>#{svgHtml}#</template>
```
