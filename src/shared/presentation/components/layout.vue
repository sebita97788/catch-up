<script lang="js" setup>

import {newsStore} from "../../../news/application/news.store.js";
import SourceList from "../../../news/presentation/components/source-list.vue";
import LanguageSwitcher from "./language-switcher.vue";
import ArticleList from "../../../news/presentation/components/article-list.vue";
import FooterContent from "./footer-content.vue";
import {ref, computed, onMounted} from "vue";

const drawerVisible = ref(false);

const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value;
};

const sources = computed(() => newsStore.sources);
const articles = computed(() => newsStore.currentSourceArticles);

const setSource = source => {
  newsStore.setCurrentSource(source);
  toggleDrawer();
};

onMounted(() => {
  newsStore.loadSources();
});

</script>

<template>
  <div class="layout-container">
    <header class="sticky-header">
      <pv-menubar>
        <template #start>
          <pv-button icon="pi pi-bars" label="CatchUp"
                     text @click="toggleDrawer" class="mr-2"/>
          <source-list :sources="sources"
                       v-model:visible="drawerVisible"
                       @source-selected="setSource"/>
        </template>
        <template #end>
          <language-switcher/>
        </template>
      </pv-menubar>
    </header>
    <main class="content-padding">
      <article-list :articles="articles"/>
    </main>
    <footer>
      <footer-content/>
    </footer>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.content-padding {
  padding: 1rem;
  flex: 1;
}

@media screen and (min-width: 768px) {
  .content-padding {
    padding: 2rem;
  }
}
</style>