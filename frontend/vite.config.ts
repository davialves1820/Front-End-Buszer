import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,         // permite usar test/expect sem importar
    environment: 'jsdom',  // ✅ necessário para render/react-testing-library
    setupFiles: './src/setupTests.ts', // opcional, para configurar RTL ou jest-dom
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}']
  }
})
