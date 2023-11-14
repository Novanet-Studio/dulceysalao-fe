<script lang="ts" setup>
const {
  isLoading,
  categories,
  categoryActive,
  categoriesResult,
  filterByCategory,
  removeFilters,
} = useCategory({
  ordered: true,
});
</script>

<template>
  <AppBanner />
  <div class="default__content">
    <AppMessage class="default__message">
      Discover our diverse collection of bikinis, one pieces, and swimwear sets
      that come with matching cover ups.
    </AppMessage>
    <product-loader v-if="isLoading" />
    <div id="parent" v-else>
      <AppCategories
        :categories="categories"
        :categoryActive="categoryActive"
        :filterByCategory="filterByCategory"
        :removeFilters="removeFilters"
      />

      <TransitionGroup name="list" tag="div">
        <ProductLanding
          v-for="category in categoriesResult"
          :key="category.id"
          :category="category"
          :filtered="!!categoryActive"
          @filter="filterByCategory(category.id, '#parent')"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
