<script lang="ts" setup>
import { object, string, minLength, type Output } from 'valibot';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';

const REDIRECT_DELAY = 500;

const router = useRouter();
const auth = useAuthStore();
const showPassword = ref(false);

const isLoading = ref(false);
const isDisabled = ref(false);

const state = reactive({
  email: '',
  password: '',
});

const formSchema = object({
  email: string([minLength(1, 'Este campo es requerido')]),
  password: string([minLength(1, 'Este campo es requerido')]),
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

    const success = await auth.login(event.data.email, event.data.password);

    if (!success) {
      useToast().add({
        icon: 'i-ph-x-circle-duotone',
        title: 'Error',
        description:
          'Hubo un error al iniciar sesión, por favor intente de nuevo',
        color: 'red',
      });
      return;
    }

    setTimeout(() => {
      router.push('/');
    }, REDIRECT_DELAY);
  } catch (error) {
    useToast().add({
      icon: 'i-ph-x-circle-duotone',
      title: 'Error',
      description:
        'Hubo un error al iniciar sesión, por favor intente de nuevo',
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
      class="max-w-md mx-auto shadow-xl border-none ring-0 ring-transparent px-4"
    >
      <UForm :schema="formSchema" :state="state" @submit="submit">
        <header class="flex justify-center mb-6">
          <h5 class="font-normal text-lg text-gray-600">
            Iniciar sesión en su cuenta
          </h5>
        </header>

        <UFormGroup class="mb-4" label="Correo" name="email">
          <UInput
            icon="i-ph-envelope-duotone"
            size="lg"
            v-model="state.email"
          />
        </UFormGroup>

        <UFormGroup label="Contraseña" name="password">
          <UInput
            icon="i-ph-lock-duotone"
            :type="showPassword ? 'text' : 'password'"
            size="lg"
            v-model="state.password"
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
                  !showPassword ? 'i-ph-eye-duotone' : 'i-ph-eye-slash-duotone'
                "
                :padded="false"
                variant="link"
                color="gray"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormGroup>

        <div class="mt-8 flex justify-center">
          <UButton
            class="!bg-color-1 hover:!bg-color-1-700"
            type="submit"
            size="lg"
            :disabled="isDisabled || isLoading"
            :ui="{
              rounded: 'rounded-none',
            }"
            >Entrar
            <template #leading>
              <AppLoader v-if="isLoading" />
            </template>
          </UButton>
        </div>
      </UForm>
    </UCard>

    <section class="flex justify-center mt-12">
      <NuxtLink class="text-sm underline md:text-base" to="/forgot-password">
        ¿Has olvidado tu contraseña?
      </NuxtLink>
    </section>
  </UContainer>
</template>
