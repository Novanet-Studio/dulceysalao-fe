<script setup>
definePageMeta({
  middleware: 'authentication',
});
</script>

<template>
  <section class="mt-20 container mb-20">
    <AppTitle>Información de envío</AppTitle>
    <div class="b-content">
      <div class="b-left md:mt-8">
        <ResumeInformation />
        <div class="b-link-wrapper">
          <NuxtLink
            to="/checkout"
            class="flex items-center text-sm lg:text-base"
          >
            <div class="i-ph-arrow-left-light mr-2" />
            Regresar
          </NuxtLink>
          <NuxtLink to="/payment" class="ps-btn">
            <UButton
              class="px-8 rounded-none !bg-color-1 hover:!bg-color-1-700"
              label="Continuar con el pago"
              size="lg"
              @click="$router.push('/payment')"
            />
          </NuxtLink>
        </div>
      </div>
      <div class="b-right">
        <AppOrderSummary :shipping="false" />
      </div>
    </div>
  </section>
</template>
