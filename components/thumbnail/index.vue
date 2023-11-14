<script lang="ts" setup>
import { FreeMode, Navigation } from 'swiper/modules';
import { injectKeys } from '~/config/constants';

const product = inject(injectKeys.productDetail) as Ref<Product>;
</script>

<template>
  <div class="max-w-48 lg:mt-8">
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
    <div class="max-w-3xl">
      <swiper-container
        class="swiper-thumbs"
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
          <img
            class="object-contain rounded-sm h-full lg:min-w-[6rem]"
            :src="image.url"
            :alt="image.alternativeText"
          />
        </swiper-slide>
      </swiper-container>
    </div>
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
.swiper-thumbs {
  @apply h-[160px] w-[350px] px-0 py-[10px] md:py-0 lg:h-[150px] lg:!px-0 lg:!mx-0;
}

.swiper-thumbs .swiper-slide-visible,
.swiper-thumbs .swiper-slide-next,
.swiper-thumbs .swiper-slide-active {
  @apply opacity-40;
}

.swiper-thumbs .swiper-slide-thumb-active {
  @apply opacity-100;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
