/// <reference types="vite/client" />

declare module '*.md' {
  import type { Component } from 'vue';
  const Component: Component;
  export default Component;
}

declare module 'yk-design-ui' {
  import type { GlobalComponents } from 'vue';
  const ykDesignUI: GlobalComponents;
  export default ykDesignUI;
}
