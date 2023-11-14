export default defineAppConfig({
  ui: {
    primary: 'color-1',
    gray: 'color-7',
    notifications: {
      position: 'top-0 bottom-auto',
    },
  },
  header: {
    logo: 'logo.svg',
  },
  footer: {
    copyright: {
      site: 'dulceysalao.com',
    },
    widgets: [
      /* {
        link: 'https://wa.me/message/XTA7RUDHZKT4C1',
        icon: 'whatsapp',
        text: '+58 424-154-8330',
      },
      {
        link: 'https://www.facebook.com/bondikini',
        icon: 'phone',
        text: '+1 754-2528080',
      }, */
      {
        link: 'mailto:contact@dulceysalao.com',
        icon: 'email',
        text: 'contact@dulceysalao.com',
      },
      {
        link: 'https://instagram.com/dulceysalao',
        icon: 'instagram',
        text: '@dulceysalao',
      },
    ],
  },
  home: {
    slider: [
      '/img/home/dulce-y-salao-inicio-slider-1.jpg',
      '/img/home/dulce-y-salao-inicio-slider-2.jpg',
    ],
    sliders: [
      {
        image: '/img/home/dulce-y-salao-inicio-slider-1.jpg',
        title: 'Mensaje de navidad',
        description:
          'Regala esta navidad la tradicional Torta de Navidad de Graciela Sahmkow o cualquiera de nuestros productos Dulce y Salao.',
      },
      {
        image: '/img/home/dulce-y-salao-inicio-slider-2.jpg',
        title: 'My otro texto',
        description: 'Otro mensaje aca',
      },
    ],
  },
});
