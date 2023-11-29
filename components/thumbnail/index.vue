<script lang="ts" setup>
import { FreeMode, Navigation } from 'swiper/modules';
import { injectKeys } from '~/config/constants';

const product = inject(injectKeys.productDetail) as Ref<Product>;
</script>

<template>
  <div class="swiper__thumnails-wrapper">
    <UButton
      icon="i-ph-caret-left"
      class="prev-btn"
      :ui="{
        icon: {
          base: 'text-2xl w-6 h-6',
        },
      }"
      variant="link"
      :padded="false"
    />
    <swiper-container
      class="swiper-thumbnails"
      :modules="[FreeMode, Navigation]"
      :space-between="10"
      :slides-per-view="3"
      :navigation="{
        prevEl: '.prev-btn',
        nextEl: '.next-btn',
      }"
      thumbs
    >
      <swiper-slide v-for="image in product.images" :key="image.id">
        <nuxt-img
          class="swiper-thumbnail-image"
          :src="image.url"
          :alt="image.alternativeText"
        />
      </swiper-slide>
    </swiper-container>

    <UButton
      icon="i-ph-caret-right"
      :ui="{
        icon: {
          base: 'text-2xl w-6 h-6',
        },
      }"
      class="next-btn text-xl"
      variant="link"
      :padded="false"
    />
  </div>
</template>

<style scoped>
.swiper-thumbnails {
  @apply h-[10em] mt-2 py-1
    md:py-0 lg:w-[30em];
}
.swiper-thumbnails .swiper-slide-visible,
.swiper-thumbnails .swiper-slide-next,
.swiper-thumbnails .swiper-slide-active {
  @apply opacity-40;
}
.swiper-thumbnails .swiper-slide-thumb-active {
  @apply opacity-100;
}
.swiper-thumbnail-image {
  @apply object-cover w-full h-full;
}

swiper-container::part(button-prev),
swiper-container::part(button-next) {
  --swiper-navigation-size: 1.8rem;
  padding: 0.5em;
  border-radius: 50%;
  width: 0.8em;
  height: 0.8em;
}

swiper-container::part(button-prev),
swiper-container::part(button-next) {
  background-color: black;
}
</style>
