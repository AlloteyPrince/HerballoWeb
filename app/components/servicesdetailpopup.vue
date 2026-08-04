<template>
  <div class="service-detail-popup-overlay" @click.self="closePopup">
    <div class="service-detail-popup-content">
      <button class="close-button" @click="closePopup" aria-label="Close popup">
        &times;
      </button>
      
      <div class="popup-inner">
        <h3 class="popup-title">{{ title }}</h3>
        
        <div class="title-divider"></div>
        
        <p class="popup-description">{{ description }}</p>
        
        <button class="close-action-button" @click="closePopup">
          Got it
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Nuxt 3 / Vue 3 Props definition
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);

const closePopup = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
/* Overlay with backdrop blur */
.service-detail-popup-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(16, 82, 18, 0.15); /* Light Herballo Green tint */
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
}

/* Popup Content Box */
.service-detail-popup-content {
  background-color: white;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2);
  max-width: 650px;
  width: 100%;
  position: relative;
  font-family: "Segoe UI", Tahoma, sans-serif;
  
  /* Modern Entrance Animation */
  animation: popupReveal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.popup-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  font-size: 2.2rem;
  color: #94a3b8;
  cursor: pointer;
  line-height: 1;
  transition: all 0.2s ease;

  &:hover {
    color: #105212;
    transform: rotate(90deg);
  }
}

.popup-title {
  font-size: clamp(1.8rem, 4vw, 2.2rem);
  font-weight: 800;
  color: #105212;
  margin-bottom: 15px;
  line-height: 1.2;
}

.title-divider {
  width: 50px;
  height: 4px;
  background: #22c55e;
  border-radius: 2px;
  margin-bottom: 25px;
}

.popup-description {
  font-size: 1.15rem;
  color: #475569;
  line-height: 1.8;
  white-space: pre-wrap;
  text-align: left; /* Kept left-aligned for readability of long text */
  margin-bottom: 30px;
}

.close-action-button {
  background-color: #105212;
  color: white;
  padding: 12px 35px;
  border-radius: 30px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #166534;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(16, 82, 18, 0.3);
  }
}

/* Entrance Animation Keyframes */
@keyframes popupReveal {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Mobile Adjustments */
@media (max-width: 600px) {
  .service-detail-popup-content {
    padding: 30px 20px;
    border-radius: 20px;
  }
  
  .popup-description {
    font-size: 1.05rem;
    text-align: center; /* Center text on mobile for better balance */
  }
}
</style>