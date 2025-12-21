<template>
  <UnderConstruction />
</template>

<script>
import { useSEO } from "../composables/useSEO";
import UnderConstruction from "@/components/UnderConstruction.vue";

export default {
  name: "ULearnPage",
  components: {
    UnderConstruction,
  },
  mounted() {
    useSEO({
      title: "Herballo Shop - Herbs and Herbal Product Market Place",
      description:
        "Explore our comprehensive herbal medicine catalogue and products at Herballo Shop.",
      keywords: "herbal shop, herbs, herbal medicine, herbal products",
      url: "https://herballo.co/shop",
    });
  },
  methods: {
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

<style lang="scss" scoped></style>
