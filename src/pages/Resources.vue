<template>
  <Navigation />
  <div class="resources-page">
    <h1 class="main-title">
      🌿 Herbal Medicine 101: Your Beginner's Guide to Natural Remedies
    </h1>

    <p class="intro-text">
      Welcome to your foundational resource for starting your natural health
      journey. We've compiled the **Herbal Medicine 101** handbook to make
      traditional wellness simple, safe, and accessible for everyone. Whether
      you're curious about african herbs like Moringa and Scent Leaf or just
      want to learn how to soothe a common cold naturally, this guide has you
      covered.
    </p>

    <ul class="benefit-list">
      <li>✅ Simple preparation methods for teas and infusions.</li>
      <li>✅ A quick-reference guide to **safe uses** for common herbs.</li>
      <li>✅ Practical, easy-to-understand advice for beginners.</li>
      <li>
        ✅ Local focus: Learn about the potent herbs found in your community.
      </li>
    </ul>

    <a
      :href="pdfUrl"
      target="_blank"
      class="download-button"
      @click="trackDownload"
    >
      📥 Download the FREE Herbal Medicine 101 Guide (PDF)
    </a>

    <div class="pdf-preview-container">
      <img
        src="/public/resources/HERBAAL MEDIDINE 101 copy.jpg"
        alt="Preview of the Herbal Medicine 101 Guide cover"
        class="pdf-preview-img"
      />
    </div>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation.vue';

export default {
  name: "Resources",
  data() {
    return {
      // **IMPORTANT:** Replace this URL with the actual path where you uploaded your PDF
      pdfUrl: "/resources/herbal-medicine-101-guide.pdf",
    };
  },
  methods: {
    trackDownload() {
      console.log("Download button clicked. Tracking event...");
    },
  },
  metaInfo: {
    title: "Herbal Medicine 101: FREE Beginner Guide & PDF Download",
    meta: [
      {
        name: "description",
        content:
          "Download your FREE **Herbal Medicine 101** PDF course. A beginner-friendly guide to natural remedies, African herbs (Moringa, Scent Leaf), and home preparation methods.",
      },
      {
        name: "keywords",
        content:
          "herbal medicine 101, natural remedies, beginner herbal course, african herbs, moringa, scent leaf, free pdf guide",
      },
    ],
  },
};
</script>
<style scoped>
.resources-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
}

.main-title {
  color: #008000; /* Green color for the herbal theme */
  font-size: 2.5em;
  margin-bottom: 0.5em;
}

.intro-text {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 25px;
}

.benefit-list {
  list-style-type: none;
  padding: 0;
  text-align: left;
  margin: 30px auto;
  max-width: 500px;
}

.benefit-list li {
  margin-bottom: 10px;
  font-size: 1em;
  color: #333;
}

/* Make the button impossible to ignore */
.download-button {
  display: inline-block;
  background-color: #006400; /* Darker green */
  color: white;
  padding: 15px 30px;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.download-button:hover {
  background-color: #004d00;
}

.pdf-preview-img {
  width: 100%;
  max-width: 400px;
  margin-top: 40px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
