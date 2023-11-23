<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Órdenes de compra';

const invoice = useInvoiceStore();
const router = useRouter();

// Pagination
const page = ref(1);
const pageCount = ref(5);
const pageTotal = ref(10);
const pageFrom = computed(() => (page.value - 1) * pageCount.value);
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value)
);

interface FetchInvoicesReturn {
  data: Invoice[] | undefined;
  meta: Record<string, any> | null;
}

const { data: invoices, pending } = await useLazyAsyncData<FetchInvoicesReturn>(
  'invoices',
  () => {
    const id = String(useAuthStore().user.id);
    return invoice.fetchInvoices(id, {
      page: page.value,
      pageSize: pageCount.value,
    });
  },
  {
    default: () => ({
      data: [],
      meta: null,
    }),
    watch: [page, pageCount],
  }
);

const userInvoices = computed(() => {
  return invoice.invoices.map((invoice) => ({
    ...invoice,
    id: invoice.id,
    bill: invoice.fullName,
    amount: invoice.amount,
    date: new Date(invoice?.createdAt ?? '').toLocaleDateString('es-VE'),
    status: invoice.paid ? 'Pago' : 'Pendiente',
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

watchEffect(() => {
  if (invoices.value.meta?.pagination?.total) {
    pageTotal.value = invoices.value.meta.pagination.total;
  }
});
</script>

<template>
  <section class="invoices">
    <UTable
      :rows="userInvoices"
      :columns="columns"
      :loading="pending"
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

    <div
      class="flex flex-wrap justify-between items-center mt-8"
      v-if="pageTotal > 0"
    >
      <div>
        <span class="text-sm leading-5">
          Mostrando
          <span class="font-medium">{{ pageFrom }}</span>
          a
          <span class="font-medium">{{ pageTo }}</span>
          de
          <span class="font-medium">{{ pageTotal }}</span>
          resultados
        </span>
      </div>

      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="pageTotal"
        :ui="{
          wrapper: 'flex items-center gap-1',
          rounded: '!rounded-none min-w-[32px] justify-center',
          default: {
            activeButton: {
              variant: 'outline',
              color: 'color-3',
            },
          },
        }"
      />
    </div>
  </section>
</template>

<style scoped>
.invoices {
  @apply mt-12 lg:ml-8 lg:w-full lg:mt-6;
}
</style>
