<template>
  <navigation />
  <hero />
  <services />
  <library></library>
  <FixedBackgroundScroll />
  <blogspace id="blog"></blogspace>
  <!-- <contact id="contact"></contact> -->
  <MyFooter />
</template>

<script>
import { useSEO } from "../composables/useSEO";

import Hero from "@/components/Hero.vue";
import Blogspace from "@/components/Blogspace.vue";
import MyFooter from "@/components/MyFooter.vue";
import Contact from "@/components/Contact.vue";
import Library from "@/components/Library.vue";
import Services from "@/components/Services.vue";
import Navigation from "@/components/Navigation.vue";
import FixedBackgroundScroll from "@/components/FixedBackgroundScroll.vue";
import MyFooter from "@/components/MyFooter.vue";

export default {
  name: "HomePage",
  components: {
    Hero,
    Services,
    Blogspace,
    Library,
    MyFooter,
    Contact,
    Navigation,
    FixedBackgroundScroll,
  },
  data() {
    return {};
  },
  methods: {},
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
