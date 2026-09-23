<script setup lang="js">
import ArticleItem from "./article-item.vue";

const { articles } = defineProps({ articles: { type: Array, required: true } });

</script>

<template>
  <div v-for="article in articles" :key="article.url.toString()">
    <article-item :article="article"/>
  </div>
</template>

<style scoped>

</style>