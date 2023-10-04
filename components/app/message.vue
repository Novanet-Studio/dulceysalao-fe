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

const classes = computed(() => {
  const variant = props.variant === 'primary' ? 'bg-color-4' : 'bg-color-6';
  return `${props.class} ${variant}`;
});

const mode = computed<string>(() => {
  return props.mode === 'normal' ? 'py-25' : 'py-15';
});
</script>

<template>
  <div
    class="w-full text-white relative flex justify-between items-center shadow overflow-hidden"
    :class="classes"
  >
    <h3
      class="font-300 md:(text-xl -mb-1) lg:(mb-0 text-3xl pl-24)"
      :class="mode"
    >
      <slot />
    </h3>
    <img
      class="lg:h-60 absolute top-0 right-0"
      src="/patron.svg"
      alt="Patron"
    />
  </div>
</template>
