/// <reference types="vite/client" />
declare module '*.md' {
  import type { ComponentCustomOptions } from "vue"
  const Component: CompositeOperations
  export default Component
}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}