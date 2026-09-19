<script setup lang="js">
import {Source} from "../../domain/model/source.entity.js";

const { source } = defineProps(
    { source:
          { type: Source,
            required: true
          }
    });
const emit  = defineEmits(['source-selected']);

const emitSourceSelectedEvent = () => {
  emit('source-selected', source);
};
</script>

<template>
  <div class="m-4">
    <div @click="emitSourceSelectedEvent" class="flex align-content-start flex-wrap cursor-pointer hover:bg-emphasis p-2 border-round transition-colors transition-duration-150">
    <span  class="flex align-items-center justify-content-center mr-2">
          <pv-avatar :aria-label="source.name"
                     :image="source.urlToLogo"
                     shape="circle"/>
    </span>
      <span  class="flex align-items-center justify-content-center font-medium">
          {{source.name}}
    </span>
    </div>
  </div>
</template>

<style scoped>

</style>