import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const PACKAGES = ['KtbProjectOne', 'KtbProjectTwo', 'KtbProjectThree']

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, './index.js'),
      name: 'ktbPackagesProject',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'vue'
        // 引入的库
      ],
      output: {
        // 输出的文件名
        assetFileNames: chunkInfo => {
          if (chunkInfo.name === 'style.css') {
            return 'index.css'
          }
          return chunkInfo.name
        }
      },
      // 手动分包
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor'
        }
        if (id.includes('/packages/hooks')) {
          return 'hooks'
        }
        if (id.includes('/packages/utils')) {
          return 'utils'
        }
        for (const key in PACKAGES) {
          if (id.includes(`/packages/pages/${key}`)) {
            return key
          }
        }
      }
    }
  }
})
