import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'

const { geoserverHost } = require('./public/setting')

//import { geoserverHost } from './public/setting'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  const proxyHost = !isDev ? 'http://localhost:9999/' : geoserverHost
  return {
    plugins: [
      vue(),
      cesium(),
      //babel()
    ],
    base: './',
    sourcemap: isDev,
    define: {
      // enable hydration mismatch details in production build
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~': resolve(__dirname, 'public')
      }
      // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    optimizeDeps: {
      // include: ['axios'],
    },
    build: {
      target: 'modules',
      outDir: 'dist',
      assetsDir: 'assets',
      minify: 'terser' // terser
    },
    server: {
      cors: true,
      open: false,
      host: '0.0.0.0',
      port: 9999,
      proxy: {
        '/geoserver': {
          target: proxyHost, // proxy site
          changeOrigin: true
        },
        '/terrain': {
          target: proxyHost, // proxy site
          changeOrigin: true
        }
      }
    }
  }
})
