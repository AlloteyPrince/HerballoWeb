<template>
    <div class="contact-bg">
        <div class="form-white">
            <p class="get-in-touch">Get In Touch</p>
            <form action="">
            
                <label for="full-name">Name</label>
                <input type="text">
            
            <label for="Email">Email</label>
            <input type="text">
            <label for="Message">Message</label>
            <input type="text">
            <button class="black-button btn-app">Book Now</button>
            </form>
            
        </div>

    </div>
</template>

<script setup>

</script>

<style scoped>

.contact-bg{
    background-image: url(../images/image-asset.jpeg);
    background-repeat: no-repeat;
    background-size: cover;
    height: 25rem;
    width: 100%;
    padding-top: 1rem;
    
}

.get-in-touch{
    text-align: center;
    color: white;
    font-weight: bolder;
    font-size: 2rem;   
    /* background-color: rgba(0, 0, 0, 0.582);  */
}

form{
    padding-top: 1rem;
    padding-bottom: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
}

label{
    color: white;
    display: block;
}

input{
    width: 80%;
    height: 2rem;
    border-radius: 0.5rem;
    border: none;
    padding-left: 1rem;
}


.black-button{
     background-color: #105212;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

@media screen and (max-width: 800px){
    .get-in-touch{
    text-align: center;
    color: white;
    font-weight:bold;
    font-size: 1.5rem;    
}
}

</style>