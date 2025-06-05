<template>
  <div>
    <!-- <UnderConstruction /> -->
    <Consent v-if="$route.path === '/consultation'" />
    <router-view />
  </div>
</template>

<script>
import Consent from "@/components/Consent.vue";
import UnderConstruction from "@/components/UnderConstruction.vue";

export default {
  name: "Consultation",
  components: {
    Consent,
    UnderConstruction
  }
};
</script>

<style scoped>
</style>