<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <button class="close-button" @click="closePopup">&times;</button>
      <h3 class="popup-title">{{ currentHerb.title }}</h3>
      <p class="popup-description">{{ currentHerb.description }}</p>
      <div v-if="currentHerb.imageUrl" class="popup-image-container">
        <img :src="currentHerb.imageUrl" :alt="currentHerb.imageAlt" class="popup-image" onerror="this.onerror=null;this.src='https://placehold.co/300x200/90EE90/006400?text=Herb+Image';" />
      </div>
      <p v-if="currentHerb.fact" class="popup-fact">{{ currentHerb.fact }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HerbPopUp', // Corrected name: HerbPopUp
  data() {
    return {
      currentHerb: { // Holds the data for the currently displayed random herb
        title: '',
        description: '',
        imageUrl: '',
        imageAlt: '',
        fact: '',
      },
      // Array of simulated herb data for the pop-up (now internal to HerbPopUp)
      herbData: [
        {
          title: 'The Power of Turmeric',
          description: 'Turmeric (Curcuma longa) is a flowering plant, Curcuma longa of the ginger family, Zingiberaceae, the roots of which are used in cooking. It is often used as a spice in many dishes, and is also known for its medicinal properties.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Turmeric_plant.jpg/800px-Turmeric_plant.jpg',
          imageAlt: 'Turmeric plant',
          fact: 'Known for its powerful anti-inflammatory and antioxidant effects.',
        },
        {
          title: 'Aloe Vera: Nature\'s Soother',
          description: 'Aloe vera is a succulent plant species of the genus Aloe. It is cultivated for agricultural and medicinal uses. The gel from its leaves is widely used in cosmetics and alternative medicine.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Aloe_vera_plant.JPG/800px-Aloe_vera_plant.JPG',
          imageAlt: 'Aloe Vera plant',
          fact: 'Great for skin health and soothing burns.',
        },
        {
          title: 'Ginseng: The Adaptogen',
          description: 'Ginseng is the root of plants in the genus Panax, such as Korean ginseng, South China ginseng, and American ginseng. It is a popular herbal remedy.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Ginseng_plant.jpg/800px-Ginseng_plant.jpg',
          imageAlt: 'Ginseng plant',
          fact: 'Helps the body adapt to stress and boosts energy.',
        },
        {
          title: 'Chamomile: The Calming Herb',
          description: 'Chamomile is the common name for several daisy-like plants of the family Asteraceae. Its dried flowers are often used to make herbal infusions for traditional medicine.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Chamomilla_recutita_001.jpg/800px-Chamomilla_recutita_001.jpg',
          imageAlt: 'Chamomile flowers',
          fact: 'Widely used for relaxation and sleep.',
        },
      ],
    };
  },
  mounted() {
    // When the component is mounted (i.e., when showPopup in App.vue becomes true)
    // select a random herb to display.
    this.selectRandomHerb();
  },
  methods: {
    selectRandomHerb() {
      // In a real application, this might involve an actual fetch() or axios.get() call
      // to an external API. For now, we pick from the internal array.
      const randomIndex = Math.floor(Math.random() * this.herbData.length);
      this.currentHerb = this.herbData[randomIndex];
      console.log('HerbPopUp: Selected random herb for display:', this.currentHerb.title);
    },
    closePopup() {
      // Emit a 'close' event to the parent component (App.vue)
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
/* Overlay that covers the entire screen */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top of everything else */
  backdrop-filter: blur(5px); /* Optional: blur background for a modern look */
}

/* Content box of the pop-up */
.popup-content {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
  animation: fadeInScale 0.3s ease-out forwards; /* Simple entry animation */
}

/* Close button styling */
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
  margin-bottom: 20px;
}

.popup-image-container {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.popup-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.popup-fact {
  font-style: italic;
  color: #777;
  font-size: 0.95rem;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

/* Animation for pop-up entry */
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
  .popup-content {
    padding: 20px;
  }
  .popup-title {
    font-size: 1.6rem;
  }
  .popup-description {
    font-size: 1rem;
  }
  .popup-image {
    height: 150px;
  }
}
</style>
