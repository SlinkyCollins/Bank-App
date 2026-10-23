import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material', '@mui/lab'],
          swiper: ['swiper'],
          redux: ['@reduxjs/toolkit', 'react-redux', 'redux'],
        },
      },
    },
    cssCodeSplit: true,
  },
})
