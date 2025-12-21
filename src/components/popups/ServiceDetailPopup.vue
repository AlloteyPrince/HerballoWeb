<template>
  <div class="service-detail-popup-overlay" @click.self="closePopup">
    <div class="service-detail-popup-content">
      <button class="close-button" @click="closePopup">&times;</button>
      <h3 class="popup-title">{{ title }}</h3>
      <p class="popup-description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceDetailPopup',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
/* Overlay */
.service-detail-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

/* Popup Content Box */
.service-detail-popup-content {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 90%;
  text-align: center;
  position: relative;
  animation: fadeInScale 0.3s ease-out forwards;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #888;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #333;
}

.popup-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
}

.popup-description {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  white-space: pre-wrap;
  text-align: left; 
}

/* Animation */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .service-detail-popup-content {
    padding: 20px;
  }
  .popup-title {
    font-size: 1.6rem;
  }
  .popup-description {
    font-size: 1rem;
  }
}
</style>
