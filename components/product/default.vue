<script lang="ts" setup>
import mapper from 'smapper';
import { injectKeys } from '~/config/constants';
import { GetProductById } from '~/graphql/queries';

const props = defineProps<{ product: Product }>();

const cart = useCartStore();
// const router = useRouter();
const graphql = useStrapiGraphQL();
const pruductStore = useProductStore();
const { $notify } = useNuxtApp();

async function handleAddToCart() {
  const newProduct = {
    id: props.product.id,
    quantity: 1,
    price: props.product.price,
  };

  // if (props.product.size_stock?.length) {
  //   $notify({
  //     group: 'all',
  //     title: 'Advertencia',
  //     text: `Seleccione una talla`,
  //   });
  //   router.push(`/product/${props.product.id}`);
  //   return;
  // }

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

  $notify({
    group: 'all',
    title: '¡Éxito!',
    text: `Producto ${newProduct.id} ha sido agregado al carrito!`,
  });
}

provide(injectKeys.product, props.product);
</script>

<template>
  <div class="lg:(p-[20px_20px_0] pb-8) flex flex-col items-center">
    <div class="product relative p-3 lg:p-0">
      <div class="product__thumbnail relative">
        <product-thumbnail-image />
        <div
          class="absolute bg-color-4 bottom-0 left-0 flex justify-center items-center"
          v-if="!product.gluten"
        >
          <span class="px-4 py-1 font-300">Sin gluten</span>
        </div>
      </div>
      <div class="flex-1">
        <product-title :id="product.id">{{ product.name }}</product-title>
        <p>{{ product.description }}</p>
      </div>
      <div class="flex gap-2 flex-1 items-end">
        <product-price>{{ product.price }}</product-price>
        <button
          class="px-2 py-2 bg-color-4 flex text-color-2 font-500 transition hover:bg-opacity-80"
          @click="handleAddToCart"
        >
          Agregar
          <div class="i-ph-shopping-cart text-2xl text-color-2"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product {
  @apply h-full box-border relative flex flex-col box-border border shadow-md transition ease hover:(border border-gray-300) w-[168px] max-w-[168px] lg:(w-300px max-w-300px p-[20px_20px_20px] min-h-440px);
}

.product__thumbnail {
  @apply relative overflow-hidden;
}

.product__thumbnail:hover > ul {
  transform: translate(-50%, 0);
}
</style>
