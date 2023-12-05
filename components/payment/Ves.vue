<script lang="ts" setup>
const cartStore = useCartStore();

const { bcvUsd } = await useGetBcvUsd(cartStore.amount);
const amountRate = computed(() => cartStore.amount * bcvUsd.value);

type AllowedCopyElements = 'phone' | 'rif' | 'amount' | '';

const props = withDefaults(
  defineProps<{ method: 'pago_movil' | 'transferencia' }>(),
  {
    method: 'pago_movil',
  }
);

const { copied, copy } = useClipboard({
  legacy: true,
});

const copiedEl = ref<AllowedCopyElements>('');

function setCopiedEl(el: AllowedCopyElements) {
  copiedEl.value = el;

  setTimeout(() => {
    copiedEl.value = '';
  }, 2000);
}

const formatToVES = (value: number) =>
  new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'VES',
  }).format(value);

const { state, schema, isSending, submit } = usePaymentForm({
  equalAmountTo: amountRate.value.toString(),
  method: props.method,
  payment: {
    validation: (data) =>
      Date.parse(data.date) > Date.parse(new Date().toISOString()),
    message: `El monto del pago no es válido o la fecha no coincide con hoy`,
  },
});

const ves = formatToVES(amountRate.value).replace('Bs.S', 'Bs.D') as string;
state.amount = ves;

watch(
  () => cartStore.amount,
  () => {
    state.amount = formatToVES(amountRate.value).replace('Bs.S', 'Bs.D');
  }
);
</script>

<template>
  <div class="mt-6 container">
    <UCard
      class="p-6 mb-12 shadow-xl border-none ring-0 ring-transparent"
      v-if="method === 'pago_movil'"
    >
      <div class="grid lg:grid-cols-2 lg:gap-4">
        <UFormGroup class="mb-4" label="Teléfono">
          <UInput
            size="lg"
            disabled
            color="gray"
            model-value="04143213152"
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
                  copied && copiedEl === 'phone' ? 'i-ph-check' : 'i-ph-copy'
                "
                :padded="false"
                variant="link"
                :color="copied && copiedEl === 'phone' ? 'green' : 'gray'"
                @click="
                  () => {
                    copy('04143213152');
                    setCopiedEl('phone');
                  }
                "
              />
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup class="mb-4" label="RIF">
          <UInput
            size="lg"
            disabled
            color="gray"
            model-value="J-29844392-8"
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
                  copied && copiedEl === 'rif' ? 'i-ph-check' : 'i-ph-copy'
                "
                :padded="false"
                variant="link"
                :color="copied && copiedEl === 'rif' ? 'green' : 'gray'"
                @click="
                  () => {
                    copy('298443928');
                    setCopiedEl('rif');
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
                    copy(formatToVES(amountRate).replace('Bs.S', '').trim());
                    setCopiedEl('amount');
                  }
                "
              />
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup class="mb-4" label="Banco">
          <UInput
            size="lg"
            disabled
            color="gray"
            model-value="Banco venezolano de crédito"
          />
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

        <UFormGroup
          class="mb-4"
          label="Fecha del pago"
          name="paymentDate"
          v-if="method === 'transferencia'"
        >
          <UInput size="lg" type="date" v-model="state.date" />
        </UFormGroup>

        <div class="grid lg:grid-cols-2 lg:gap-4">
          <UFormGroup
            class="mb-4"
            label="Fecha del pago"
            name="paymentDate"
            v-if="method === 'pago_movil'"
          >
            <UInput size="lg" type="date" v-model="state.date" />
          </UFormGroup>
          <UFormGroup
            class="mb-4"
            label="Monto"
            name="amount"
            :help="`La tasa del día BCV es de ${bcvUsd} BsD`"
            v-if="method === 'transferencia'"
          >
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
                  @click="copy(formatToVES(amountRate).replace('Bs.S', ''))"
                />
              </template>
            </UInput>
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
