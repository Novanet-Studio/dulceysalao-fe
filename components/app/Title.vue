<script lang="ts" setup>
const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1366,
  '3xl': 3600,
});

const pattern = computed(() =>
  breakpoints.smallerOrEqual('lg').value
    ? '/pattern-inline-mobile.svg'
    : '/pattern-inline.svg'
);
</script>

<template>
  <header class="bg-color-1 flex justify-between mb-12">
    <h4
      class="font-bold text-lg ml-4 lg:ml-[2.25rem] py-3 md:text-2xl text-color-2 border-b-2 border-b-color-1 lg:text-3xl lg:py-7"
    >
      <slot />
    </h4>
    <NuxtImg class="" :src="pattern" />
  </header>
</template>
