<script setup>
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt({
  breaks: true,
});
const appConfig = useAppConfig();

definePageMeta({
  name: 'Company',
});
</script>

<template>
  <AppSlider :items="appConfig.nosotros.slider" />
  <div class="about__wrapper">
    <AppMessage class="default__message">Nuestra historia</AppMessage>
    <div class="about__member">
      <div class="about__image-wrapper">
        <nuxt-img
          class="about__image"
          :src="appConfig.nosotros.historia.fundadora.image"
          alt="Graciela fundadora"
        />
      </div>

      <div
        class="about__paragraph about__paragraph--member"
        v-html="markdown.render(appConfig.nosotros.historia.fundadora.text)"
      ></div>
    </div>

    <div class="about__member">
      <div class="about__image-wrapper">
        <nuxt-img
          class="about__image"
          :src="appConfig.nosotros.historia.directora.image"
          alt="Graciela fundadora"
        />
      </div>

      <div
        class="about__paragraph about__paragraph--member"
        v-html="markdown.render(appConfig.nosotros.historia.directora.text)"
      ></div>
    </div>

    <div
      class="about__paragraph about__paragraph--full"
      v-html="markdown.render(appConfig.nosotros.historia.general.text)"
    ></div>

    <AppMessage class="default__message">
      ¡Gracias por visitar Dulce y Salao!
    </AppMessage>
  </div>
</template>

<style scoped>
.about__wrapper {
  @apply my-12 mt-16 mx-4 lg:container;
}
.about__member {
  @apply flex flex-col gap-6 mt-8 md:flex-row;
}
.about__image-wrapper {
  @apply w-full md:w-1/3;
}
.about__image {
  @apply w-full self-start;
}
.about__paragraph {
  @apply text-lg text-[#5A5A5A] 
  lg:text-2xl lg:leading-10;
}
.about__paragraph--member {
  @apply flex flex-col gap-4 md:w-2/3;
}
.about__paragraph--full {
  @apply mt-8;
}
</style>
