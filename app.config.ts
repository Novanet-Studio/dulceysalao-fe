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
      {
        link: 'https://wa.me/message/DVQ5K5HVMJLNF1',
        icon: 'whatsapp',
        text: '+58 424-101-3553',
      },
      /* {
        link: 'https://www.facebook.com/bondikini',
        icon: 'phone',
        text: '+1 754-2528080',
      }, */
      {
        link: 'mailto:dulceysalao@hotmail.com',
        icon: 'email',
        text: 'dulceysalao@hotmail.com',
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
      '/img/home/dulce-y-salao-torta-de-navidad.webp',
      '/img/home/dulce-y-salao-florecitas-de-queso.webp',
      '/img/home/dulce-y-salao-torta-de-navidad-picada.webp',
      '/img/home/dulce-y-salao-torta-de-navidad-servida.webp',
    ],
  },
  nosotros: {
    slider: [
      '/img/about/dulce-y-salao-torta-de-queso.webp',
      '/img/about/dulce-y-salao-torta-de-navidad-en-caja.webp',
      '/img/about/dulce-y-salao-torta-de-queso-con-dulce-de-guayaba.webp',
    ],
    historia: {
      fundadora: {
        text: `Nuestra fundadora, Graciela, es una arquitecta graduada de la UCV y ha sido reconocida por su labor emprendedora.Desde muy joven, Graciela encontró en la cocina un espacio que no solo le encantaba, sino que también la conectaba con sus raíces y tradiciones familiares specialmente, compartía momentos especiales junto a su madre y abuela, quienes le transmitieron su pasión por la cocina.\n\nDurante sus años de universidad, Graciela ayudaba a su abuela en la producción y venta de las tortas de Navidad. Con el tiempo, ella asumió la responsabilidad y logró satisfacer a los clientes, convirtiendo la torta de Navidad en parte de su tradición navideña. Inspirada por el éxito de este producto, Graciela decidió expandir su negocio y crear una empresa que ofreciera productos alimenticios durante todo el año.\n\nAsí nació Dulce y Salao en el año 2005. El nombre refleja la inspiración de los sabores caraqueños, donde siempre se combina lo dulce y lo salado. Graciela trabajó arduamente para perfeccionar la receta de la torta de queso, convirtiéndola en el producto icónico de nuestra empresa. A lo largo de los años, hemos desarrollado nuevosformatos y presentaciones para satisfacer las necesidades y gustos de nuestros clientes.`,
        image: `/img/about/dulce-y-salao-graciela-sahmkow.webp`,
      },
      directora: {
        text: `Mónica Sahmkow le inyecta modernidad y creatividad a Dulce y Salao.Nuestra directora de producción e innovación es abogada, pero como Graciela, la cocina siempre ha estado presente en su vida y mientras estudiaba derecho se dio cuenta que su camino era otro. Comenzó en los cursos sabatinos del ICC Caracas y al año siguiente decidió tomar el curso regular mientras se graduaba de derecho.\n\nAl graduarse de abogada y del ICC, hace pasantías en España en el restaurante "Martin Berasateqgui" uno de los restaurantes 3 estrellas de España y al regresar comienza a trabajar en Dulce y Salao estando a cargo de la producción del taller y la creación de nuevos productos. Un año más tarde se va a estudiar a @ferrandiparis en París, estudios que finalizan con las pasantías en Le Meurice París, uno de los restaurantes tres estrellas de esta ciudad, cuna de la cocina.\n\n Al regresar a Caracas regresa a Dulce y Salao y en paralelo funda el restaurante itinerante Alex y Monica que estuvo operando por 6 años. Se convirtió en consultora gastronómica para restaurantes, y empresas que elaboran y venden productos alimenticios, trabajo que le permite utilizar su gran creatividad y compartir su arte en la elaboración de
        platos, menús y productos gastronómicos.\n\nHoy en día Mónica es la Chef ejecutiva de Sereno By Mónica Sahmkow en
        el Hotel Cayena Caracas y es la Directora Académica de la Academia de Gastronomía UCAB-PLAZA'S.`,
        image: `/img/about/dulce-y-salao-monica-sahmkow.webp`,
      },
      general: {
        text: `Hoy en día, nuestras tortas de queso se han convertido en un regalo perfecto para cualquier ocasión. Ya sea para disfrutar en casa o para sorprender a alguien especial, nuestras tortas son una deliciosa opción. Además, puedes encontrarlas no solo por encargo, sino también en diferentes locales y supermercados de Caracas.\n\nEn Dulce y Salao, nos enorgullece ofrecer productos de alta calidad,elaborados con ingredientes frescos y cuidadosamente seleccionados. Cada torta de queso es preparada con amor y dedicación, siguiendo la receta original de Graciela.\n\nTe invitamos a explorar nuestro sitio web y descubrir más sobre nuestra historia, nuestros productos y cómo realizar tu pedido. Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. ¡Estaremos encantados de atenderte!`,
      },
    },
  },
});
