import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vite.dev/config/
export default defineConfig({
  base: '/machineheads-react-ts/',
  plugins: [reactRefresh()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "src/styles/variables.scss";`
      }
    }
  },
})
