<script lang="ts" setup>
defineProps<{ description: string }>();
</script>

<template>
  <div class="detail-description">
    <ul>
      <li class="detail-description__item">
        {{ description }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.detail-description {
  @apply text-sm mb-5 border-b border-color-6 pb-2 lg:text-base;
}

.detail-description__item {
  @apply text-black/20;
}
</style>
