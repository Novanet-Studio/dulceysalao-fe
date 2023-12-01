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
  <div class="info">
    <div class="info__icons" v-for="(item, index) in widgets" :key="index">
      <span class="icon__container">
        <UIcon :name="icons[item.icon]" class="icon__uicon" />
      </span>
      <p class="icon__text">{{ item.text }}</p>
    </div>
  </div>
</template>

<style scoped>
.info {
  @apply hidden mt-12 flex-col gap-3 md:flex;
}
.info__icons {
  @apply flex items-center gap-4;
}
.icon__container {
  @apply w-[3.68rem] h-[3.68rem] bg-color-1 p-3 flex items-center justify-center shadow-md;
}
.icon__uicon {
  @apply text-4xl text-color-2;
}
.icon__text {
  @apply text-xl text-gray-600;
}
</style>
