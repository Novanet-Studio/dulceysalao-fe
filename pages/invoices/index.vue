<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Órdenes de compra';

const invoice = useInvoiceStore();
const router = useRouter();

const userInvoices = computed(() => {
  return invoice.invoices.map((invoice) => ({
    ...invoice,
    id: invoice.id,
    bill: invoice.fullName,
    amount: invoice.amount,
    date: new Date(invoice?.createdAt ?? '').toLocaleDateString('en-US'),
    status: invoice.paid ? 'Paid' : 'Pending',
  }));
});

const columns = [
  {
    key: 'id',
    label: 'Nro',
  },
  {
    key: 'bill',
    label: 'Factura',
  },
  {
    key: 'amount',
    label: 'Monto',
  },
  {
    key: 'date',
    label: 'Fecha',
  },
  {
    key: 'status',
    label: 'Estado',
  },
];

function select(row: Invoice) {
  invoice.invoice = row;
  router.push(`/invoices/${row.id}`);
}

onMounted(async () => {
  await invoice.fetchInvoices(String(useAuthStore().user.id));
});
</script>

<template>
  <section class="invoices">
    <UTable
      :rows="userInvoices"
      :columns="columns"
      @select="select"
      :ui="{
        thead: '[&>tr]:!bg-color-3  [&>tr]:!text-white',
        divide: 'divide-white divide-y-2',
        tbody: 'divide-white divide-y-2',
        tr: {
          base: 'odd:bg-[#f7f6f5] even:bg-[#E6E7E8]',
        },
      }"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: 'No hay órdenes de compra',
      }"
    >
      <template #loading-state>
        <div class="flex flex-col items-center justify-center mt-12">
          <AppLoader />
          <span>Cargando...</span>
        </div>
      </template>
    </UTable>
  </section>
</template>

<style scoped>
.invoices {
  @apply mt-12 lg:ml-8 lg:w-full lg:mt-6;
}
</style>
