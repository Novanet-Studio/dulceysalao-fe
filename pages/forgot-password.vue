<script lang="ts" setup>
import { object, string, minLength, email, type Output } from 'valibot';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';

definePageMeta({
  layout: 'access',
});

const isLoading = ref(false);
const isDisabled = ref(false);
const { forgotPassword } = useStrapiAuth();
const router = useRouter();

const state = reactive({
  email: '',
});

const formSchema = object({
  email: string([email(), minLength(1, 'Campo es requerido')]),
});

type FormData = Output<typeof formSchema>;

const resetState = () => {
  isLoading.value = false;
  isDisabled.value = false;
};

const submit = async ({ data }: FormSubmitEvent<FormData>) => {
  try {
    isLoading.value = true;
    isDisabled.value = true;

    await forgotPassword({
      email: data.email,
    });

    sessionStorage.setItem('dys_forgot', btoa(data.email));

    useToast().add({
      icon: 'i-ph-check',
      title: 'Enlace enviado',
      description: 'Te enviamos un correo para restablecer tu contraseña',
      color: 'green',
    });

    setTimeout(() => {
      router.push('/link-sent');
    }, 1000);
  } catch (error) {
    console.log(error);
    useToast().add({
      icon: 'i-ph-warning-duotone',
      title: 'Error',
      description: 'Ocurrió un error al enviar el correo',
      color: 'red',
    });
  } finally {
    resetState();
  }
};
</script>

<template>
  <UContainer>
    <UCard
      class="max-w-md mx-auto bg-white shadow-xl border-none ring-0 ring-transparent px-4"
    >
      <UForm :schema="formSchema" :state="state" @submit="submit">
        <header class="flex flex-col justify-center mb-4">
          <h5 class="font-bold text-lg mb-2">¿Olvidaste tu contraseña?</h5>
          <span class="text-xs text-balance text-black/50">
            Introduce tu email y te enviaremos un enlace para volver a ingresar
            a tu cuenta.
          </span>
        </header>

        <UFormGroup class="mb-4" label="Email" name="email">
          <UInput
            icon="i-ph-envelope-duotone"
            size="lg"
            v-model="state.email"
          />
        </UFormGroup>

        <div class="mt-8 flex justify-center">
          <UButton
            type="submit"
            size="lg"
            class="!bg-color-1 hover:!bg-color-1-700"
            :ui="{ rounded: 'rounded-sm' }"
            :disabled="isDisabled || isLoading"
            >Enviar link
            <template #leading>
              <AppLoader v-if="isLoading" />
            </template>
          </UButton>
        </div>
      </UForm>
    </UCard>

    <section class="flex justify-center mt-12">
      <NuxtLink class="text-sm underline md:text-base" to="/auth/login">
        Iniciar sesión
      </NuxtLink>
    </section>
  </UContainer>
</template>
