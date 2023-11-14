<script lang="ts" setup>
import { injectKeys } from '~/config/constants';
const product = inject(injectKeys.productDetail) as Ref<Product>;
</script>

<template>
  <div class="my-2 mt-6">
    <div class="flex gap-4 items-center mb-3">
      <h4 class="text-2xl text-color-8 font-medium md:text-2xl lg:text-4xl">
        {{ product?.name }}
      </h4>
      <span>
        <UBadge class="!bg-color-2 !text-[#282828]">Sin gluten</UBadge>
      </span>
    </div>
    <div class="text-color-8 font-medium lg:mb-1 lg:text-xl lg:mt-2">
      Description
    </div>
    <p class="text-sm text-gray-600 lg:text-base">
      {{ product?.description ?? 'No hay descripcion' }}
    </p>
  </div>
</template>
