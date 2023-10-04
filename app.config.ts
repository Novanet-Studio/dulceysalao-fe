export default defineAppConfig({
  header: {
    logo: 'logo.png',
  },
  footer: {
    copyright: {
      site: 'Dulce y Salao',
    },
    widgets: [
      {
        link: 'https://wa.me/message/XTA7RUDHZKT4C3',
        icon: 'whatsapp',
        text: '+58 424-154-1000',
      },
      {
        link: 'mailto:dulcesysalados@gmail.com',
        icon: 'email',
        text: 'dulcesysalados@gmail.com',
      },
      {
        link: 'https://www.instagram.com/dulcesysalados',
        icon: 'instagram',
        text: '@dulcesysalados',
      },
    ],
  },
  home: {
    slider: ['/img/home/1.png', '/img/home/2.png'],
  },
});
