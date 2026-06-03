<template>
  <div class="blog-page">
    <div class="blog-container">
      <header class="blog-header text-center">
        <h1 class="blog-title">Herballo Blog</h1>
        <p class="blog-subtitle">Natural wisdom, herbal knowledge, and wellness insights.</p>
      </header>

      <div class="blog-grid">
        <NuxtLink
          v-for="post in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="blog-card"
        >
          <div class="card-image">
            <img
              :src="post.coverImage"
              :alt="post.title"
              @error="(e) => (e.target.src = '/images/blog/placeholder.jpg')"
            />
            <span class="card-category">{{ post.category }}</span>
          </div>
          <div class="card-body">
            <p class="card-date">{{ formatDate(post.date) }}</p>
            <h2 class="card-title">{{ post.title }}</h2>
            <p class="card-excerpt">{{ post.excerpt }}</p>
            <span class="read-more">Read more →</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import posts from '~/data/blogs.json'

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

useHead({
  title: 'Blog | Herballo',
  meta: [{ name: 'description', content: 'Herbal medicine insights and natural wellness articles from Herballo.' }],
})
</script>

<style scoped lang="scss">
.blog-page {
  background: #fdfdfb;
  min-height: 100%;
  padding: 3rem 1rem;
}

.blog-container {
  max-width: 1100px;
  margin: 0 auto;
}

.blog-header {
  margin-bottom: 3rem;

  .blog-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #105212;
  }

  .blog-subtitle {
    color: #666;
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.blog-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .card-image {
    position: relative;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-category {
      position: absolute;
      top: 12px;
      left: 12px;
      background: #105212;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 20px;
    }
  }

  .card-body {
    padding: 1.5rem;

    .card-date {
      font-size: 0.8rem;
      color: #999;
      margin-bottom: 0.5rem;
    }

    .card-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 0.75rem;
      line-height: 1.4;
    }

    .card-excerpt {
      font-size: 0.88rem;
      color: #555;
      line-height: 1.6;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .read-more {
      font-size: 0.85rem;
      color: #105212;
      font-weight: 600;
    }
  }
}
</style>