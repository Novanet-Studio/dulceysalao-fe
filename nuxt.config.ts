import gql from '@rollup/plugin-graphql';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  extends: ['github:Novanet-Studio/tem-core'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/strapi',
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/image',
    '@sidebase/nuxt-pdf',
  ],

  app: {
    head: {
      titleTemplate: (title) => `${title} - TeM`,
      htmlAttrs: {
        lang: 'en',
        class: 'light',
      },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800&display=swap',
        },
      ],
      script: [
        {
          type: 'module',
          src: 'https://sandbox.web.squarecdn.com/v1/square.js',
        },
      ],
    },
    // pageTransition: { name: 'page', mode: 'out-in' },
    // layoutTransition: { name: 'page' },
  },

  runtimeConfig: {
    public: {
      strapi: {
        url: process.env.STRAPI_URL || 'http://localhost:1337',
      },
      services: {
        url: process.env.SERVICES_URL || 'http://localhost:3001',
      },
      SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
      SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
      // SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
      PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    },
  },

  css: ['~/assets/default.css'],

  pwa: {
    meta: {
      title: 'Dulce y Salao - Tienda',
      name: 'Dulce y Salao aplicacion web',
      author: 'Novanet Studio <info@novanet.studio>',
      description: 'Tienda online para vender productos online.',
      theme_color: '#ddabac',
      lang: 'en',
    },
    manifest: {
      name: 'Dulce y Salao aplicacion web',
      short_name: 'Dulce y Salao',
      description: 'Tienda online de Dulce y Salao.',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#ddabac',
    },
    icon: { source: 'static/favicon.png' },
    /*workbox: {
      enabled: true,
    },*/
  },
  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
  },

  ui: {
    global: true,
    icons: ['ph'],
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  vite: {
    plugins: [gql()],
  },

  vue: {
    defineModel: true,
    compilerOptions: {
      isCustomElement: (tag: string) =>
        ['swiper-container', 'swiper-slide'].includes(tag),
    },
  },
});
