<script setup>
const auth = useAuthStore();
const router = useRouter();

// login | register | recover
const mode = ref('login');

const items = [
  [
    {
      label: 'Órdenes',
      icon: 'i-ph-receipt',
      click: () => {
        router.push('/invoices');
      },
    },
    {
      label: 'Direcciones',
      icon: 'i-ph-road-horizon',
      click: () => {
        router.push('/addresses');
      },
    },
    {
      label: 'Carrito de compras',
      icon: 'i-ph-shopping-cart',
      click: () => {
        router.push('/shopping-cart');
      },
    },
    {
      label: 'Lista de deseo',
      icon: 'i-ph-heart',
      click: () => {
        router.push('/wishlist');
      },
    },
  ],
  [
    {
      label: 'Cerrar sesión',
      icon: 'i-ph-sign-out',
      click: () => auth.logout(),
    },
  ],
];
</script>

<template>
  <div v-if="!auth.authenticated" class="user-area">
    <UPopover>
      <div class="user-area__icon-wrapper">
        <UIcon name="i-ph-user" class="user-area__icon" />
      </div>
      <template #panel>
        <AuthLogin
          v-if="mode === 'login'"
          @forget-click="mode = 'recover'"
          @new-client-click="mode = 'register'"
        />
        <AuthRegister v-if="mode === 'register'" @login="mode = 'login'" />
        <AuthForgotPassword v-if="mode === 'recover'" @click="mode = 'login'" />
      </template>
    </UPopover>
  </div>
  <UDropdown
    :items="items"
    :ui="{
      rounded: 'ring-0 ring-transparent',
      item: {
        disabled: 'cursor-text select-text',
        active: 'bg-color-2',
      },
    }"
    :popper="{ placement: 'bottom-start' }"
    v-else
  >
    <UIcon name="i-ph-user" class="user-area__icon" />
    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UIcon
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-color-8 ms-auto"
      />
    </template>
  </UDropdown>
</template>

<style scoped>
.user-area {
  @apply flex flex-nowrap text-left cursor-pointer ml-1;
}

.user-area__links-group {
  @apply hidden pl-[0.25em] md:pl-[0.625em] lg:block;
}

.user-area__link {
  @apply text-xs block font-bold md:text-sm text-color-2;
}

.user-area__menu {
  @apply mx-5 relative cursor-pointer;
}

.user-area__icon {
  @apply text-4xl text-color-2 ml-2;
}
</style>
