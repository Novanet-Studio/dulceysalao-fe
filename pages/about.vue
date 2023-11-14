<script setup>
const appConfig = useAppConfig();

definePageMeta({
  name: 'Company',
});
</script>

<template>
  <section>
    <AppSlider :items="appConfig.home.slider" />
    <div class="wrapper">
      <AppMessage class="default__message"> Nuestra historia </AppMessage>

      <div class="about">
        <div class="about__wrapper">
          <div class="about__image">
            <NuxtImg src="/img/about/founder.jpg" alt="Graciela fundadora" />
          </div>
          <div class="about__description">
            <p class="about__paragraph">
              Nuestra fundadora, Graciela, es una arquitecta graduada de la UCV
              y ha sido reconocida por su labor emprendedora. Desde muy joven,
              Graciela encontró en la cocina un espacio que no solo le
              encantaba, sino que también la conectaba con sus raíces y
              tradiciones familiares. Especialmente, compartía momentos
              especiales junto a su madre y abuela, quienes le transmitieron su
              pasión por la cocina.
            </p>

            <p class="about__paragraph">
              Durante sus años de universidad, Graciela ayudaba a su abuela en
              la producción y venta de las tortas de Navidad. Con el tiempo,
              ella asumió la responsabilidad y logró satisfacer a los clientes,
              convirtiendo la torta de Navidad en parte de su tradición
              navideña. Inspirada por el éxito de este producto, Graciela
              decidió expandir su negocio y crear una empresa que ofreciera
              productos alimenticios durante todo el año.
            </p>

            <p class="about__paragraph">
              Así nació Dulce y Salao en el año 2005. El nombre refleja la
              inspiración de los sabores caraqueños, donde siempre se combina lo
              dulce y lo salado. Graciela trabajó arduamente para perfeccionar
              la receta de la torta de queso, convirtiéndola en el producto
              icónico de nuestra empresa. A lo largo de los años, hemos
              desarrollado nuevos formatos y presentaciones para satisfacer las
              necesidades y gustos de nuestros clientes.
            </p>
          </div>
        </div>

        <div class="about__wrapper">
          <div class="about__image">
            <NuxtImg
              src="/img/about/production-director.jpg"
              alt="Monica Sahmkow"
            />
          </div>
          <div class="about__description">
            <p class="about__paragraph">
              Mónica Sahmkow le inyecta modernidad y creatividad a Dulce y
              Salao. Nuestra directora de producción e innovación es abogada,
              pero como Graciela, la cocina siempre ha estado presente en su
              vida y mientras estudiaba derecho se dio cuenta que su camino era
              otro. Comenzó en los cursos sabatinos del ICC Caracas y al año
              siguiente decidió tomar el curso regular mientras se graduaba de
              derecho.
            </p>

            <p class="about__paragraph">
              Al graduarse de abogada y del ICC, hace pasantías en España en el
              restaurante "Martin Berasateqgui" uno de los restaurantes 3
              estrellas de España y al regresar comienza a trabajar en Dulce y
              Salao estando a cargo de la producción del taller y la creación de
              nuevos productos. Un año más tarde se va a estudiar a
              @ferrandiparis en París, estudios que finalizan con las pasantías
              en Le Meurice París, uno de los restaurantes tres estrellas de
              esta ciudad, cuna de la cocina.
            </p>

            <p class="about__paragraph">
              Al regresar a Caracas regresa a Dulce y Salao y en paralelo funda
              el restaurante itinerante Alex y Monica que estuvo operando por 6
              años. Se convirtió en consultora gastronómica para restaurantes, y
              empresas que elaboran y venden productos alimenticios, trabajo que
              le permite utilizar su gran creatividad y compartir su arte en la
              elaboración de platos, menús y productos gastronómicos.
            </p>

            <p class="about__paragraph">
              Hoy en día Mónica es la Chef ejecutiva de Sereno By Mónica Sahmkow
              en el Hotel Cayena Caracas y es la Directora Académica de la
              Academia de Gastronomía UCAB-PLAZA'S.
            </p>
          </div>
        </div>

        <div class="about__wrapper-alt">
          <p class="about__paragraph">
            Hoy en día, nuestras tortas de queso se han convertido en un regalo
            perfecto para cualquier ocasión. Ya sea para disfrutar en casa o
            para sorprender a alguien especial, nuestras tortas son una
            deliciosa opción. Además, puedes encontrarlas no solo por encargo,
            sino también en diferentes locales y supermercados de Caracas.
          </p>
          <p class="about__paragraph">
            En Dulce y Salao, nos enorgullece ofrecer productos de alta calidad,
            elaborados con ingredientes frescos y cuidadosamente seleccionados.
            Cada torta de queso es preparada con amor y dedicación, siguiendo la
            receta original de Graciela.
          </p>
          <p class="about__paragraph">
            Te invitamos a explorar nuestro sitio web y descubrir más sobre
            nuestra historia, nuestros productos y cómo realizar tu pedido. Si
            tienes alguna pregunta o necesitas asistencia, no dudes en
            contactarnos. ¡Estaremos encantados de atenderte!
          </p>
        </div>
      </div>

      <AppMessage class="default__message mt-20">
        ¡Gracias por visitar Dulce y Salao!
      </AppMessage>
    </div>
  </section>
</template>

<style scoped>
.wrapper {
  @apply container mt-16;
}

.about {
  @apply my-12;
}

.about__wrapper {
  @apply grid gap-4 mt-10;
  @apply lg:grid-cols-[1fr_2fr] lg:gap-16 lg:mt-20;
}

.about__wrapper-alt {
  @apply grid gap-4 mt-10 border-t-4 border-t-color-2 pt-8;
  @apply lg:mt-20;
}

.about__image {
  @apply flex justify-center items-center;
}

.about__description {
  @apply flex flex-col gap-4;
}

.about__paragraph {
  @apply text-lg text-[#5A5A5A];
  @apply lg:text-2xl lg:leading-10;
}
</style>
