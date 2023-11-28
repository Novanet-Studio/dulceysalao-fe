<script setup lang="ts">
import strapiMapper from 'smapper';
import { GetProductById } from '~/graphql/queries';

definePageMeta({
  layout: 'account',
});

const graphql = useStrapiGraphQL();

const wishlist = useWishlistStore();
const productStore = useProductStore();
const cartStore = useCartStore();

const sectionTitle = inject('sectionTitle') as Ref<string>;

sectionTitle.value = 'Wishlist';

const handleIncreaseQuantity = (id: string) => {
  cartStore.cartItems = cartStore.cartItems.map((item) =>
    item.id === id
      ? {
          ...item,
          quantity: item.quantity + 1,
        }
      : item
  );
};

const handleDescreaseQuantity = (id: string) => {
  console.log('id =>', id);
  cartStore.cartItems = cartStore.cartItems.map((item) =>
    item.id === id
      ? {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
        }
      : item
  );
};

const columns = [
  {
    key: 'product',
    label: 'Producto',
  },
  {
    key: 'price',
    label: 'Precio por unidad',
  },
  {
    key: 'actions',
  },
];

const products = computed(
  () =>
    productStore.wishlistItems?.map((product) => {
      const isSpecial = product!.id === '3';
      const maxItems = isSpecial ? 5 : 10;
      const cartItem = cartStore.cartItems.find(
        (item) => item.id === product!.id
      );
      const quantity = cartItem?.quantity || 1;
      const isInvalid =
        product!.stock < 1 ||
        quantity > product!.stock ||
        (isSpecial && quantity > maxItems);

      return {
        ...product,
        id: product!.id,
        name: product?.name,
        product: {
          url: product!.images[0].url,
        },
        price: product!.price,
        amount: quantity,
        isInvalid,
      };
    })
);

async function handleAddToCart(product: Product) {
  const item = {
    id: product.id,
    quantity: 1,
    price: product.price,
  };

  cartStore.addProductToCart(item as CartItem);

  const itemsList = cartStore.cartItems.map((item) =>
    graphql<ProductRequest>(GetProductById, { id: item.id })
  );

  const itemsResult = await Promise.all(itemsList);

  const temp: Product[] = [];

  strapiMapper<any[]>(itemsResult).forEach((item) => {
    temp.push(item.products[0]);
  });

  productStore.addCartProducts(temp);

  useToast().add({
    icon: 'i-ph-check',
    title: '¡Listo!',
    description: `"${product.name}" ha sido agregado al carrito`,
    color: 'green',
  });

  handleRemoveItemFromWishlist(product);
}

function handleRemoveItemFromWishlist(row: any) {
  wishlist.removeItem(row);
  wishlist.load();
}

onMounted(() => {
  wishlist.load();
});
</script>

<template>
  <section class="wishlist">
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
        label: 'No hay productos en la lista de deseos.',
      }"
    >
      <template #product-data="{ row }">
        <div class="flex gap-4 items-center">
          <div class="relative w-12 h-12 rounded-full lg:w-20 lg:h-20">
            <img
              class="w-12 h-12 object-cover rounded-full lg:w-20 lg:h-20"
              :src="row.product.url"
            />
            <div
              class="absolute inset-0 flex rounded-full items-center justify-center bg-black/50"
              v-if="row.isInvalid"
            >
              <UTooltip
                text="No hay inventario disponible o superas la cantidad permitida"
              >
                <UIcon name="i-ph-warning" class="text-xl text-white" />
              </UTooltip>
            </div>
          </div>
          <NuxtLink :to="`/product/${row.id}`">
            <h6 class="text-lg hover:underline">{{ row.name }}</h6>
          </NuxtLink>
        </div>
      </template>
      <template #price-data="{ row }">
        <span class="text-red-500 font-semibold text-lg" v-if="row.isInvalid">{{
          row.price
        }}</span>
        <span v-else class="text-lg">{{ row.price }}</span>
      </template>
      <template #actions-data="{ row }">
        <div class="flex gap-4">
          <UButton
            class="!bg-color-1 hover:!bg-color-1-700"
            icon="i-ph-shopping-cart"
            label="Agregar"
            :ui="{ rounded: 'rounded-sm' }"
            :disabled="row.isInvalid"
            @click="handleAddToCart(row)"
          />
          <UButton
            color="red"
            variant="ghost"
            icon="i-ph-x"
            @click="handleRemoveItemFromWishlist(row)"
          />
        </div>
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
.wishlist {
  @apply mt-12 lg:ml-8 lg:w-full lg:mt-6;
}
</style>
