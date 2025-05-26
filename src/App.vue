<template>
  <SplashScreen/>
  <HomePage/>
</template>

<script>
import HomePage from "@/pages/HomePage.vue";
import SplashScreen from "@/components/SplashScreen.vue";

export default {
  name: 'App',
  components:{
    HomePage,SplashScreen
  },
  data(){
    return{}
  },
  methods: {}
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  scroll-behavior: smooth;
}

body{
  font-family: Poppins, sans-serif;
}
</style>



