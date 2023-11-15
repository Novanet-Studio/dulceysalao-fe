<script lang="ts" setup>
import {
  object,
  string,
  minLength,
  maxLength,
  email,
  regex,
  nonNullable,
  type Output,
} from 'valibot';
import { PASSWORD_REGEX } from '~/config/constants';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';

definePageMeta({
  pageTransition: {
    name: 'page',
  },
});

const REDIRECT_DELAY = 500;

const isLoading = ref(false);
const isDisabled = ref(false);
const showPasswords = ref(false);

const state = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
});

const router = useRouter();
const auth = useAuthStore();

const formRef = ref();

const formSchema = object({
  email: string([
    minLength(1, 'Campo es requerido'),
    email('Email is invalid'),
  ]),
  username: nonNullable(
    string([
      minLength(1, 'Campo es requerido'),
      minLength(2, 'El nombre de usuario es demasiado corto'),
      maxLength(10, 'El nombre de usuario es demasiado largo'),
    ])
  ),
  password: string([
    minLength(1, 'Campo es requerido'),
    regex(PASSWORD_REGEX, 'La contraseña no cumple con los requisitos'),
  ]),
  confirmPassword: string([minLength(1, 'Campo es requerido')]),
});

type FormData = Output<typeof formSchema>;

const resetState = () => {
  isLoading.value = false;
  isDisabled.value = false;
};

const submit = async (event: FormSubmitEvent<FormData>) => {
  try {
    isLoading.value = true;
    isDisabled.value = true;

    const response = (await auth.createCustomer(
      event.data.username,
      event.data.email
    )) as Ref<Record<any, any>>;

    if (!response.value?.id) {
      useToast().add({
        icon: 'i-ph-x-circle-duotone',
        title: 'Error',
        description:
          'Se ha producido un error al registrarse, inténtelo de nuevo',
        color: 'red',
      });
      resetState();
      return;
    }

    const customerId = response.value.id;
    const { confirmPassword: _, ...body } = event.data;

    await auth.register({
      customerId,
      ...body,
    });

    setTimeout(() => {
      router.push('/');
    }, REDIRECT_DELAY);
  } catch (error) {
    console.log(error);
    useToast().add({
      icon: 'i-ph-x-circle-duotone',
      title: 'Error',
      description:
        'Ocurrió un error al registrarte, por favor intenta nuevamente',
      color: 'red',
    });
  } finally {
    resetState();
  }
};

watchEffect(() => {
  if (
    state.password &&
    state.confirmPassword &&
    state.confirmPassword.length >= 8 &&
    state.password !== state.confirmPassword
  ) {
    formRef.value.setErrors(
      formRef.value.getErrors().concat({
        message: 'Las contraseñas no coinciden',
        path: 'confirmPassword',
      })
    );
  }
});
</script>

<template>
  <UContainer>
    <UCard
      class="max-w-md mx-auto shadow-xl border-none ring-0 ring-transparent px-4"
    >
      <UForm ref="formRef" :schema="formSchema" :state="state" @submit="submit">
        <header class="flex justify-center mb-6">
          <h5 class="font-normal text-lg text-gray-600">Crea tu cuenta</h5>
        </header>

        <UFormGroup class="mb-4" label="Usuario" name="username">
          <UInput icon="i-ph-user-duotone" size="lg" v-model="state.username" />
        </UFormGroup>

        <UFormGroup class="mb-4" label="Correo" name="email">
          <UInput
            icon="i-ph-envelope-duotone"
            size="lg"
            v-model="state.email"
          />
        </UFormGroup>

        <UFormGroup class="mb-4" label="Contraseña" name="password">
          <UInput
            icon="i-ph-lock-duotone"
            :type="showPasswords ? 'text' : 'password'"
            size="lg"
            v-model="state.password"
          />
          <template #hint>
            <UPopover :ui="{ width: 'w-64', base: 'p-4' }">
              <UButton
                color="gray"
                icon="i-ph-question-duotone"
                variant="link"
              />
              <template #panel>
                <span class="max-w-xs p-2">
                  La contraseña debe ser igual o mayor a 8 caracteres, contener
                  al menos una letra mayúscula, una letra minúscula, un número y
                  un carácter especial
                </span>
              </template>
            </UPopover>
          </template>
        </UFormGroup>

        <UFormGroup
          class="mb-4"
          label="Confirmar contraseña"
          name="confirmPassword"
        >
          <UInput
            icon="i-ph-lock-duotone"
            :type="showPasswords ? 'text' : 'password'"
            size="lg"
            v-model="state.confirmPassword"
          />
        </UFormGroup>

        <UCheckbox label="Mostrar contraseñas" v-model="showPasswords" />

        <div class="mt-8 flex justify-center">
          <UButton
            class="!bg-color-1 hover:!bg-color-1-700"
            type="submit"
            size="lg"
            :disabled="isDisabled || isLoading"
            :ui="{
              rounded: 'rounded-none',
            }"
            >Enviar
            <template #leading>
              <AppLoader v-if="isLoading" />
            </template>
          </UButton>
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>
