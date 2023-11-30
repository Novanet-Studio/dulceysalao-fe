<script lang="ts" setup>
const appConfig = useAppConfig();
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
  <LazyAppSlider :items="appConfig.home.slider" orientation="slider-left" />
  <div class="default__content">
    <AppMessage
      class="default__message default__message--bg"
      variant="primary"
      mode="normal"
    >
      En Dulce y Salao, nos apasiona crear experiencias inolvidables
      especialmente para ti
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
