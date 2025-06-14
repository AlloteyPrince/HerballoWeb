<template>
  <div>
    <div id="blog" class="container">
      <div class="blogvisit">
        <p class="blog-visit"><a href="">Our Research</a></p>
      </div>

      <div class="blogspace" @mouseenter="pauseScroll" @mouseleave="resumeScroll" @touchstart="pauseScroll" @touchend="resumeScroll">
        <div class="blog-track" :class="{ 'is-paused': isScrollingPaused }">
          <!-- Duplicate content for infinite scroll effect -->
          <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt="Hypertension Research Logo" /></div>
            <div class="texts">
              <p class="box-text">Hypertension Research</p>
              <p class="box-text2">We found that ...</p>
            </div>
          </div>

          <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt="Cancer Research Logo" /></div>
            <div class="texts">
              <p class="box-text">Cancer Research</p>
              <p class="box-text2">We found that ...</p>
            </div>
          </div>

          <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt="Diabetes Research Logo" /></div>
            <div class="texts">
              <p class="box-text">Diabetes Research</p>
              <p class="box-text2">We found that ...</p>
            </div>
          </div>

          <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt="Arthritis Research Logo" /></div>
            <div class="texts">
              <p class="box-text">Arthritis Research</p>
              <p class="box-text2">We found that ...</p>
            </div>
          </div>

          <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt="Products Research Logo" /></div>
            <div class="texts">
              <p class="box-text">Products Research</p>
              <p class="box-text2">We found that ...</p>
            </div>
          </div>

          <!-- DUPLICATED CONTENT FOR SEAMLESS LOOPING -->
          <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt="Hypertension Research Logo" /></div>
            <div class="texts">
              <p class="box-text">Hypertension Research</p>
              <p class="box-text2">We found that ...</p>
            </div>
          </div>

          <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt="Cancer Research Logo" /></div>
            <div class="texts">
              <p class="box-text">Cancer Research</p>
              <p class="box-text2">We found that ...</p>
            </div>
          </div>

          <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt="Diabetes Research Logo" /></div>
            <div class="texts">
              <p class="box-text">Diabetes Research</p>
              <p class="box-text2">We found that ...</p>
            </div>
          </div>

          <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt="Arthritis Research Logo" /></div>
            <div class="texts">
              <p class="box-text">Arthritis Research</p>
              <p class="box-text2">We found that ...</p>
            </div>
          </div>

          <div class="box">
            <div class="inner-box"><img class="img-box" src="../images/logo-blog.jpg" alt="Products Research Logo" /></div>
            <div class="texts">
              <p class="box-text">Products Research</p>
              <p class="box-text2">We found that ...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blogspace",
  data() {
    return {
      isScrollingPaused: false,
    };
  },
  methods: {
    pauseScroll() {
      this.isScrollingPaused = true;
    },
    resumeScroll() {
      this.isScrollingPaused = false;
    },
  },
};
</script>

<style scoped>
/* Scoped styles ensure these styles only apply to this component */
.container {
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 6rem 0; /* Updated: 6rem top and bottom padding for desktop */
}

.blogvisit {
  margin-bottom: 2rem; /* Add some space below the "Our Research" link */
  color: #105212;
}

.blog-visit a {
  font-weight: 800; /* Made bolder, matching services header */
  font-size: 3em; /* Larger font size, matching services header */
  color: rgb(1, 59, 1); /* Dark green color, matching services header */
  text-decoration: none; /* Remove default underline */
  transition: color 0.3s ease;
}

.blog-visit a:hover {
  color: #666; /* Lighten color on hover */
}

.blog-visit a:visited {
  color: #666; /* Visited link color to match grey */
}

.blogspace {
  width: 80%; /* Container width for desktop cards */
  overflow: hidden; /* Hide scrollbar */
  position: relative; /* Needed for positioning the inner track relative to this */
}

