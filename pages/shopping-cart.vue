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
// const discount = ref('');

const handleIncreaseQuantity = (id: string) => {
  cart.cartItems = cart.cartItems.map((item) =>
    item.id === id
      ? {
          ...item,
          quantity: item.quantity + 1,
        }
      : item
  );
};

const handleDescreaseQuantity = (id: string) => {
  cart.cartItems = cart.cartItems.map((item) =>
    item.id === id
      ? {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
        }
      : item
  );
};

const loadCartProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);

  if (!itemsId.length) return;

  if (!cart.cartItems.length) {
    product.cartProducts = null;
    return;
  }

  const productPromises = itemsId.map((id: string) =>
    graphql<ProductRequest>(GetProductById, { id })
  );

  const [response] = await Promise.all(productPromises);

  product.cartProducts = strapiMapper(response.data.products.data) as Product[];
};

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

const getQuantity = (id: string) => () =>
  cart.cartItems?.length
    ? cart.cartItems?.find((item) => item.id === id)!.quantity
    : 0;

// const products = computed(
//   () =>
//     product.cartProducts?.map((product) => ({
//       id: product!.id,
//       product: {
//         url: product!.images[0].url,
//       },
//       price: product!.price,
//       amount: cart.cartItems.find((item) => item.id === product!.id)!.quantity,
//       total:
//         product!.price *
//         cart.cartItems.find((item) => item.id === product!.id)!.quantity,
//     }))
// );

const products = computed(
  () =>
    product.cartProducts?.map((product) => ({
      id: product!.id,
      product: {
        url: product!.images[0].url,
      },
      price: product!.price,
      amount: getQuantity(product!.id),
      total: product!.price * Number(getQuantity(product!.id)),
    }))
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
        <img
          class="w-12 h-12 object-cover rounded-full lg:w-20 lg:h-20"
          :src="row.product.url"
        />
      </template>
      <template #amount-data="{ row }">
        <CustomQuantity
          :v-model="row.amount"
          @increase="handleIncreaseQuantity(row.id)"
          @descrease="handleDescreaseQuantity(row.id)"
        />
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
