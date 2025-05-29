<template>
  <div class="under-construction-container">
    <div class="logo-animation-wrapper">
      <img src="/herballo-logo.png" alt="Your Company Logo" class="construction-logo" />
    </div>
    <h1 class="construction-title">Page Under Construction</h1>
    <p class="construction-message">We're working hard to bring you something amazing! Please check back soon.</p>
    <div class="loader-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnderConstruction'
};
</script>

<style scoped>
.under-construction-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensure it takes full viewport height */
  width: 100vw; /* Ensure it takes full viewport width */
  text-align: center;
  background-color: white; /* Changed to white background for the entire page */
  padding: 2rem;
  box-sizing: border-box;
}

.logo-animation-wrapper {
  margin-bottom: 2rem; /* Space below the logo */
}

.construction-logo {
  max-width: 200px; /* Adjust logo size as needed, same as splash */
  height: auto;
  animation: popAndShrink 2s ease-in-out infinite; /* Apply the splash screen animation */
}

/* Reusing the animation definition from your splash screen */
@keyframes popAndShrink {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  20% {
    transform: scale(1.1);
    opacity: 1;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  80% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}

.construction-title {
  font-size: 3rem;
  font-weight: bolder;
  margin-bottom: 1rem;
  color: #4CAF50; /* Green text for the title */
  text-shadow: none; /* Remove text shadow for cleaner look on white */
}

.construction-message {
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  margin-bottom: 2rem;
  color: #1a1a1a; /* Black text for other messages */
  text-shadow: none; /* Remove text shadow */
}

.loader-dots {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.loader-dots span {
  display: block;
  width: 12px;
  height: 12px;
  background-color: #4CAF50; /* Green dots */
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loader-dots span:nth-child(1) {
  animation-delay: -0.32s;
}
.loader-dots span:nth-child(2) {
  animation-delay: -0.16s;
}
.loader-dots span:nth-child(3) {
  animation-delay: 0s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Responsive adjustments */
@media screen and (max-width: 800px) {
  .construction-title {
    font-size: 2rem;
  }
  .construction-message {
    font-size: 1rem;
  }
  .construction-logo {
    max-width: 150px; /* Slightly smaller logo on mobile */
  }
}
</style>