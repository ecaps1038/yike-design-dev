import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  test: {
    testTransformMode: {
      web: ['*.{ts,tsx}'],
    },
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
  },
  plugins: [Vue(), VueJsx()],
});
