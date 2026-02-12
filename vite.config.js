import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  base: '/tarun-pable/',
  resolve: {
    alias: {
      // 2. Define the @ symbol as a path to your 'src' folder
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.js', './src/**/*.vue'],
    }),
  ],
})
