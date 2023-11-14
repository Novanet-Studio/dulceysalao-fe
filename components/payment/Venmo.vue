<script lang="ts" setup>
const { copied, copy } = useClipboard({
  legacy: true,
});

const cart = useCartStore();
const { state, schema, isSending, submit } = usePaymentForm({
  equalAmountTo: cart.amount.toString(),
  method: 'venmo',
  payment: {
    validation: (form) =>
      Date.parse(form.date) > Date.parse(new Date().toISOString()),
    message: `El monto del pago no es válido o la fecha no coincide con hoy`,
  },
});

state.amount = '$ ' + cart.amount.toString();
</script>

<template>
  <div class="mt-6 container">
    <UForm :schema="schema" :state="state" @submit="submit">
      <UCard class="p-6 mb-12 shadow-xl border-none ring-0 ring-transparent">
        <div class="grid lg:grid-cols-2 lg:gap-4">
          <UFormGroup
            class="mb-4"
            label="Nombre del titular de la cuenta"
            name="name"
          >
            <UInput size="lg" v-model="state.name" />
          </UFormGroup>
          <UFormGroup
            class="mb-4"
            label="Apellido del titular de la cuenta"
            name="lastName"
          >
            <UInput size="lg" v-model="state.lastName" />
          </UFormGroup>
        </div>
        <UFormGroup class="mb-4" label="Fecha de pago" name="paymentDate">
          <UInput size="lg" type="date" v-model="state.date" />
        </UFormGroup>
        <div class="grid lg:grid-cols-2 lg:gap-4">
          <UFormGroup class="mb-4" label="Monto" name="amount">
            <UInput
              size="lg"
              disabled
              v-model="state.amount"
              :ui="{
                icon: {
                  trailing: {
                    pointer: '',
                  },
                },
              }"
            >
              <template #trailing>
                <UButton
                  :icon="copied ? 'i-ph-check' : 'i-ph-copy'"
                  :padded="false"
                  variant="link"
                  color="gray"
                  @click="copy(cart.amount.toString().trim())"
                />
              </template>
            </UInput>
          </UFormGroup>
          <UFormGroup class="mb-4" label="ID del pago" name="confirmation">
            <UInput size="lg" v-model="state.confirmation" />
          </UFormGroup>
        </div>

        <p class="text-xs whitespace-normal lg:text-sm text-[#707070] mb-8">
          Al realizar esta compra usted acepta
          <a href="#" class="text-color-8 font-bold hover:underline"
            >nuestros términos y condiciones</a
          >
        </p>

        <UButton
          class="!bg-color-1 hover:!bg-color-1-700"
          block
          type="submit"
          :disabled="isSending"
          label="Enviar"
          size="lg"
        >
          <template #leading>
            <AppLoader v-if="isSending" />
          </template>
        </UButton>
      </UCard>
    </UForm>
  </div>
</template>
