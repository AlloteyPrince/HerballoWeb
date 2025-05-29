<template>
  <div class="under-construction-container">
    <div class="animation-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="wrench-icon"
      >
        <path
          d="M19.41 12.59L12.59 19.41C11.81 20.19 10.55 20.19 9.77 19.41L4.59 14.23C3.81 13.45 3.81 12.19 4.59 11.41L11.41 4.59C12.19 3.81 13.45 3.81 14.23 4.59L19.41 9.77C20.19 10.55 20.19 11.81 19.41 12.59ZM14.96 11.82L13.18 10.04L14.07 9.15C14.46 8.76 14.46 8.13 14.07 7.74L13.26 6.93C12.87 6.54 12.24 6.54 11.85 6.93L11.04 7.74L9.26 5.96L10.04 5.18L10.93 6.07C11.32 6.46 11.95 6.46 12.34 6.07L13.15 5.26C13.54 4.87 14.17 4.87 14.56 5.26L15.37 6.07C15.76 6.46 15.76 7.09 15.37 7.48L14.56 8.29C14.17 8.68 14.17 9.31 14.56 9.7L15.37 10.51C15.76 10.9 15.76 11.53 15.37 11.92L14.96 11.82Z"
        />
      </svg>
    </div>
    <h1 class="construction-title">Page Under Construction</h1>
    <p class="construction-message">
      We're working hard to bring you something amazing! Please check back soon.
    </p>
    <div class="loader-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnderConstruction",
};
</script>

<style scoped>
.under-construction-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* Ensure it takes up sufficient height */
  text-align: center;
  color: #fff; /* White text for dark backgrounds */
  background: #1a1a1a; /* A dark background to match your aesthetic */
  padding: 2rem;
  box-sizing: border-box;
}

.animation-icon {
  margin-bottom: 2rem;
}

.wrench-icon {
  width: 100px; /* Size of the icon */
  height: 100px;
  color: #4caf50; /* Green color for the icon, matching your button */
  animation: rotate 3s linear infinite; /* Animation for the icon */
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.construction-title {
  font-size: 3rem;
  font-weight: bolder;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.construction-message {
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
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
  background-color: #4caf50; /* Green dots */
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
  0%,
  80%,
  100% {
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
  .wrench-icon {
    width: 70px;
    height: 70px;
  }
}
</style>
