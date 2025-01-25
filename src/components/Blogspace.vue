<template>
    <div id="blog" class="container">

        <div class="blogvisit">
        <p class="blog-visit"><a href="">Visit our Blog</a></p>
    </div>

    <div class="blogspace">
        <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt=""></div>
            <div class="texts">
                <p class="box-text">Hypertension Research</p>
                <p class="box-text2">We found that ...</p>
            </div>
        </div>

        <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt=""></div>
            <div class="texts">
                <p class="box-text">Cancer Research</p>
                <p class="box-text2">We found that ...</p>
            </div>
        </div>

        <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt=""></div>
            <div class="texts">
                <p class="box-text">Diabetes Research</p>
                <p class="box-text2">We found that ...</p>
            </div>
        </div>

        <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt=""></div>
            <div class="texts">
                <p class="box-text">Arthritis Research</p>
                <p class="box-text2">We found that ...</p>
            </div>
        </div>

        <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt=""></div>
            <div class="texts">
                <p class="box-text">Products Research</p>
                <p class="box-text2">We found that ...</p>
            </div>
        </div>
        
    </div>
    

</div>
    
    <div class="socials">
        <p class="text-socials">Follow us</p>
        <div>
            <img src="../images/yt-looo.png" alt="" class="socials-1">
            <p class="texts-socials-under">YouTube</p>
        </div>
        <div>
            <img src="../images/tiktok-logo.png" alt="" class="socials-2">
            <p class="texts-socials-under">TikTok</p>
        </div>
        
        
    </div>
</template>

<script>
export default {
    name: "Blogspace",
    props:'',
    emits:[],
    computed: {},
    methods: {}
};
</script>

<style>
.container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.blogspace{
    width: 80%;
    height: 28vh;
    padding-bottom: 1rem;
    padding-top:1rem;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 20%;

    overflow-x: auto;
}

.box{
    height: 180px;
    width: 200px;
    background-color: rgb(255, 255, 255);
    /* background-color: rgb(15, 32, 20); */
   
    border-radius: 20px;
    overflow: hidden;
    border: 2px solid white;
    transition: ease-in-out .3s;

}
.box:hover{
    width: 220px;
    box-shadow: 2px 2px 10px rgb(197, 197, 197);
}


.img-box{
    height: 120px;
    width: 100%;
}

.box p {
    text-align: center;
    color: rgb(15, 32, 20);
}


.box-text{
    font-weight: bold;
}
.box-text2{
    font-size: 0.8rem;
}

.blogvisit{
  margin-top: 2rem;
}

.blog-visit a{
    /* color: black; */
    font-weight: bolder;
    font-size: 2rem;
} 
.blog-visit a:visited{
    color: grey;
} 

.socials{
    height: 12vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background-color: rgb(238, 238, 238);
}


.socials img{
    height: 50px;
}
.texts-socials-under{
    text-align: center;
    font-size: 0.8rem
}

.text-socials{
    color: gray;
    font-size: 2rem;
    font-weight: bolder;
}

@media screen and (max-width: 800px){

    .container{
        width: 100%;
    }

    .blogspace{

        width: 95%;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 50%;
        gap: 2rem;

        overflow-x: auto;
    }

    .box{
        overflow: visible;
    }

    .text-socials{
        color: rgb(130, 128, 128);
        font-size: 1.2rem;
    }

    .socials{
    gap: 1rem;
}
}


</style>