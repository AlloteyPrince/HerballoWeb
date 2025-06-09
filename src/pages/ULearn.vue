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
  setup() {
    useSEO({
      title: "Herballo Ulearn - Herbal Medicine Library & Education",
      description:
        "Explore our comprehensive herbal medicine library and educational content at Herballo Ulearn.",
      keywords: "herbal education, herbal library, herbal medicine courses",
      url: "https://herballo.co/ulearn",
    });
  },
};
</script>

<style lang="scss" scoped></style>
