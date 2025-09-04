<template>
  <Navigation />
  <hero />
  <WhyItWorks />
  <WhyHerballo />
  <services />
  <library />
  <FixedBackgroundScroll />
  <blogspace id="blog"></blogspace>
  <VFooter />
</template>

<script>
import { useSEO } from "../composables/useSEO";

import Hero from "@/components/Hero.vue";
import Blogspace from "@/components/Blogspace.vue";
import Library from "@/components/Library.vue";
import Services from "@/components/Services.vue";
import Navigation from "@/components/Navigation.vue";
import FixedBackgroundScroll from "@/components/FixedBackgroundScroll.vue";
import VFooter from "@/components/VFooter.vue";
import WhyHerballo from "@/components/WhyHerballo.vue";
import WhyItWorks from "@/components/HowItWorks.vue";

export default {
  name: "HomePage",
  components: {
    Hero,
    WhyItWorks,
    WhyHerballo,
    Services,
    Blogspace,
    Library,
    Navigation,
    FixedBackgroundScroll,
    VFooter,
  },
  data() {
    return {};
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
  setup() {
    useSEO({
      title: "Herballo - Natural Herbal Medicine Solutions",
      description:
        "Welcome to Herballo, your trusted partner in herbal medicine education, consultation, and product development.",
      keywords: "herbal medicine, natural health, herbal products",
      url: "https://herballo.co",
      image: "https://herballo.co/home-og.jpg",
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  scroll-behavior: smooth;
}

body {
  font-family: Poppins, sans-serif;
}
</style>
