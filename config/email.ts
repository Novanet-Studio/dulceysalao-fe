export function receiptTemplateConfig() {
  return {
    subject: 'Recibo de compra para %customer% - Orden ID: %orderId%',
    text: 'Recibo de compra para',
    template: {
      preview: 'Dulceysalao - Recibo de compra',
      theme: {
        primary: '#7f2346',
        primaryTop: '#6a223e',
        secondary: '#6a223e',
        secondaryInfo: '#fefdfd',
        foreground: '#efeef1',
        info: '#fff',
      },
      header: {
        icon: {
          url: 'https://raw.githubusercontent.com/Novanet-Studio/dulceysalao-fe/main/static/dulce-y-salao-logo.png',
          alt: 'Dulceysalao',
        },
        contact: {
          email: 'dulceysalao@gmail.com',
          instagram: '@dulceysalao',
          phone: '+58 412-2347585',
        },
      },
      body: {},
      footer: {
        cta: {
          link: 'https://dulceysalao.netlify.app/',
          text: 'Ir a la tienda',
        },
        social: [
          {
            icon: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/develop/static/email/x.png',
            link: '#',
          },
          {
            icon: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/develop/static/email/facebook.png',
            link: '#',
          },
          {
            icon: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/develop/static/email/whatsapp.png',
            link: '#',
          },
        ],
        copyright: {
          text: '© 2022 Dulceysalao',
          location: 'Caracas, Venezuela',
        },
      },
    },
  };
}

export function merchantTemplateConfig() {
  return {
    subject: 'Nueva orden - Orden ID: %orderId%',
    text: 'Nueva orden',
    template: {
      preview: 'Nueva orden',
      theme: {
        primary: '#7f2346',
        primaryTop: '#6a223e',
        secondary: '#6a223e',
        secondaryInfo: '#fefdfd',
        foreground: '#efeef1',
        info: '#fff',
      },
      header: {
        icon: {
          url: 'https://raw.githubusercontent.com/Novanet-Studio/dulceysalao-fe/main/static/dulce-y-salao-logo.png',
          alt: 'Dulceysalao',
        },
      },
      footer: {
        cta: {
          link: 'https://dulceysalao-be.netlify.com/',
          text: 'Ir al panel',
        },
        copyright: {
          text: '© 2022 Dulceysalao',
          location: 'Caracas, Venezuela',
        },
      },
    },
  };
}
