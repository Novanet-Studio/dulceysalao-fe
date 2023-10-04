<script setup>
const appConfig = useAppConfig();
</script>

<template>
  <div class="banner">
    <div class="banner__wrapper">
      <div class="banner__slider">
        <app-slider :items="appConfig.home.slider" />
      </div>
    </div>
  </div>
</template>

<style scoped>
swiper-container::part(button-prev),
swiper-container::part(button-next) {
  --swiper-navigation-size: 1.5rem;
  --swiper-navigation-color: #f2f2f2;
  @apply bg-color-1 p-2;
}

.banner {
  @apply mb-8;
}

.banner__wrapper {
  @apply flex flex-col flex-nowrap lg:flex-row;
}

.banner__left {
  @apply w-[340px] min-h-[200px] h-full mb-4 md:w-full lg:(max-w-[calc(100%-390px)] w-full);
}

.banner__slider {
  @apply h-full w-full relative;
}

.banner__slider-image {
  @apply block w-full h-full bg-center bg-cover md:h-xl lg:(w-full min-h-xl h-80);
}

.banner__right {
  @apply w-full flex justify-between gap-4 text-white lg:(max-w-[390px] ml-8 flex-col gap-8);
}
</style>
