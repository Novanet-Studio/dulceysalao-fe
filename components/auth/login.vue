<script setup lang="ts">
import { object, string, type Output } from 'valibot';
import type { FormSubmitEvent } from '#ui/types';

type Emits = {
  (e: 'newClientClick'): void;
  (e: 'forgetClick'): void;
};

defineEmits<Emits>();

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
  email: string(),
  password: string(),
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
        description: 'Ha ocurrido un error, por favor intente de nuevo',
        color: 'red',
      });
      return;
    }

    router.push('/');
  } catch (error) {
    useToast().add({
      icon: 'i-ph-x-circle-duotone',
      title: 'Error',
      description:
        'Hubo un error al procesar la solicitud, por favor intente de nuevo',
      color: 'red',
    });
  } finally {
    resetState();
  }
};
</script>

<template>
  <UContainer class="lg:px-4">
    <UCard class="max-w-sm mx-auto border-none shadow-none ring-0">
      <UForm :schema="formSchema" :state="state" @submit="submit">
        <header class="flex justify-center mb-6">
          <h5 class="font-bold text-lg">Ingresar a mi cuenta</h5>
        </header>

        <UFormGroup class="mb-4" label="Email" name="email">
          <UInput
            icon="i-ph-envelope-duotone"
            size="lg"
            v-model="state.email"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
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
                bg-color-4
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
            type="submit"
            size="lg"
            color="color-2"
            class="w-full justify-center"
            :disabled="isDisabled || isLoading"
            >Enviar
            <template #leading>
              <AppLoader v-if="isLoading" />
            </template>
          </UButton>
        </div>
      </UForm>

      <section class="mt-6">
        <div class="text-sm text-center">
          ¿No tienes cuenta?
          <UButton
            label="Crear cuenta"
            color="black"
            variant="link"
            @click="$emit('newClientClick')"
          />
        </div>
        <div class="text-sm text-center">
          ¿Olvidaste tu contraseña?
          <UButton
            label="Recuperar contraseña"
            color="black"
            variant="link"
            @click="$emit('forgetClick')"
          />
        </div>
      </section>
    </UCard>
  </UContainer>
</template>
