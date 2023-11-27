<script lang="ts" setup>
const items = [
  {
    slot: 'pago-movil',
    label: 'Pago movil',
  },
  {
    slot: 'trans-bofa',
    label: 'Trans BoFa',
  },
  {
    slot: 'venmo',
    label: 'Venmo',
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
      <LazyPaymentPagoMovil />
    </template>
    <template #trans-bofa>
      <LazyPaymentTransBofa />
    </template>
    <template #venmo>
      <LazyPaymentVenmo />
    </template>
    <template #zelle>
      <LazyPaymentZelle />
    </template>
  </UTabs>
</template>
