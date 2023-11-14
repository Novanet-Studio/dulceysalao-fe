<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail);

const showLightbox = ref(false);
</script>

<template>
  <section class="container mt-12">
    <AppTitle>
      {{ product?.category.name }}
    </AppTitle>
    <div class="mb-8 py-4">
      <div class="flex flex-col shadow-xl md:flex-row md:gap-6">
        <ThumbnailDefault @show-lightbox="showLightbox = true" />
        <ProductInformationDefault />
      </div>
    </div>
  </section>
</template>
