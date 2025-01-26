<template>
    <div class="main">

    <div class="container">

        <div class="text_left">
            <h2>Knowledge is the best medicine</h2>
            <p class="text-sub">Explore our extensive library to discover herbs that are touching and transforming lives worldwide. Whether you're seeking healing, inspiration, or knowledge, this is the place to start."</p>
            <button>Check it here</button>
        </div>

        <div 
        class="img_right">
            <img  class="library-img" src="/src/images/hmkl.jpg" alt="">
        </div>

    </div>

</div>
</template>

<script>export default {
    name: "Library",
    props:'',
    data(){
      return{}
    }
  }
  </script>

<style scoped>
*{
    padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main{
    background-color: rgb(218, 214, 214);
    padding: 2rem 0;
}

.container{
    margin: 0 auto;
    padding: 0 2rem;
    height: auto;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  
}

.text_left {
 flex: 1;
 /* background-color: white; */
}


.img_right{
flex: 1;
display: flex;
justify-content: center;
align-items: center;
}

.library-img{
   max-width: 100%;
   height: auto;
}

.text-sub{
    margin-top: 1rem;
    line-height: 1.6;
}

button{
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #0056b3;
}

</style>