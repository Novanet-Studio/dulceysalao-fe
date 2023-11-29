<template>
  <div class="product__title-wrapper">
    <h4 class="product__title">
      <slot />
    </h4>
  </div>
</template>

<style scoped>
.product__title-wrapper {
  @apply w-full flex justify-between bg-color-1 bg-[url('/patron-titulo.svg')] bg-contain bg-no-repeat bg-right;
}
.product__title {
  @apply font-bold text-lg ml-4 py-3 text-color-2 border-b-2 border-b-color-1 
  md:text-2xl lg:ml-[2.25rem] lg:text-3xl lg:py-7;
}
</style>
