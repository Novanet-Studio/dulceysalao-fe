<script lang="ts" setup>
import mapper from 'smapper';
import { injectKeys } from '~/config/constants';
import { GetProductById } from '~/graphql/queries';

const props = defineProps<{ product: Product }>();

const cart = useCartStore();
const router = useRouter();
const graphql = useStrapiGraphQL();
const pruductStore = useProductStore();

async function handleAddToCart() {
  const newProduct = {
    id: props.product.id,
    quantity: 1,
    price: props.product.price,
    size: '',
  };

  // if (props.product.size_stock?.length) {
  //   useToast().add({
  //     icon: 'i-ph-warning-duotone',
  //     title: 'Warning',
  //     description: 'You must select a size',
  //     color: 'orange',
  //   });
  //   setTimeout(() => {
  //     router.push(`/product/${props.product.id}`);
  //   }, 500);
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
      <div class="h-72 w-full relative">
        <ProductThumbnailImage />
        <div
          class="absolute bg-color-2 bottom-0 left-0 flex justify-center items-center"
        >
          <span class="px-4 py-1 font-light" v-if="!product.gluten">
            Sin gluten
          </span>
        </div>
      </div>
    </template>
    <section class="flex flex-col justify-center gap-4">
      <h5 class="text-xl text-color-8 font-medium">
        {{ product.name }}
      </h5>
      <p class="text-gray-500">
        {{ product.description }}
      </p>
      <div class="flex gap-2 items-center">
        <span
          class="w-[50px] h-[41px] bg-color-2 text-xl flex items-center justify-center rounded-sm"
        >
          ${{ product.price }}
        </span>
        <UButton
          color="color-4"
          icon="i-ph-shopping-cart"
          size="lg"
          label="Agregar"
          @click="handleAddToCart"
          :ui="{
            rounded: 'rounded-none',
          }"
        />
      </div>
    </section>
  </UCard>
</template>
