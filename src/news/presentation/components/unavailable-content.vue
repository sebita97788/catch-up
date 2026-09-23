<script setup lang="js">
import {useI18n} from "vue-i18n";

const { t } = useI18n();

const { errors } = defineProps({ errors: { type: Array, default: () => [] } });
</script>

<template>
  <div class="flex flex-column align-items-center justify-content-center mt-8 text-muted-color">
    <i class="pi pi-exclamation-circle text-6xl mb-4" />
    <div><h4>{{ t('unavailable-news') }}</h4></div>
    <div v-for="error in errors" :key="error" class="mt-2">
      <h6>{{ error }}</h6>
    </div>
  </div>
</template>

<style scoped>

</style>