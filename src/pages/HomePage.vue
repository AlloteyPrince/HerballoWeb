<template>
  
  <navigation/>
  <hero/>
  <services></services>
  
  <library></library>
  <FixedBackgroundScroll/>
  <blogspace id="blog"></blogspace>
  <contact id="contact"></contact>
  <myfooter></myfooter>
</template>

<script>
import Hero from "@/components/Hero.vue";
import Blogspace from "@/components/Blogspace.vue";
import Myfooter from "@/components/Myfooter.vue";
import Contact from "@/components/Contact.vue";
import Library from "@/components/Library.vue";
import Services from "@/components/Services.vue";
import Navigation from "@/components/Navigation.vue";
import FixedBackgroundScroll from "@/components/FixedBackgroundScroll.vue";

export default {
  name: "HomePage",
  components: {
    Hero,
    Services,
    Blogspace,
    Library,
    Myfooter,
    Contact,
    Navigation,
    FixedBackgroundScroll
  },
  data() {
    return {};
  },
  methods: {},
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
