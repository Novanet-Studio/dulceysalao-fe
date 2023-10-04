export default defineAppConfig({
  header: {
    logo: 'logo.png',
  },
  footer: {
    copyright: {
      site: 'dulcesysalados.com',
    },
    widgets: [
      {
        link: 'https://www.instagram.com/dulcesysalados/',
        icon: 'instagram',
        text: '@dulcesysalados',
      },
      {
        link: 'https://wa.me/message/XTA7RUDHZKT4C3',
        icon: 'whatsapp',
        text: '+58 424-154-1000',
      },
      {
        link: 'https://www.facebook.com/dulcesysalados',
        icon: 'facebook',
        text: 'dulcesysalados',
      },
    ],
  },
  home: {
    slider: ['/img/home/1.png', '/img/home/2.png'],
    promotions: ['/img/home/promotion-1.jpeg'],
  },
});
