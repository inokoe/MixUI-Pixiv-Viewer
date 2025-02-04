import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { version } from './package.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@api': path.resolve(__dirname, './api'),
      '@srcApi': path.resolve(__dirname, './src/api'),
      // 解决 3.22.0 版本无法TreeShaking的问题, https://github.com/tabler/tabler-icons/issues/1233
      // 临时解决方案：https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2428245119
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-icons': ['@tabler/icons-react', 'lucide-react'],
          'vendor-charts': ['recharts'],
          'vendor-map': ['leaflet', 'leaflet/dist/leaflet.css'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
