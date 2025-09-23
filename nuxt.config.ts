export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/main.css'],
  ssr: false,
  
  nitro: {
    experimental: {
      wasm: false
    },
    minify: false
  },
  
  vite: {
    server: {
      hmr: {
        port: 24678,
        clientPort: 3000
      }
    },
    optimizeDeps: {
      exclude: ['oxc-transform', '@oxc-parser/binding-wasm32-wasi']
    },
    clearScreen: false
  },
  
  app: {
    head: {
      title: 'IWS - Internal Work System',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: 'https://www.zwei.com/wp-content/themes/zwei/img/favicon.ico'
        }
      ]
    }
  }
})