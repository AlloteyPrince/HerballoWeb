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
    UnderConstruction,
  },
  method: {
    trackContactClick() {
      if (window.gtag) {
        window.gtag("event", "contact_click", {
          event_category: "engagement",
          event_label: "Contact Button",
        });
      }
    },
  },
};
</script>

<style scoped></style>
