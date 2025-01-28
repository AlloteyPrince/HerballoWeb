<template>
   
<div >
  <header>
    <div class="logo-bar">
    <img class="logo-in-logo-bar" src="../images/ha-logo-main.jpg" alt="">
</div>

    <input type="checkbox" id="nav-toggle" class="nav-toggle">

    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <!-- <li><a href="#">Research</a></li> -->
        <!-- <li><a href="#">Participate</a></li> -->
        

        <li><a href="#blog">Research</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Our Library</a></li>
        
        <li><a href="#contact">Contact a Herbalist</a></li>
      </ul>
    </nav>

    <label for="nav-toggle" class="nav-toggle-label">
    <svg xmlns="http://www.w3.org/2000/svg"  id="menu-box" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>

<!-- <svg xmlns="http://www.w3.org/2000/svg" id="close-box" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg> -->

  </label>
  
  </header>

  <div class="hero-section">
    <p class="hero-1">
      HƎRBALLO
    </p>

    <p class="hero-2">
      Discover remedies, research, and insights into herbal medicine. Start your journey towards natural health today!
    </p>

  </div>
  

    

</div>
</template>

<script>
export default {
  name: "Hero",
  props:'',
  data(){
    return{}
  }
}
</script>

<style scoped>
 .logo-bar{
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgb(224, 224, 224);
 }

 .logo-in-logo-bar{
  height: 3rem;
  display: block;
  margin-left: 1rem;
  /* margin-left: auto;
  margin-right: auto; */
  /* height: 80%;
  display: flex;
  align-items: center; */
 }

  header{
    position: fixed;
    z-index: 999;
    width: 100%;
    background-color: white;
    text-align: center;
  }

  .hero-section{
    width: 100%;
    height: 80vh;
    background-image: url(../images/ha7.jpg);
    background-size: cover;                     
    background-position: center;
    padding: 2rem 0;
    
  }

 nav{
  position: absolute;
  text-align: left;
  top: 100%;
  left: 0;
  background-color: rgb(255, 255, 255);
  width: 100%;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  /* display: none; */
  transform: scale(1,0);
  transform-origin: top;
  transition: transform 200ms ease-in-out;
  }

 nav li{
  margin-left: 2em;
  line-height: 2rem
 }
 nav a{
  color: rgb(44, 44, 44);
  font-size: 0.8rem;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 150ms ease-in-out;
 }
 nav a:hover{
  color: rgb(183, 179, 179);
  font-size: 0.8rem;
  /* text-transform: uppercase; */
  transition: 0.3s ease;
 }

 .nav-toggle:checked ~ nav{
    /* display: block; */
    transform: scale(1,1);
  }

 #menu-box{
 height: 1.8rem;
 }

 .nav-toggle{
  display: none;
 }

 .nav-toggle-label{
  position: absolute;
  top: 0;
  right:0;
  margin-right: 1em;
  height: 100%;
  display: flex;
  align-items: center;
 
 }

 .nav-toggle:checked ~ nav a{
  opacity: 1;
  transition: opacity 150ms ease-in-out 150ms;
 }

 @media screen and (min-width: 800px){

      header{
      position:unset;
    }

    .nav-toggle-label {
      display: none;
    }


    .logo-in-logo-bar{
      /* grid-column: 2 / 4; */
       margin-left: auto;
        margin-right: auto;
    }

    nav{
      all: unset;
    }

    nav ul{
      display: flex;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0);
      gap: 5rem;
        margin-right: 7.5rem;
      
      
    }

    nav a{
      opacity: 1;
      color: rgb(255, 255, 255);
      position: absolute;
      top: 150; 
      
    }

    nav a::before {
      content: '';
      display: block;
      height: 2px;
      background: white;
      position: absolute;
      top: 2em;
      left: 0;
      right: 0;
      transform: scale(0,1);
      /* transform-origin: right; */
      transition: transform ease-in-out 250ms;
    }

    nav a:hover::before{
      transform: scale(1,1);
    }

 }

 .hero-section{
  padding-top: 17rem;
 }
 
.hero-1{
  color: white;
  font-size: 3rem;
  line-height: 0rem;
  text-align: center;
  font-weight: bolder;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-2{
  margin-top: 2rem;
  color: white;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 800px){

  .hero-section{
  padding-top: 23rem;
  height: 100vh;
 }


.hero-2{
  margin-top: 4rem;
  padding-left: 15px;
  padding-right: 15px;
  color: white;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
} 
  
}
  

</style>
