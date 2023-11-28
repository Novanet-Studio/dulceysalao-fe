<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});

const checkout = useCheckoutStore();
const { hasBilling, hasShipping } = checkout.checkAddressType();

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Direcciones';
</script>

<template>
  <div class="wrapper">
    <div class="address">
      <div class="address__content">
        <figure>
          <figcaption class="address__figcaption">
            Dirección de facturación
          </figcaption>
          <div class="bubble" v-if="hasBilling">
            <p class="address__text">
              ¿Quieres actualizar tu dirección de facturación?
            </p>
            <NuxtLink class="address__link" to="/edit-address?add=billing">
              Actualizar
            </NuxtLink>
          </div>
          <div class="bubble" v-else>
            <p class="address__text">
              No has registrado ninguna dirección de facturación
            </p>
            <NuxtLink class="address__link" to="/edit-address?add=billing">
              Agregar
            </NuxtLink>
          </div>
        </figure>
      </div>
      <div class="address__content">
        <figure class="lg:mr-5">
          <figcaption class="address__figcaption">
            Dirección de Envío
          </figcaption>
          <div class="bubble" v-if="hasShipping">
            <p class="address__text">
              ¿Quieres actualizar tu dirección de envío?
            </p>
            <NuxtLink class="address__link" to="/edit-address?add=shipping">
              Actualizar
            </NuxtLink>
          </div>
          <div class="bubble" v-else>
            <p class="address__text">
              No has registrado ninguna dirección de envío
            </p>
            <NuxtLink class="address__link" to="/edit-address?add=shipping">
              Agregar
            </NuxtLink>
          </div>
        </figure>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply w-full lg:ml-8;
}

.address {
  @apply flex flex-col gap-10 p-5 lg:flex-row lg:gap-5;
}

.address__content {
  @apply max-w-full flex-[0_0_100%] lg:max-w-[50%] lg:flex-[0_0_50%];
}

.address__figcaption {
  @apply mb-8 pb-3 font-medium text-color-8 md:text-2xl md:mb-4;
}

.address__text {
  @apply mb-4 text-color-8 text-sm md:mb-0 md:text-base;
}

.address__link {
  @apply text-white px-6 bg-color-1 py-2 rounded-full transition ease-linear text-sm hover:text-opacity-70;
}

.bubble {
  @apply bg-white p-6 !ring-0 !ring-offset-0 !ring-transparent shadow-2xl flex flex-col items-center rounded-md gap-2 md:flex-row md:justify-between;
}
</style>
