<script lang="ts" setup>
import about from '~/data/about.json';
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt();
</script>

<template>
  <section class="about">
    <img src="/img/home/1.png" alt="Nosotros" />

    <div class="container mt-12">
      <app-message variant="secondary" mode="small" class="mb-8">
        {{ about.first_section.title }}
      </app-message>
      <div class="bio">
        <div v-html="markdown.render(about.first_section.p_1)"></div>
        <div v-html="markdown.render(about.first_section.p_2)"></div>
      </div>
      <app-message variant="secondary" mode="small" class="my-16">
        {{ about.second_section.title }}
      </app-message>
      <div class="bio">
        <div v-html="markdown.render(about.second_section.p_1)"></div>
        <div v-html="markdown.render(about.second_section.p_2)"></div>
      </div>
    </div>
  </section>
</template>

<style>
.bio {
  @apply px-7 pt-6 w-full lg:(grid grid-cols-2 gap-4);
}

.bio p {
  @apply text-xl leading-8 mb-4 text-color-7;
}

.bio div {
  @apply;
}

.bio div:nth-child(odd) {
  @apply lg:(border-r-2 pr-4);
}

.bio div:nth-child(even) {
  @apply lg:(pl-4);
}
</style>
