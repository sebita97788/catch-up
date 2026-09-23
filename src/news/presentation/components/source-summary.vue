<script setup lang="js">
import {Source} from "../../domain/model/source.entity.js";
import {useI18n} from "vue-i18n";
import {ref} from "vue";

const {t} = useI18n();

const {source} = defineProps({
  source: {type: Source, required: true}
});

const popover = ref();

const toggle = (event) => {
  popover.value.toggle(event);
};

defineExpose({toggle});
</script>

<template>
  <pv-popover ref="popover">
    <div class="flex flex-column gap-3 w-25rem">
      <div class="flex align-items-center gap-2">
        <pv-avatar :image="source.urlToLogo" :aria-label="source.name" shape="circle" size="large" />
        <span class="font-bold text-xl">{{ source.name }}</span>
      </div>
      <div v-if="source.description" class="text-color-secondary">
        {{ source.description }}
      </div>
      <div class="flex flex-column gap-2">
        <div v-if="source.category" class="flex align-items-center gap-2">
          <i class="pi pi-tag text-primary"></i>
          <span>{{ source.category }}</span>
        </div>
        <div v-if="source.language" class="flex align-items-center gap-2">
          <i class="pi pi-globe text-primary"></i>
          <span>{{ source.language.toUpperCase() }}</span>
        </div>
        <div v-if="source.country" class="flex align-items-center gap-2">
          <i class="pi pi-map-marker text-primary"></i>
          <span>{{ source.country.toUpperCase() }}</span>
        </div>
      </div>
      <div v-if="!source.url.isEmpty()" class="flex justify-content-end">
        <pv-button
            as="a"
            :href="source.url.toString()"
            target="_blank"
            :label="t('read-more')"
            icon="pi pi-external-link"
            size="small"
            text />
      </div>
    </div>
  </pv-popover>
</template>

<style scoped>
</style>