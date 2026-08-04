<template>
  <section class="get-in-touch">
    <h2>Get in Touch</h2>
    <div class="icons">
      <a
        v-for="link in socialLinks"
        :key="link.name"
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="link.name"
      >
        <img :src="link.img" :alt="link.name" />
      </a>
    </div>
  </section>
</template>

<script setup>
const socialLinks = [
  { 
    name: 'YouTube',  
    href: 'https://www.youtube.com/@HerballoCo',      
    img: '/images/yt-logo.png' 
  },
  { 
    name: 'LinkedIn', 
    href: 'https://www.linkedin.com/company/herballo/', 
    img: '/images/linkedin.png' 
  },
  { 
    name: 'TikTok',   
    href: 'https://www.tiktok.com/@Herballo',          
    img: '/images/tiktoklogo.png' 
  },
  { 
    name: 'Email',    
    href: 'mailto:info@herballo.co',                   
    img: '/images/email-logo.png' 
  },
  { 
    name: 'Twitter',  
    href: 'https://x.com/princeo43022643?s=21',        
    img: '/images/x-logo.png' 
  }
]
</script>

<style scoped>
.get-in-touch {
  max-width: 400px;
  margin: 2rem auto;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #3e3f3f;
}

h2 {
  margin-bottom: 1rem;
  font-weight: 600;
}

.icons {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.icons a img {
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.3s ease;
  filter: grayscale(30%);
}

.icons a:hover img,
.icons a:focus img {
  filter: grayscale(0);
  transform: scale(1.15);
  outline: none;
}
</style>