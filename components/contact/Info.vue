<script setup lang="ts">
const appConfig = useAppConfig();
const widgets = appConfig.footer.widgets;

const icons: { [key: string]: string } = {
  instagram: 'i-ph-instagram-logo-duotone',
  whatsapp: 'i-ph-whatsapp-logo-duotone',
  email: 'i-ph-envelope-duotone',
  facebook: 'i-ph-facebook-logo-duotone',
  phone: 'i-ph-device-mobile-duotone',
};
</script>

<template>
  <div class="hidden mt-12 flex-col gap-3 md:flex">
    <div
      class="flex items-center gap-4"
      v-for="(item, index) in widgets"
      :key="index"
    >
      <span
        class="w-[3.68rem] h-[3.68rem] bg-color-4 p-3 flex items-center justify-center shadow-md"
      >
        <UIcon :name="icons[item.icon]" class="text-4xl text-color-2" />
      </span>
      <p class="text-xl text-gray-600">{{ item.text }}</p>
    </div>
  </div>
</template>
