<script lang="js" setup>
import {newsStore} from "../../../news/application/news.store.js";
import SourceList from "../../../news/presentation/components/source-list.vue";
import {ref, computed, onMounted} from "vue";

const drawerVisible = ref(false);

const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value;
};

const sources = computed(() => newsStore.sources);

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
      </pv-menubar>
    </header>
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
</style>