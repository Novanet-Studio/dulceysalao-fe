<script lang="ts" setup>
import {
  object,
  string,
  minLength,
  nonNullable,
  any,
  type Output,
} from 'valibot';
import countries from '~/data/countries.json';
import { AddressType } from '~/config/constants';
import type { FormSubmitEvent } from '#ui/types';

const props = defineProps<{ type: AddressType }>();
const auth = useAuthStore();
const checkout = useCheckoutStore();

const haveLastAddress = ref(false);
const existentId = ref('');

const isLoading = ref(false);
const isDisabled = ref(false);

const type = computed(() =>
  [AddressType.Billing, AddressType.Shipping].includes(props.type)
    ? props.type
    : AddressType.None
);

const title = computed(() =>
  type.value === AddressType.Billing
    ? 'Dirección de facturación'
    : 'Dirección de envío'
);

const currentCountry = computed(() => {
  return countries.find((country) => country.code === state.country);
});

const state = reactive({
  country: '',
  streetAddress: '',
  state: '',
  postcode: '',
});

const formRef = ref();

const formSchema = object({
  country: nonNullable(any()),
  streetAddress: string([minLength(1, 'Este campo es requerido')]),
  state: string([minLength(1, 'Este campo es requerido')]),
  postcode: string([minLength(1, 'Este campo es requerido')]),
});

type FormData = Output<typeof formSchema>;

const resetState = () => {
  isLoading.value = false;
  isDisabled.value = false;
};

const sendAddress = async (data: Record<string, string>) => {
  if (haveLastAddress.value) {
    checkout.updateAddress(existentId.value, data);
    return;
  }

  checkout.createAddress(data);
};

const submit = async ({ data }: FormSubmitEvent<FormData>) => {
  if (type.value === AddressType.None) return;

  const info = {
    address: data.streetAddress,
    country: data.country,
    city: data.state,
    zipCode: data.postcode,
  };

  console.log('INFO => ', info);

  const body = {
    type: type.value,
    userId: +auth.user.id,
    address: info,
  };

  // sendAddress(body as unknown as Record<string, string>);
};

const getLastAddress = async () => {
  const id = Number(auth.user.id);
  const address = await checkout.getAddress({ userId: id, type: type.value });

  if (!address) return;

  haveLastAddress.value = true;
  existentId.value = address.id;

  state.country = address.attributes.address.country;
  state.state = address.attributes.address.city;
  state.streetAddress = address.attributes.address.address;
  state.postcode = address.attributes.address.zipCode;
};

onMounted(() => {
  getLastAddress();
});
</script>

<template>
  <section>
    <header class="address-form__header">
      <h3 class="address-form__title">
        {{ title }}
      </h3>
    </header>
    <UContainer>
      <UCard
        class="max-w-2xl bg-white shadow-xl border-none ring-0 ring-transparent px-4 lg:px-12"
      >
        <UForm
          ref="formRef"
          :schema="formSchema"
          :state="state"
          @submit="submit"
        >
          <UFormGroup class="mb-4" label="País" name="country">
            <USelectMenu
              searchable
              searchable-placeholder="Buscar..."
              v-model="state.country"
              placeholder="Seleccione un país"
              value-attribute="code"
              size="lg"
              option-attribute="name"
              :options="countries"
              :ui="{
                options: {
                  active: 'bg-color-1 text-color-2',
                },
              }"
            >
              <template #label>
                {{ currentCountry?.name || 'Seleccione un país' }}
              </template>
            </USelectMenu>
          </UFormGroup>

          <UFormGroup class="mb-4" label="Dirección" name="streetAddress">
            <UInput size="lg" v-model="state.streetAddress" />
          </UFormGroup>

          <UFormGroup class="mb-4" label="Estado" name="state">
            <UInput size="lg" v-model="state.state" />
          </UFormGroup>

          <UFormGroup class="mb-4" label="Código postal" name="postcode">
            <UInput size="lg" v-model="state.postcode" />
          </UFormGroup>

          <div class="mt-8 flex justify-center">
            <UButton
              type="submit"
              size="lg"
              class="!bg-color-1 hover:!bg-color-1"
              :disabled="isDisabled || isLoading"
              >Guardar
              <template #leading>
                <AppLoader v-if="isLoading" />
              </template>
            </UButton>
          </div>
        </UForm>
      </UCard>

      <UButton
        class="mt-8"
        color="8"
        icon="i-ph-arrow-left"
        variant="link"
        @click="$router.back()"
        >Regresar</UButton
      >
    </UContainer>
  </section>
</template>

<style scoped>
.address-form__header {
  @apply mb-8 pb-3 md:pb-0;
}

.address-form__title {
  @apply text-xl font-medium text-[#282828] md:text-2xl;
}
</style>
