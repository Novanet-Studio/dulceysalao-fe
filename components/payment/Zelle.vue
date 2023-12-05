<script lang="ts" setup>
type AllowedCopyElements = 'email' | 'amount' | '';

const copiedEl = ref<AllowedCopyElements>('');

const { copied, copy } = useClipboard({
  legacy: true,
});

function setCopiedEl(el: AllowedCopyElements) {
  copiedEl.value = el;

  setTimeout(() => {
    copiedEl.value = '';
  }, 2000);
}

const cart = useCartStore();
const { state, schema, isSending, submit } = usePaymentForm({
  equalAmountTo: cart.amount.toString(),
  method: 'zelle',
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
    <UCard class="p-6 mb-12 shadow-xl border-none ring-0 ring-transparent">
      <div class="grid lg:grid-cols-2 lg:gap-4">
        <UFormGroup class="mb-4" label="Titular">
          <UInput
            size="lg"
            disabled
            color="gray"
            model-value="Graciela Sahmkow"
          />
        </UFormGroup>
        <UFormGroup class="mb-4" label="Correo">
          <UInput
            size="lg"
            disabled
            color="gray"
            model-value="gracielasahmkow@gmail.com"
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
                :icon="
                  copied && copiedEl === 'email' ? 'i-ph-check' : 'i-ph-copy'
                "
                :padded="false"
                variant="link"
                :color="copied && copiedEl === 'email' ? 'green' : 'gray'"
                @click="
                  () => {
                    copy('gracielasahmkow@gmail.com');
                    setCopiedEl('email');
                  }
                "
              />
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup class="mb-4" label="Monto" name="amount">
          <UInput
            size="lg"
            disabled
            color="gray"
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
                :icon="
                  copied && copiedEl === 'amount' ? 'i-ph-check' : 'i-ph-copy'
                "
                :padded="false"
                variant="link"
                color="gray"
                @click="
                  () => {
                    copy(cart.amount.toString().trim());
                    setCopiedEl('amount');
                  }
                "
              />
            </template>
          </UInput>
        </UFormGroup>
      </div>
    </UCard>

    <UDivider label="Reportar pago" />

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

        <div class="grid lg:grid-cols-2 lg:gap-4">
          <UFormGroup class="mb-4" label="Fecha del pago" name="paymentDate">
            <UInput size="lg" type="date" v-model="state.date" />
          </UFormGroup>
          <UFormGroup
            class="mb-4"
            label="Número de confirmación"
            name="confirmation"
          >
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
