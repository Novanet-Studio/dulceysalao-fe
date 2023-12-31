<script lang="ts" setup>
import strapiMapper from 'smapper';
import { GetProductById } from '~/graphql/queries';

definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});

const graphql = useStrapiGraphQL();

const cart = useCartStore();
const product = useProductStore();

const loadCartProducts = async () => {
  const temp: any[] = [];
  const itemsId = cart.cartItems.map((item) => item.id);

  if (!itemsId.length) {
    product.cartProducts = null;
    return;
  }

  if (!cart.cartItems.length) {
    product.cartProducts = null;
    return;
  }

  const productPromises = itemsId.map((id: string) =>
    graphql<ProductRequest>(GetProductById, { id })
  );

  const response = await Promise.all(productPromises);

  response.forEach((product) => {
    temp.push(product.data.products.data[0]);
  });

  product.cartProducts = strapiMapper(temp) as Product[];
};

function getTotalQuantity(row: { id: string; price: number }) {
  const quantity =
    cart.cartItems.find((item) => item.id === row.id)?.quantity || 1;

  return quantity * row.price;
}

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Carrito de compras';

const columns = [
  {
    key: 'product',
    label: 'Producto',
  },
  {
    key: 'price',
    label: 'Precio',
  },
  {
    key: 'amount',
    label: 'Monto',
  },
  {
    key: 'total',
    label: 'Total',
  },
  {
    key: 'actions',
  },
];

const products = computed(
  () =>
    product.cartProducts?.map((product) => {
      const isSpecial = product!.id === '3';
      const maxItems = isSpecial ? 5 : 10;
      const cartItem = cart.cartItems.find((item) => item.id === product!.id);
      const quantity = cartItem?.quantity || 1;
      const isInvalid =
        product!.stock < 1 ||
        quantity > product!.stock ||
        (isSpecial && quantity > maxItems);

      return {
        ...product,
        id: product!.id,
        product: {
          url: product!.images[0].url,
        },
        price: product!.price,
        amount: quantity,
        total: product!.price * Number(quantity),
        isInvalid,
      };
    })
);

function handleRemoveProductFromCart(item: CartItem) {
  const cartItem = cart.cartItems.find(
    (element) => element.id === item.id
  ) as CartItem;
  cart.removeProductFromCart(cartItem);
}

onMounted(() => {
  loadCartProducts();
});
</script>

<template>
  <section class="shopping-cart">
    <UTable
      class="lg:max-w-3xl"
      :columns="columns"
      :rows="products"
      :ui="{
        thead: '[&>tr]:!bg-color-3  [&>tr]:!text-gray-500',
        divide: 'divide-white divide-y-2',
        tbody: 'divide-white divide-y-2',
        tr: {
          base: 'odd:bg-[#f7f6f5] even:bg-[#E6E7E8]',
        },
      }"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: 'No hay productos en el carrito',
      }"
    >
      <template #product-data="{ row }">
        <div class="relative w-12 h-12 rounded-full lg:w-20 lg:h-20">
          <img
            class="w-12 h-12 object-cover rounded-full lg:w-20 lg:h-20"
            :src="row.product.url"
          />

          <div
            class="absolute inset-0 flex rounded-full items-center justify-center bg-black/50"
            v-if="row.isInvalid"
          >
            <UTooltip text="No hay inventario disponible">
              <UIcon name="i-ph-warning" class="text-xl text-white" />
            </UTooltip>
          </div>
        </div>
      </template>
      <template #price-data="{ row }">
        <span class="text-red-500 font-semibold" v-if="row.isInvalid">{{
          row.price
        }}</span>
        <span v-else>{{ row.price }}</span>
      </template>
      <template #amount-data="{ row }">
        <CustomQuantity
          v-model="row.amount"
          @increase="cart.increaseCartItemQuantity(row.id)"
          @descrease="cart.decreaseCartItemQuantity(row.id)"
        />
      </template>
      <template #total-data="{ row }">
        <span class="text-red-500 font-semibold" v-if="row.isInvalid">{{
          getTotalQuantity(row)
        }}</span>
        <span v-else>{{ getTotalQuantity(row) }}</span>
      </template>
      <template #actions-data="{ row }">
        <UButton
          color="red"
          variant="ghost"
          icon="i-ph-x"
          @click="handleRemoveProductFromCart(row)"
        />
      </template>
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
.shopping-cart {
  @apply mt-12 lg:ml-8 lg:w-full lg:mt-6;
}
</style>
