<script lang="js" setup>
import {useI18n} from "vue-i18n";
import {Article} from "../../domain/model/article.entity.js";
import SourceSummary from "./source-summary.vue";
import {ref} from "vue";

const {t} = useI18n();

const { article } = defineProps({article: {type: Article, required: true}});

const emit = defineEmits(['article-shared']);

const sourceSummary = ref();

const toggleSourceSummary = event => {
  sourceSummary.value.toggle(event);
};

const shareArticle = async () => {
  const shareData = {title: article.title, url: article.url.toString()};
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      console.log('Article shared successfully');
    } catch (err) {
      console.error('Error sharing the article:', err);
    }
  } else {
    try {
      await navigator.clipboard.writeText(shareData.url);
      emit('article-shared', shareData.url);
      console.log('Article URL copied to clipboard');
    } catch (err) {
      console.error('Failed to copy the article URL:', err);
    }
  }
};

</script>

<template>
  <pv-card class="m-2">
    <template #header>
      <img :alt="article.title" :src="article.urlToImage.toString()" class="image-fit"/>
    </template>
    <template #title>
      <p class="flex align-content-start flex-wrap">
        {{ article.title }}
      </p>
    </template>
    <template #subtitle>
      <div class="flex flex-column gap-2">
        <p class="flex align-content-start flex-wrap cursor-pointer" @click="toggleSourceSummary">
          <span class="flex align-items-center justify-content-center mr-2">
            <pv-avatar :aria-label="article.source.name"
                       :image="article.source.urlToLogo"
                       shape="circle"/>
          </span>
          <span class="flex align-items-center justify-content-center font-bold">
            {{ article.source.name }}
          </span>
        </p>
        <p v-if="article.author" class="flex align-content-start flex-wrap">
          <span class="text-sm">{{ t('article.by') }} {{ article.author }}</span>
        </p>
        <p class="flex align-content-start flex-wrap">
          <span class="text-sm">{{ t('article.published-on') }} {{ article.getFormatedPublishedAt() }}</span>
        </p>
      </div>
      <source-summary ref="sourceSummary" :source="article.source" />
    </template>
    <template #content>
      <p class="flex align-content-start flex-wrap mt-4">
        {{ article.description }}
      </p>
    </template>
    <template #footer>
      <div class="flex justify-content-between align-items-center">
        <pv-button v-if="!article.url.isEmpty()" as="a" :href="article.url.toString()" target="_blank"
                   :label="t('read-more')" link class="p-0" />
        <pv-button
            v-if="!article.url.isEmpty()"
            v-tooltip="t('article.copy-to-clipboard')"
            :label="t('article.share')"
            aria-label="Share article"
            text
            size="small"
            icon="pi pi-share-alt"
            @click="shareArticle"/>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.image-fit {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>