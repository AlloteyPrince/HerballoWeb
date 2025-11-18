<template>
  <section class="why-herballo-section">
    <div class="why-herballo-container">
      <h2 class="why-herballo-heading">Why Herballo?</h2>

      <div class="why-herballo-content-wrapper">
        <span class="apostrophe-open"> &lsquo; </span>

        <p class="why-herballo-text">
          Herballo is a modern herbal wellness brand rooted in African healing
          traditions and backed by evidence-based insights. We help you restore
          balance, detox naturally, and support long-term health using trusted
          herbal remedies. In a world of quick fixes, Herballo offers safe,
          personalized, and holistic care that works from the inside out. Choose
          Herballo for personalized care, authentic herbal expertise, and a
          commitment to holistic health that puts you first.
        </p>

        <span class="apostrophe-close"> &rsquo; </span>

        <br />

        <div class="youtubevideoforherballo">
          <div class="video-trigger" @click="openLightbox">
            <p>Watch this video about Herballo (Click to watch full screen)</p>

            <div class="video-container">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/-o8urc2dULs"
                title="YouTube video player"
                frameborder="0"
                allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin"
                allow="picture-in-picture; web-share"
                style="pointer-events: none"
              >
              </iframe>
              <div class="play-overlay">&#9658;</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="video-lightbox" :class="{ 'lightbox-overlay': true, 'visible': isLightboxOpen }">
      <div class="lightbox-content">
        <span class="close-button" @click="closeLightbox">&times;</span>
        
        <div class="video-wrapper">
          <iframe 
              v-if="isLightboxOpen"
              width="100%" 
              height="100%" 
              :src="lightboxVideoSrc" 
              title="Full Screen Video" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "WhyHerballo",
  data() {
    return {
      isLightboxOpen: false,
      videoID: '-o8urc2dULs',
    };
  },
  computed: {
    // Computes the video source URL with autoplay enabled for the lightbox
    lightboxVideoSrc() {
      // Return null or an empty string if closed to prevent the iframe from loading
      if (!this.isLightboxOpen) return '';
      return `https://www.youtube.com/embed/${this.videoID}?autoplay=1`;
    }
  },
  methods: {
    openLightbox() {
      this.isLightboxOpen = true;
      // Prevent scrolling on the main page while the video is open
      document.body.style.overflow = 'hidden';
    },
    closeLightbox() {
      this.isLightboxOpen = false;
      // Resume scrolling on the main page
      document.body.style.overflow = '';
      // Vue handles stopping the video by removing the iframe when isLightboxOpen is false
    }
  }
});
</script>

<style scoped>
/* --- EXISTING STYLES (TRUNCATED FOR BREVITY) --- */
/*
  .why-herballo-section, .why-herballo-container, 
  .why-herballo-heading, .why-herballo-content-wrapper, 
  .apostrophe-open, .why-herballo-text, .apostrophe-close, 
  (etc.) should remain as they were.
*/

/* ------------------------------------------------ */
/* --- NEW LIGHTBOX AND VIDEO-TRIGGER STYLES HERE --- */
/* ------------------------------------------------ */

.video-trigger {
  /* This makes the whole area clickable and shows a pointer */
  cursor: pointer;
  /* Use relative positioning for the play overlay */
  position: relative;
  display: block; /* Ensure the div acts like a block element */
}

/* Ensure the thumbnail video is not interactive */
.video-container iframe {
  pointer-events: none;
}

/* Play Icon Overlay for the "Thumbnail" */
.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem; /* Large play button */
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4); /* Subtle darkening */
  pointer-events: none; /* Crucial: ensures click goes to the parent .video-trigger */
  transition: background-color 0.2s;
}

.video-trigger:hover .play-overlay {
  background-color: rgba(0, 0, 0, 0.6); /* Darker hover effect */
}


/* --- LIGHTBOX STYLES --- */

/* 1. The Lightbox Overlay (Hidden by default) */
.lightbox-overlay {
    /* Fixed position ensures it covers the entire viewport */
    position: fixed; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* The blackout effect: semi-transparent black */
    background-color: rgba(0, 0, 0, 0.95); 
    /* Place it above all other content */
    z-index: 9999; 
    /* Center the content */
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Initially hide the lightbox with transitions */
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s, visibility 0s 0.3s;
}

/* 2. Make it Visible */
.lightbox-overlay.visible {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s; /* Show instantly, hide after opacity transition */
}

/* 3. The Content Box (Holds the iFrame) */
.lightbox-content {
    /* Define the size of the video window */
    position: relative;
    width: 90%; /* Max width on small screens */
    max-width: 1000px; /* Example max width on large screens */
    height: auto;
}

/* 4. Aspect Ratio Wrapper for the Video */
.video-wrapper {
    position: relative;
    width: 100%;
    /* Maintains a 16:9 aspect ratio */
    padding-bottom: 56.25%; 
    height: 0;
}

/* 5. Make the iFrame fill the content box */
.video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/* 6. Close Button Style */
.close-button {
    position: absolute;
    top: -40px; /* Position it above the video content */
    right: 0px; 
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    z-index: 10000; /* Ensure it is clickable */
    line-height: 1;
}

/* Adjust close button for smaller screens */
@media (max-width: 600px) {
    .close-button {
        top: 0px; /* Moves it into the corner of the screen for better tapping */
        right: 10px;
        font-size: 30px;
    }
}
</style>