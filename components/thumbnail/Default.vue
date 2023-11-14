<script setup lang="ts">
import { Navigation, Mousewheel, Thumbs } from 'swiper/modules';
import { injectKeys } from '~/config/constants';

defineEmits<{
  (e: 'show-lightbox'): void;
}>();

const product = inject(injectKeys.productDetail) as Ref<Product>;
</script>

<template>
  <div class="md:flex md:flex-row md:gap-4">
    <figure class="md:min-h-full">
      <div class="max-w-3xl md:max-w-[20rem] md:min-h-full lg:max-w-[30rem]">
        <!-- Gallery-->
        <div class="relative md:min-h-full" @click="$emit('show-lightbox')">
          <swiper-container
            class="main-swiper"
            :space-between="10"
            navigation
            autoplay
            pagination
            thumbs-swiper=".swiper-thumbs"
            free-mode
            :modules="[Navigation, Thumbs, Mousewheel]"
          >
            <swiper-slide
              class="md:min-h-full"
              v-for="image in product.images"
              :key="image.id"
            >
              <img
                class="rounded-sm w-full md:h-[33rem] lg:min-h-[40rem]"
                :src="image.url"
                :alt="image.alternativeText"
              />
            </swiper-slide>
          </swiper-container>
        </div>
      </div>
    </figure>
  </div>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.main-swiper {
  /* height: 80%; */
  width: 100%;
}
</style>
