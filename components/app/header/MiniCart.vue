<script lang="ts" setup>
const cartStore = useCartStore();
const productStore = useProductStore();

const isLoadingCart = ref(false);
const total = computed(() => cartStore.total);
const amount = computed(() => cartStore.amount);
const cartProducts = computed(() => productStore.cartProducts);
const cartItems = computed(() => cartStore.cartItems);

function getQuantity(id: string) {
  if (!cartItems.value.length) return 0;

  const item = cartItems.value.find((item) => item.id === id);

  if (!item) return 0;

  return item.quantity;
}

function handleRemoveProductFromCart(id: string) {
  const cartItem = cartItems.value.find((item) => item.id === id);
  cartStore.removeProductFromCart(cartItem as CartItem);
}
</script>

<template>
  <div class="mini-cart__wrapper">
    <UPopover :ui="{ width: 'min-w-[18.75em] max-w-xs' }">
      <button>
        <div class="header-actions__link">
          <UIcon name="i-ph-bag" class="header-actions__icon" />
          <span class="header-actions__indicator-wrapper">
            <i class="header-actions__indicator">{{ total }}</i>
          </span>
        </div>
      </button>

      <template #panel>
        <div class="mini-cart">
          <div v-if="total > 0">
            <div class="mini-cart__body">
              <AppLoader v-if="isLoadingCart" />
              <template v-else-if="cartProducts?.length">
                <div
                  class="flex gap-4"
                  v-for="(product, index) in cartProducts"
                  :key="index"
                >
                  <UAvatar
                    :src="product?.images[0]?.url"
                    icon="i-ph-image"
                    size="xl"
                    :ui="{ rounded: 'rounded-sm' }"
                  />

                  <div class="relative">
                    <h6 class="font-bold truncate max-w-[10.625rem]">
                      {{ product?.name }}
                    </h6>
                    <small>
                      {{ getQuantity(product!.id) }} x
                      {{ useGlobalStore().currency }}
                      {{ product?.price }}
                    </small>
                  </div>
                  <UButton
                    icon="i-ph-x"
                    variant="link"
                    color="color-5"
                    :padded="false"
                    @click="handleRemoveProductFromCart(product!.id)"
                  />
                </div>
              </template>
            </div>
            <div class="mini-cart__footer">
              <h3 class="mini-cart__footer-title">
                Sub total:
                <strong class="mini-cart__amount">${{ amount }}</strong>
              </h3>
              <figure class="grid grid-cols-2 gap-2">
                <UButton
                  label="Ver carrito"
                  class="justify-center !border-color-1 hover:!border-color-1-700 !text-color-1"
                  variant="outline"
                  @click="$router.push('/shopping-cart')"
                />
                <UButton
                  class="justify-center !bg-color-1 hover:!bg-color-1-700"
                  label="Pagar"
                  @click="$router.push('/checkout')"
                />
              </figure>
            </div>
          </div>
          <div v-else class="mini-cart__empty">El carrito está vacío</div>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style scoped>
.mini-cart__wrapper {
  @apply relative pt-2;
}
.mini-cart {
  @apply p-4;
}

.mini-cart__body {
  @apply relative max-h-[20em] overflow-x-hidden w-[18.75rem] max-w-xs bg-white border border-white border-b-transparent flex flex-col gap-2;
}

.mini-cart__footer {
  @apply border-t-0 bg-white mt-4;
}

.mini-cart__footer-title {
  @apply mb-5 text-base font-semibold flex justify-between;
}

.mini-cart__amount {
  @apply text-red-600 font-bold;
}

.mini-cart__empty {
  @apply relative;
}

.mini-cart__wrapper {
  @apply flex flex-nowrap justify-between items-center;
}
</style>
