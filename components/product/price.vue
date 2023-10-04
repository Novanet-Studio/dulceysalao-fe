<script lang="ts" setup>
defineProps<{ class?: string }>();
</script>

<template>
  <p
    class="relative text-base bg-color-2 inline-block px-2 py-2 text-color-[#282828]"
    :class="class"
  >
    $
    <slot />
  </p>
</template>
