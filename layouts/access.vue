<script setup>
useAppAuth();
</script>

<template>
  <div class="access">
    <div class="access__wrapper">
      <header class="access__header">
        <NuxtLink class="access__link" to="/">
          <img
            class="bg-color-1 rounded-sm p-6 w-80"
            src="/logo.svg"
            alt="Project logo"
          />
        </NuxtLink>
      </header>
      <NuxtPage />
    </div>
    <div class="mt-20"><AppFooterCopyright /></div>
  </div>
</template>

<style scoped>
.access {
  @apply flex flex-col w-full min-h-screen overflow-hidden relative bg-[#f7f7f7];
}

.access__wrapper {
  @apply w-full mt-12 flex-1 md:mx-auto;
}

.access__header {
  @apply p-6 flex justify-center;
}

.access__link {
  @apply cursor-pointer;
}
</style>
