import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'NumFormatUtils',
      fileName: () => 'index.js', 
      formats: ['es'],
    },
    rollupOptions: {
      external: [], 
    },
  },
});