<script setup lang="js">
import {Source} from "../../domain/model/source.entity.js";
import SourceItem from "./source-item.vue";

const { visible, sources } = defineProps({ visible: Boolean, sources: Array });
const emit  = defineEmits(['source-selected', 'update:visible']);

const emitVisibilityUpdatedEvent = (value) => {
  emit('update:visible', value);
};

const emitSourceSelectedEvent = source => {
  emit('source-selected', source);
};
</script>

<template>
  <pv-drawer :visible="visible" @update:visible="emitVisibilityUpdatedEvent">
    <source-item v-for="source in sources"
                 :key="source.id"
                 :source="source"
                 @source-selected="emitSourceSelectedEvent(source)"/>
  </pv-drawer>
</template>

<style scoped>

</style>