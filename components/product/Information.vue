<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail) as Ref<Product>;
</script>

<template>
  <div class="product__information">
    <h4 class="product__name">
      {{ product?.name }}
    </h4>
    <span>
      <UBadge class="!bg-color-2 !text-[#282828]" v-if="product.gluten_free"
        >Sin gluten</UBadge
      >
    </span>
    <div class="product__title">Descripción</div>
    <p class="product__description">
      {{ product?.description ?? 'No hay descripcion' }}
    </p>
    <span class="product__price"> ${{ product?.price }} </span>
  </div>
</template>

<style scoped>
.product__information {
  @apply my-2;
}
.product__name {
  @apply text-2xl text-color-8 font-medium md:text-2xl lg:text-4xl;
}
.product__title {
  @apply text-color-8 font-medium lg:mb-1 lg:text-xl lg:mt-2;
}
.product__description {
  @apply text-sm text-gray-600 lg:text-base;
}
.product__price {
  @apply text-2xl my-6 md:text-3xl lg:text-4xl;
}
</style>
