<template>
  <div class="contact">
    <AppMessage class="default__message" mode="center">
      Queremos convertir cada ocasión en un momento lleno de amor y alegría para
      compartir con tus seres queridos.
    </AppMessage>

    <h2 class="contact__header">
      Para pedidos o para contactarnos, por favor llene el formulario de
      contacto
    </h2>

    <div class="contact__touch">
      <ContactForm />
      <ContactInfo />
    </div>
  </div>
</template>

<style scoped>
.contact {
  @apply mt-14
  xs:max-md:mx-2 
  md:max-lg:mx-4
  lg:container;
}
.contact__header {
  @apply text-2xl pb-2 mt-8;
}
.contact__touch {
  @apply grid gap-12 grid-cols-1 
  lg:grid-cols-[1fr_30%] 
  lg:gap-24;
}
</style>
