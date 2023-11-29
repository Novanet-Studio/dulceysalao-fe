<script setup lang="ts">
interface Props {
  class?: string;
  variant?: 'primary' | 'secondary';
  mode?: 'normal' | 'small';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  mode: 'normal',
});

const classes = computed<object>(() => {
  const variant = props.variant === 'primary' ? 'bg-color-1' : 'bg-color-6';
  return `${props.class} ${variant}`;
});

const mode = computed<string>(() => {
  return props.mode === 'normal' ? 'left' : 'center';
});
</script>

<template>
  <div :class="class">
    <h3 :class="mode">
      <slot />
    </h3>
  </div>
</template>

<style scoped>
.default__message {
  @apply w-full mt-12 text-white shadow  bg-color-1;
}
.default__message--bg {
  @apply bg-[url('/patron-test.svg')] bg-contain bg-no-repeat bg-right;
}

h3 {
  @apply text-color-2 md:text-3xl lg:text-2xl;
}
.left {
  @apply py-4 pl-4 pr-32 md:py-8 md:pl-8 md:pr-64 lg:pr-52;
}
.center {
  @apply p-8;
}
</style>
