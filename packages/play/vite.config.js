import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    minify: false, // 关闭文件压缩
    outDir: '../../dist', // 输出目录
    emptyOutDir: true // 清空输出目录
  }
})
