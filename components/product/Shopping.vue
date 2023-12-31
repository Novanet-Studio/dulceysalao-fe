<script lang="ts" setup>
import mapper from 'smapper';
import { injectKeys } from '~/config/constants';
import { GetProductById } from '~/graphql/queries';

const graphql = useStrapiGraphQL();

const cart = useCartStore();
const productStore = useProductStore();
const wishlist = useWishlistStore();
const router = useRouter();
const quantity = ref<number>(1);

const product = inject(injectKeys.productDetail) as Ref<Product>;

const isQuantityGreaterThanTen = computed(() => {
  const existItem = cart.cartItems.find((item) => item.id === product.value.id);
  const isSpecial = existItem?.id === '3';
  const maxItems = isSpecial ? 5 : 10;

  return existItem?.id && quantity.value + existItem.quantity > maxItems;
});

const isQuantityGreatherThanStock = computed(() => {
  return quantity.value > product.value.stock;
});

const handleIncreaseQuantity = () => quantity.value++;
const handleDescreaseQuantity = () =>
  quantity.value > 1 ? quantity.value-- : quantity;

const addItemToCart = async (payload: CartItem) => {
  const temp: Product[] = [];

  cart.addProductToCart(payload);

  if (!cart.cartItems.length) return;

  const itemsList = cart.cartItems.map((item) =>
    graphql<ProductRequest>(GetProductById, { id: item.id })
  );

  const itemsResult = await Promise.all(itemsList);

  mapper<any[]>(itemsResult).forEach((item) => {
    temp.push(item.products[0]);
  });

  productStore.addCartProducts(temp);

  useToast().add({
    icon: 'i-ph-check',
    title: '¡Éxito!',
    description: `${product.value.name} ha sido agregado al carrito`,
    color: 'green',
  });
};

const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

const handleAddItemToWishlist = () => {
  const item = {
    id: product.value.id,
  };

  wishlist.addItem(item);

  useToast().add({
    icon: 'i-ph-check',
    title: '¡Éxito!',
    description: `${product.value.name} ha sido agregado a la lista de deseos`,
    color: 'green',
  });
};

const handleAddToCart = (isBuyNow = false) => {
  const item = {
    id: product.value.id,
    quantity: quantity.value,
    price: product.value.price,
  };

  const isSpecial = item.id === '3';
  const message = `No puedes agregar más de ${isSpecial ? 5 : 10} artículos`;

  if (isQuantityGreaterThanTen.value) {
    useToast().add({
      icon: 'i-ph-warning',
      title: '¡Advertencia!',
      description: message,
      color: 'orange',
    });
    return;
  }

  addItemToCart(item);

  if (isBuyNow) goToCheckout();
};
</script>

<template>
  <div class="product__actions">
    <UButton
      label="Comprar"
      class="px-8 !bg-color-1 hover:!bg-color-1-700"
      size="lg"
      :ui="{
        rounded: 'rounded-none',
      }"
      :disabled="isQuantityGreatherThanStock"
      @click="handleAddToCart(true)"
    />
    <CustomQuantity
      v-model="quantity"
      @descrease="handleDescreaseQuantity"
      @increase="handleIncreaseQuantity"
    />
    <UButton
      icon="i-ph-bag"
      color="color-4"
      class="ring-0 ring-transparent shadow-xl"
      size="lg"
      label="Agregar"
      :disabled="isQuantityGreatherThanStock"
      :ui="{
        rounded: 'rounded-none',
      }"
      @click="handleAddToCart(false)"
    />

    <UButton
      icon="i-ph-heart"
      color="color-4"
      class="ring-0 ring-transparent shadow-xl"
      size="lg"
      :ui="{
        rounded: 'rounded-none',
      }"
      :disabled="isQuantityGreatherThanStock"
      @click="handleAddItemToWishlist"
    />
    <p class="product__actions-warning" v-if="isQuantityGreatherThanStock">
      La cantidad es mayor al inventario disponible
    </p>
  </div>
</template>

<style scoped>
.product__actions {
  @apply flex gap-1.5 items-center mt-4 md:gap-4;
}
.product__actions-warning {
  @apply mt-4 font-light text-red-500;
}
</style>