.blog-track {
  display: flex;
  white-space: nowrap; /* Keep items in a single line */
  animation: scroll-left 40s linear infinite; /* Adjusted duration for smoother effect with duplicated content */
}

.blog-track.is-paused {
  animation-play-state: paused;
}

/* Keyframe animation for continuous horizontal scroll (Desktop) */
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    /* Translate by exactly half the total content width for seamless loop */
    /* Calculation: (5 boxes * 200px width) + (4 gaps * 1.5rem (24px)) = 1000 + 96 = 1096px */
    transform: translateX(-1096px); /* Value for 5 boxes + gaps on desktop */
  }
}

.box {
  height: auto; /* Allow height to adjust based on content */
  min-height: 180px; /* Maintain a minimum height */
  background-color: #ffffff;
  border-radius: 20px;
  overflow: hidden; /* Ensures content stays within rounded corners */
  border: 2px solid white; /* White border */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Keep a default shadow */
  transition: box-shadow ease-in-out 0.3s; /* Only transition shadow */
  display: flex; /* Make box a flex container for its contents */
  flex-direction: column; /* Stack contents vertically */
  width: 200px; /* Fixed width for each box on desktop */
  margin-right: 1.5rem; /* Gap between boxes on desktop */
  flex-shrink: 0; /* Prevent boxes from shrinking */
}

.box:hover {
  box-shadow: 0 10px 20px rgb(197, 197, 197); /* Enhanced shadow on hover */
}

.inner-box {
  flex-shrink: 0; /* Prevent image container from shrinking */
}

.img-box {
  height: 120px;
  width: 100%;
  object-fit: cover; /* Cover the area, cropping if necessary */
  display: block; /* Remove extra space below image */
  border-radius: 20px 20px 0 0; /* Apply border-radius only to top corners */
}

.texts {
  padding: 10px; /* Padding for the text content */
  flex-grow: 1; /* Allow text content to take remaining space */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center text vertically within its container */
}

.box p {
  text-align: center;
  color: rgb(15, 32, 20);
  margin: 0; /* Remove default paragraph margins */
  white-space: normal; /* Allow text to wrap within the box */
}

.box-text {
  font-weight: bold;
}

.box-text2 {
  font-size: 0.8rem;
}

/* Media Query for Mobile View */
@media screen and (max-width: 800px) {
  .container {
    width: 100%; /* Full width container on mobile */
    padding: 2rem 0; /* Revert to 2rem padding for mobile */
  }

  .blogspace {
    width: 100%; /* Make blogspace take full viewport width */
    padding: 0 0.5rem; /* Reduced horizontal padding on the blogspace for mobile */
    /* Keep flex behavior, but ensure items don't wrap */
    gap: 1rem; /* Reduced gap between boxes for mobile */
    /* Removed fixed height for mobile, will expand vertically */
  }

  .blog-track {
    animation-duration: 25s; /* Faster scroll on smaller screens */
  }

  /* Keyframe animation for continuous horizontal scroll (Mobile) */
  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      /* Re-calculate based on mobile box width and gap */
      /* Assuming 5 boxes of 160px + 4 gaps of 1rem (16px) = (5 * 160) + (4 * 16) = 800 + 64 = 864px */
      transform: translateX(-864px); /* Adjusted value for mobile boxes + gaps */
    }
  }

  .box {
    width: 160px; /* Reduced fixed width for mobile boxes */
    min-height: 240px; /* Increased min-height to further ensure bottom content is visible */
    margin-right: 1rem; /* Gap between boxes for mobile */
  }

  .img-box {
    height: 100px; /* Smaller image height on mobile */
  }

  .texts {
    padding: 8px; /* Slightly less padding for text on mobile */
  }

  .box-text2 {
    font-size: 0.75rem; /* Slightly smaller font size for description on mobile */
  }

  .blog-visit a {
    font-size: 2rem; /* Larger font size for mobile heading to match desktop */
  }
}
</style>
