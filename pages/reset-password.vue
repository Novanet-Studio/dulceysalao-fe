<script lang="ts" setup>
import { object, string, minLength, regex, type Output } from 'valibot';
import { PASSWORD_REGEX } from '@/config/constants';
import type { FormSubmitEvent } from '#ui/types';

type FormData = Output<typeof schema>;

definePageMeta({
  layout: 'access',
});

const REDIRECT_DELAY = 500;

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const isDisabled = ref(false);
const showPasswords = ref(false);

const { resetPassword } = useStrapiAuth();

const state = reactive({
  password: '',
  passwordConfirmation: '',
});

const formRef = ref();

const schema = object({
  password: string([
    minLength(1, 'Campo es requerido'),
    regex(PASSWORD_REGEX, 'La contraseña no cumple con los requisitos'),
  ]),
  passwordConfirmation: string([minLength(1, 'Campo es requerido')]),
});

const submit = async ({ data }: FormSubmitEvent<FormData>) => {
  try {
    isLoading.value = true;
    isDisabled.value = true;

    await resetPassword({
      code: route.query.code as string,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });

    useToast().add({
      icon: 'i-ph-check',
      title: 'Tu contraseña ha sido restablecida',
      description: 'Por favor inicia sesión con tu nueva contraseña',
      color: 'green',
    });

    // remove email saved in session storage
    sessionStorage.removeItem('dys_forgot');

    setTimeout(() => {
      router.push('/auth/login');
    }, REDIRECT_DELAY);
  } catch (error) {
    useToast().add({
      icon: 'i-ph-warning-duotone',
      title: 'Error',
      description: 'Hubo un problema al restablecer tu contraseña',
      color: 'red',
    });
  } finally {
    isLoading.value = false;
    isDisabled.value = false;
  }
};

watchEffect(() => {
  if (
    state.password &&
    state.passwordConfirmation &&
    state.passwordConfirmation.length >= 8 &&
    state.password !== state.passwordConfirmation
  ) {
    formRef.value.setErrors(
      formRef.value.getErrors().concat({
        message: 'Las contraseñas no coinciden',
        path: 'passwordConfirmation',
      })
    );
  }
});

onMounted(() => {
  if (!route.query.code) {
    return router.push('/auth/login');
  }
});
</script>

<template>
  <UContainer>
    <UCard
      class="max-w-md mx-auto shadow-xl border-none ring-0 ring-transparent px-4"
    >
      <UForm ref="form" :schema="schema" :state="state" @submit="submit">
        <header class="flex flex-col justify-center mb-4">
          <h5 class="font-bold text-lg mb-2">Restablecer su contraseña</h5>
          <span class="text-xs text-balance text-black/50">
            Restablece tu contraseña para que puedas iniciar sesión en tu cuenta
            nuevamente
          </span>
        </header>

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
                  al menos una letra mayúscula, una letra minúscula, una número
                  y un carácter especial
                </span>
              </template>
            </UPopover>
          </template>
        </UFormGroup>

        <UFormGroup
          class="mb-4"
          label="Confirmar Contraseña"
          name="passwordConfirmation"
        >
          <UInput
            icon="i-ph-lock-duotone"
            :type="showPasswords ? 'text' : 'password'"
            size="lg"
            v-model="state.passwordConfirmation"
          />
        </UFormGroup>

        <div class="mt-8 flex justify-center">
          <UButton
            type="submit"
            size="lg"
            class="!bg-color-1 hover:!bg-color-1-700"
            :ui="{ rounded: 'rounded-sm' }"
            :disabled="isDisabled || isLoading"
            >Resetear
            <template #leading>
              <AppLoader v-if="isLoading" />
            </template>
          </UButton>
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>
