<template>
  <section class="get-in-touch">
    <h2>Get in Touch</h2>
    <div class="icons">
      <a
        href="https://www.youtube.com/@Herbal-Alchemy" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="YouTube"
      >
        <img src="/icons/youtube.svg" alt="YouTube" />
      </a>

      <a
        href="https://www.tiktok.com/@Herballo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
      >
        <img src="/icons/tiktok.svg" alt="TikTok" />
      </a>

      <a href="mailto:info@herballo.co" aria-label="Email Herballo">
        <img src="/icons/email.svg" alt="Email" />
      </a>

      <a
        href="https://x.com/princeo43022643?s=21"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
      >
        <img src="/icons/twitter.svg" alt="Twitter" />
      </a>
    </div>
  </section>
</template>

<script setup>
// No script needed here yet
</script>

<style scoped>
.get-in-touch {
  max-width: 400px;
  margin: 2rem auto;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2f855a;
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
