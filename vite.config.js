import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from "@vitejs/plugin-react"

export default defineConfig({
	plugins:[react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        en: resolve(__dirname, 'index_en.html') // Явное указание файла
      }
    }
  }
})