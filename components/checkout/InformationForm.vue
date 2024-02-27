<script lang="ts" setup>
import {
  object,
  string,
  minLength,
  nonNullable,
  any,
  type Output,
  email,
} from 'valibot';
import type { FormSubmitEvent } from '#ui/types';
import { GetAddressByIdAndType } from '~/graphql/queries';
import countries from '~/data/countries.json';
import { AddressType } from '~/config/constants';

const router = useRouter();
const graphql = useStrapiGraphQL();
const auth = useAuthStore();
const checkout = useCheckoutStore();

const state = reactive({
  name: '',
  lastName: '',
  email: '',
  address: '',
  country: '',
  home: '',
  city: '',
  zipCode: '',
  phone: '',
});

const currentCountry = computed(() => {
  return countries.find((country) => country.code === state.country);
});

const form = ref();

const formSchema = object({
  name: string([minLength(1, 'Campo es requerido')]),
  lastName: string([minLength(1, 'Campo es requerido')]),
  email: string([
    minLength(1, 'Campo es requerido'),
    email('El correo electrónico es inválido'),
  ]),
  address: string([minLength(1, 'Campo es requerido')]),
  country: any(),
  home: string([minLength(1, 'Campo es requerido')]),
  city: string([minLength(1, 'Campo es requerido')]),
  zipCode: string([minLength(1, 'Campo es requerido')]),
  phone: string([minLength(1, 'Campo es requerido')]),
});

type FormData = Output<typeof formSchema>;

const submit = async function ({ data }: FormSubmitEvent<FormData>) {
  checkout.shippingInfo(data);
  router.push('/shipping');
};

const fillFormFromStorage = () => {
  if (auth.user.email) {
    state.email = auth.user.email;
  }

  if (auth.user.email !== checkout.email) {
    checkout.reset();
    checkout.email = auth.user.email as string;
    return;
  }

  if (!checkout.email) return;

  state.email = checkout.email || '';
  state.name = checkout.name || '';
  state.lastName = checkout.lastName || '';

  if (!checkout.saveInformation) return;

  state.address = checkout.address || '';
  state.country = checkout.country || '';
  state.home = checkout.home || '';
  state.city = checkout.city || '';
  state.zipCode = checkout.zipCode || '';
  state.phone = checkout.phone || '';
  state.country = checkout.country || '';
};

const fillFormFromStrapiShippingData = async () => {
  try {
    const body = {
      id: +auth.user.id,
      type: AddressType.Shipping,
    };

    const { data } = (await graphql<AddressRequest>(
      GetAddressByIdAndType,
      body
    )) as any;

    if (!data?.addresses?.data.length) return;

    const response = data?.addresses?.data[0]?.attributes.address;

    // TODO: set values
    console.log(response);
    // setValues({
    //   ...response,
    // });
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fillFormFromStrapiShippingData();
  fillFormFromStorage();
});
</script>

<template>
  <div>
    <UForm ref="form" :schema="formSchema" :state="state" @submit="submit">
      <h3 class="title">Información del contacto</h3>
      <UCard class="p-6 mb-12 shadow-xl border-none ring-0 ring-transparent">
        <div class="grid lg:grid-cols-2 lg:gap-4">
          <UFormGroup class="mb-4" label="Nombre" name="name">
            <UInput size="lg" v-model="state.name" />
          </UFormGroup>
          <UFormGroup class="mb-4" label="Apellido" name="lastName">
            <UInput size="lg" v-model="state.lastName" />
          </UFormGroup>
          <UFormGroup class="mb-4" label="Correo" name="email">
            <UInput type="email" size="lg" v-model="state.email" />
          </UFormGroup>
        </div>
      </UCard>

      <h3 class="title">Información de envío</h3>
      <UCard class="p-6 mb-8 shadow-xl border-none ring-0 ring-transparent">
        <UFormGroup class="mb-4" label="Dirección" name="address">
          <UInput size="lg" v-model="state.address" />
        </UFormGroup>
        <UFormGroup class="mb-4" label="País" name="country">
          <USelectMenu
            searchable
            searchable-placeholder="Buscar"
            v-model="state.country"
            placeholder="Selecciona un país"
            value-attribute="code"
            size="lg"
            option-attribute="name"
            :options="countries"
            :ui="{
              options: {
                active: 'bg-color-1 text-gray-500',
              },
            }"
          >
            <template #label>
              {{ currentCountry?.name || 'Selecciona un país' }}
            </template>
          </USelectMenu>
        </UFormGroup>
        <div class="grid lg:grid-cols-2 lg:gap-4">
          <UFormGroup class="mb-4" label="Estado" name="city">
            <UInput size="lg" v-model="state.city" />
          </UFormGroup>
          <UFormGroup class="mb-4" label="Apartamento" name="home">
            <UInput size="lg" v-model="state.home" />
          </UFormGroup>
          <UFormGroup class="mb-4" label="Código postal" name="zipCode">
            <UInput size="lg" v-model="state.zipCode" />
          </UFormGroup>
          <UFormGroup class="mb-4" label="Número de contact" name="phone">
            <UInput size="lg" v-model="state.phone" />
          </UFormGroup>
        </div>

        <UCheckbox
          label="Guardar información"
          class="mb-4"
          v-model="checkout.saveInformation"
        />

        <div class="flex justify-center">
          <UButton
            class="px-8 !bg-color-1 hover:!bg-color-1-700"
            size="lg"
            label="Continuar"
            type="submit"
            :ui="{ rounded: 'rounded-none' }"
          />
        </div>
      </UCard>
    </UForm>
  </div>
</template>

<style scoped>
.title {
  @apply font-medium mb-5 text-color-8 lg:text-xl;
}

.form__group-alt {
  @apply mb-4 lg:mb-6;
}

.form__container {
  @apply flex flex-col justify-between md:flex-row;
}

.form__grid {
  @apply grid grid-cols-1 gap-4 md:grid-cols-2;
}

.form__left {
  @apply flex-[0_0_100%] gap-4 md:flex-[0_0_calc(50%-1rem)];
}

.form__right {
  @apply flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)];
}
</style>
