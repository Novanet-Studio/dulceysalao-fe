<script setup lang="ts">
import { Navigation, Mousewheel, Thumbs } from 'swiper/modules';
import { injectKeys } from '~/config/constants';

defineEmits<{
  (e: 'show-lightbox'): void;
}>();

const product = inject(injectKeys.productDetail) as Ref<Product>;
</script>

<template>
  <div class="product__gallery">
    <div class="product__image">
      <!-- Gallery-->
      <div class="product__swiper-wrapper" @click="$emit('show-lightbox')">
        <swiper-container
          class="product__swiper"
          thumbs-swiper=".swiper-thumbnails"
          :modules="[Navigation, Thumbs, Mousewheel]"
          :space-between="0"
          :slides-per-view="1"
        >
          <swiper-slide v-for="image in product.images" :key="image.id">
            <nuxt-img
              class="product__swiper-image"
              :src="image.url"
              :alt="image.alternativeText"
            />
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product__gallery {
  @apply md:flex md:flex-row md:gap-4;
}
.product__image {
  @apply max-w-3xl md:max-w-[20rem] md:min-h-full lg:max-w-[30rem];
}
.product__swiper-wrapper {
  @apply relative md:min-h-full;
}
.product__swiper {
  @apply w-full;
}
.product__swiper-image {
  @apply w-full;
}
</style>
