/// <reference types="vite/client" />

declare module '*.md' {
  import type { Component } from 'vue';
  const Component: Component;
  export default Component;
}
