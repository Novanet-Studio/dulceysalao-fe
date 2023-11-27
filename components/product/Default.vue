<script lang="ts" setup>
import mapper from 'smapper';
import { injectKeys } from '~/config/constants';
import { GetProductById } from '~/graphql/queries';

const props = defineProps<{ product: Product }>();

const cart = useCartStore();
const router = useRouter();
const graphql = useStrapiGraphQL();
const pruductStore = useProductStore();

const hasStock = computed(() => {
  return props.product.stock > 0;
});

async function handleAddToCart() {
  const newProduct = {
    id: props.product.id,
    quantity: 1,
    price: props.product.price,
  };

  cart.addProductToCart(newProduct);

  const itemsList = cart.cartItems.map((item) => {
    return graphql<ProductRequest>(GetProductById, { id: item.id });
  });

  const itemsResult = await Promise.all(itemsList);

  const temp: any[] = [];

  mapper<any[]>(itemsResult).map((item) => {
    temp.push(item.products[0]);
  });

  pruductStore.addCartProducts(temp);

  useToast().add({
    icon: 'i-ph-check',
    title: '¡Éxito!',
    description: `¡El producto ${newProduct.id} ha sido agregado al carrito!`,
  });
}

provide(injectKeys.product, props.product);
</script>

<template>
  <UCard
    class="mx-4"
    :ui="{
      divide: 'divide-none',
      ring: 'ring-0 ring-transparent',
      rounded: 'rounded-sm',
      header: { padding: '!px-0 !py-0' },
    }"
  >
    <template #header>
      <div class="product__item">
        <ProductThumbnailImage />
        <div class="product__tag">
          <span class="product__tag-text" v-if="product.gluten_free">
            Sin gluten
          </span>
        </div>

        <span class="product__stock-warning" v-if="!hasStock">
          No hay inventario
        </span>
      </div>
    </template>
    <section class="product__info-actions">
      <h5 class="product__title">
        {{ product.name }}
      </h5>
      <p class="text-gray-500">
        {{ product.description }}
      </p>
      <div class="flex gap-2 items-center">
        <span class="product__price"> ${{ product.price }} </span>
        <UButton
          color="color-4"
          icon="i-ph-shopping-cart"
          size="lg"
          label="Agregar"
          :disabled="!hasStock"
          @click="handleAddToCart"
          :ui="{
            rounded: 'rounded-none',
          }"
        />
      </div>
    </section>
  </UCard>
</template>

<style scoped>
.product__item {
  @apply h-72 w-full relative;
}

.product__tag {
  @apply absolute bg-color-2 bottom-0 left-0 flex justify-center items-center;
}

.product__tag-text {
  @apply px-4 py-1 font-light;
}

.product__stock-warning {
  @apply absolute top-0 left-0 w-full h-full bg-black/50 p-4 flex items-center justify-center text-2xl text-color-2;
}

.product__info-actions {
  @apply flex flex-col justify-center gap-4;
}

.product__title {
  @apply text-xl text-color-8 font-medium;
}

.product__price {
  @apply w-[50px] h-[41px] bg-color-2 text-xl flex items-center justify-center rounded-sm;
}
</style>
