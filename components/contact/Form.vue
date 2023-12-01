<script lang="ts" setup>
import { object, string, email, minLength, type Output } from 'valibot';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';

const router = useRouter();

const state = ref({
  fullname: '',
  email: '',
  subject: '',
  message: '',
});

const formSchema = object({
  fullname: string([minLength(1, 'Campo es requerido')]),
  email: string([minLength(1, 'Campo es requerido'), email('Invalid email')]),
  subject: string([minLength(1, 'Campo es requerido')]),
  message: string([minLength(1, 'Campo es requerido')]),
});

type FormData = Output<typeof formSchema>;

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');

const submit = async ({ data }: FormSubmitEvent<FormData>) => {
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contacto',
        ...data,
      }),
    });

    useToast().add({
      icon: 'i-ph-check',
      title: '¡Éxito!',
      description: 'Mensaje enviado',
      color: 'green',
    });
  } catch (error) {
    useToast().add({
      icon: 'i-ph-warning',
      title: 'Error',
      description: 'Hubo un error al enviar el mensaje',
      color: 'red',
    });
  }
};
</script>

<template>
  <div class="form">
    <UForm
      :schema="formSchema"
      :state="state"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      @submit="submit"
      name="contacto"
    >
      <UFormGroup
        class="mb-4"
        label="Nombre y apellido"
        name="fullname"
        required
      >
        <UInput v-model="state.fullname" />
      </UFormGroup>
      <UFormGroup class="mb-4" label="Email" name="email" required>
        <UInput v-model="state.email" />
      </UFormGroup>
      <UFormGroup class="mb-4" label="Asunto" name="subject" required>
        <UInput v-model="state.subject" />
      </UFormGroup>
      <UFormGroup class="mb-4" label="Mensaje" name="message" required>
        <UTextarea autoresize v-model="state.message" />
      </UFormGroup>

      <div class="form__submit">
        <UButton
          type="submit"
          icon="i-ph-paper-plane-tilt"
          size="lg"
          class="!bg-color-1 hover:!bg-color-1-800"
          mt-8
          flex
          justify-center
        >
          Enviar
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<style scoped>
.form {
  @apply w-full px-4 mt-10 md:px-24 shadow-md;
}

.form__title {
  @apply font-semibold mb-8 text-color-2 text-2xl md:mb-3;
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

.form__submit {
  @apply mt-8 pb-8 flex justify-center;
}
</style>
