<template>
  <hero></hero>
  <services></services>
  <library></library>
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

export default {
  name: "HomePage",
  components: {
    Hero,
    Services,
    Blogspace,
    Library,
    Myfooter,
    Contact,
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
