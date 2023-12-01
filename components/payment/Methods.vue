<script lang="ts" setup>
const items = [
  {
    slot: 'pago-movil',
    label: 'Pago movil',
  },
  {
    slot: 'transferency',
    label: 'Transferencia',
  },
  {
    slot: 'zelle',
    label: 'Zelle',
  },
];
</script>

<template>
  <UTabs
    :items="items"
    class="w-full"
    :ui="{
      list: {
        background: 'bg-[#E6E7E8]',
        marker: { background: 'bg-color-1' },
        tab: {
          active: 'text-[#F6F5F4]',
          inactive: 'text-color-8',
        },
      },
    }"
  >
    <template #pago-movil>
      <LazyPaymentVes />
    </template>
    <template #transferency>
      <LazyPaymentVes method="transferencia" />
    </template>
    <template #venmo>
      <LazyPaymentVenmo />
    </template>
    <template #zelle>
      <LazyPaymentZelle />
    </template>
  </UTabs>
</template>
