<template>
  <div class="layered-card">
    <img :src="imageUrl" :alt="imageAlt" class="card-image" onerror="this.onerror=null;this.src='https://placehold.co/600x400/CCCCCC/333333?text=Image+Missing';" />

    <div class="layered-content-container">
      <div class="layered-shape-behind"></div>

      <div class="layered-shape-front">
        <div class="layered-text-content">
          <h3 class="card-title">{{ title }}</h3>
          <p class="card-description">{{ description }}</p>
          <button v-if="buttonText" class="card-button">{{ buttonText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayeredCard',
  props: {
    imageUrl: {
      type: String,
      required: true,
      default: 'https://placehold.co/600x400/CCCCCC/333333?text=Default+Image',
    },
    imageAlt: {
      type: String,
      default: 'Card image',
    },
    title: {
      type: String,
      required: true,
      default: 'Layered Card Title',
    },
    description: {
      type: String,
      required: true,
      default: 'This is a description for the layered card, providing more details about the content or product featured.',
    },
    buttonText: {
      type: String,
      default: '', // Optional button text
    },
  },
};
</script>

<style scoped>
/* Base container for the entire layered card */
.layered-card {
  position: relative; /* Establishes positioning context for its children */
  width: 100%;
  max-width: 600px; /* Max width for the card */
  margin: 40px auto; /* Center the card and add some vertical spacing */
  background-color: #f8f8f8; /* Light background for the card itself */
  border-radius: 12px;
  overflow: hidden; /* Ensures nothing spills out of the rounded corners */
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15); /* Deeper shadow for the whole card */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px; /* Space below the content container */
}

/* Styling for the main image */
.card-image {
  width: 100%;
  height: 250px; /* Fixed height for the image */
  object-fit: cover; /* Ensures the image covers the area without distortion */
  border-radius: 12px 12px 0 0; /* Rounded top corners */
}

/* Container for the two layered shapes and text */
.layered-content-container {
  position: absolute; /* Positioned relative to .layered-card */
  bottom: -30px; /* Adjust to control how much it overlaps the image */
  width: 90%; /* Controls the width of the layered shapes */
  max-width: 500px;
  min-height: 200px; /* Minimum height for the content area */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px; /* Padding around the inner shapes */
}

/* The shape/rectangle behind the main content */
.layered-shape-behind,
.layered-shape-front {
  position: absolute; /* Positioned relative to .layered-content-container */
  border-radius: 10px; /* Rounded corners for both shapes */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
}

.layered-shape-behind {
  background-color: rgba(173, 216, 230, 0.6); /* Light blue, semi-transparent */
  width: 100%;
  height: 100%;
  top: 15px; /* Offset down */
  left: 15px; /* Offset right */
  z-index: 1; /* Behind the front shape */
}

/* The main shape/rectangle holding the text content */
.layered-shape-front {
  background-color: rgba(255, 255, 255, 0.98); /* White, almost opaque */
  width: 95%; /* Slightly smaller than the behind one */
  height: 95%;
  top: 0;
  left: 0;
  z-index: 2; /* In front of the behind shape */
  display: flex; /* Use flexbox to center content inside */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px; /* Padding inside the front shape */
  box-sizing: border-box; /* Include padding in width/height */
}

/* Styling for the text content within the front shape */
.layered-text-content {
  text-align: center;
  color: #333;
  max-width: 450px; /* Constrain text width for readability */
}

.card-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: #2c3e50;
}

.card-description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
}

.card-button {
  background-color: #4CAF50; /* Green */
  color: white;
  padding: 12px 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-button:hover {
  background-color: #45a049;
  transform: translateY(-2px); /* Slight lift effect on hover */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .layered-card {
    margin: 20px auto;
    width: 95%;
  }

  .card-image {
    height: 200px;
  }

  .layered-content-container {
    bottom: -20px;
    width: 95%;
    min-height: 180px;
  }

  .layered-shape-behind {
    top: 10px;
    left: 10px;
  }

  .layered-shape-front {
    padding: 20px;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .card-description {
    font-size: 0.9rem;
  }

  .card-button {
    padding: 10px 20px;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .layered-card {
    margin: 15px auto;
  }

  .card-image {
    height: 180px;
  }

  .layered-content-container {
    bottom: -15px;
    width: 98%;
    min-height: 150px;
  }

  .layered-shape-behind {
    top: 8px;
    left: 8px;
  }

  .layered-shape-front {
    padding: 15px;
  }

  .card-title {
    font-size: 1.3rem;
  }
}
</style>
