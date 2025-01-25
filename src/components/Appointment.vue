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
/* .container{
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%;
    gap: 5rem;
    overflow-x: auto;
} */

.appointment{
    background-color: white;
    height: 20rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    box-shadow: 2px 2px 2px rgb(197, 197, 197); 
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
    width: 7.5rem;
    height: 2rem;
    font-family: Poppins, serif;
    border-radius: 0.3rem;
    padding: 5px 5px 5px 5px;
}

.btns-app{
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: end;
    gap: 1.5rem;
    margin-right: 15rem;
}

.line-button{
    color: black;
    border: 2px solid black;
    background-color: none;
}

.black-button{
    color: rgb(71, 232, 119);
    border: none;
    background-color: black;
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
        margin-top: 2rem;
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
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-right: 0;

}


}

</style>