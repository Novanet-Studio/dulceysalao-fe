<script setup>
defineProps({
  text: String,
  class: String,
});
</script>

<template>
  <div
    class="w-full bg-color-4 text-white flex justify-between items-center shadow"
    :class="class"
  >
    <h3 class="font-300 md:(text-xl -mb-1) lg:(mb-0 text-3xl pl-24)">
      <slot />
    </h3>
    <img class="lg:h-60" src="/patron.svg" alt="Patron" />
  </div>
</template>
