<script lang="ts" setup>
import { AddressType } from '~/config/constants';

definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});

const route = useRoute();

const type = computed(() => {
  const type = route.fullPath.split('?')[1];
  const addressType = type.split('=')[1] as AddressType;

  if ([AddressType.Billing, AddressType.Shipping].includes(addressType)) {
    return addressType;
  }

  return type as AddressType.None;
});

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Direcciones';
</script>

<template>
  <section class="edit-address" v-if="type">
    <div class="edit-address__wrapper">
      <div class="edit-address__content">
        <EditAddressForm :type="type" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.edit-address {
  @apply w-full mb-8 lg:ml-8;
}

.edit-address__wrapper {
  @apply w-full;
}

.edit-address__header {
  @apply mb-8 pb-3 border-b border-b-white/80;
}

.edit-address__title {
  @apply text-2xl font-semibold text-color-2;
}

.edit-address__content {
  @apply p-5;
}
</style>
