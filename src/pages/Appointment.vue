<template>
    <div class="container">
        <div class="appointment">
            <img class="pub-mic" src="../images/pub-mic.jpg" alt="">
            <div class="app-info">
                <p class="app-head">Book a Speaking Engagement</p>
                <p class="app-neck">We are available for bookings. Reach out to us and we will be happy to showup and do what we do best.</p>
                <div class="btns-app">
                <button class="line-button btn-app">More Info</button>
                <button class="black-button btn-app">Book Now</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: "Appointment",
  props:'',
  data(){
    return{}
  }
}
</script>

<style scoped>

.appointment{
    background-color: white;
    height: 25rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    /* box-shadow: 2px 2px 2px rgb(197, 197, 197);  */
}



.pub-mic{
    height: 20rem;
}


.app-head{
    margin-top: 6rem;
    font-size: 2rem;
    font-weight: bolder;
    text-align: right;
     margin-right: 15rem;
     margin-bottom: 1.5rem;
}

.app-neck{
    margin-right: 15rem;
    text-align: right;
}

.btn-app{
    font-family: Poppins, serif;
    border-radius: 0.3rem;
   
}

.btns-app{
    display: flex;
    justify-content: end;
    gap: 1.5rem;
    margin-top: 1rem;
}

.line-button{
    color: black;
    border: 2px solid black;
    padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;


}

.black-button{
    padding: 0.75rem 1.5rem;
    color: rgb(71, 232, 119);
    background-color: black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
}


@media screen and (max-width: 800px){

    .appointment{
    height: 35rem;
    width: 100%;
    flex-direction: column;
    padding-bottom: 2.5rem;
    padding-top: 1.5rem;
}

    .pub-mic{
        margin-top: 1rem;
        display: block;
        height: 14rem;
    }
    .app-info{
    text-align: center;
    margin-top: -10rem;   
    }

    .app-head{
    font-weight: bolder;
    text-align: center;
    margin-right: 0;
    line-height: 1;
    margin-bottom: 1rem;
    }

    .app-neck{
    margin-right: 1rem;
    margin-left: 1rem;
    margin-bottom: 2rem;
    text-align: center;

   }

   .btns-app{
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-right: 15rem;
   

}


}

</style>