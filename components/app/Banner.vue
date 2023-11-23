<script setup>
const appConfig = useAppConfig();
</script>

<template>
  <div class="banner">
    <div class="banner__wrapper">
      <div class="banner__slider">
        <AppSlider :items="appConfig.home.sliders" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Set color for swiper arrows */
swiper-container::part(button-prev),
swiper-container::part(button-next) {
  --swiper-navigation-size: 1.5rem;
  --swiper-navigation-color: #f2f2f2;
  @apply bg-color-1 p-2;
}

.banner__slider {
  @apply w-full;
}
</style>
