<template>
  <div class="post-page">
    <div class="post-container">

      <NuxtLink to="/blog" class="back-link">← Back to Blog</NuxtLink>

      <div v-if="post">
        <div class="post-hero">
          <img :src="post.coverImage" :alt="post.title"
            @error="(e) => (e.target.src = '/images/blog/placeholder.jpg')" />
        </div>

        <div class="post-meta">
          <span class="post-category">{{ post.category }}</span>
          <span class="post-date">{{ formatDate(post.date) }}</span>
          <span class="post-author">By {{ post.author }}</span>
        </div>

        <h1 class="post-title">{{ post.title }}</h1>
        <p class="post-excerpt">{{ post.excerpt }}</p>

        <div class="post-content">
          <template v-for="(block, i) in post.content" :key="i">
            <h2 v-if="block.type === 'heading'" class="content-heading">
              {{ block.text }}
            </h2>
            <p v-else-if="block.type === 'paragraph'" class="content-paragraph">
              {{ block.text }}
            </p>
          </template>
        </div>
      </div>

      <div v-else class="not-found">
        <p>Post not found.</p>
        <NuxtLink to="/blog">← Back to Blog</NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import posts from '~/data/blogs.json'

const route = useRoute()
const post = posts.find((p) => p.slug === route.params.slug)

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

useHead({
  title: post ? `${post.title} | Herballo` : 'Post Not Found | Herballo',
  meta: [{ name: 'description', content: post?.excerpt || '' }],
})
</script>

<style scoped lang="scss">
.post-page {
  background: #fdfdfb;
  padding: 3rem 1rem;
}

.post-container {
  max-width: 780px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  color: #105212;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.post-hero {
  width: 100%;
  height: 380px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #888;

  .post-category {
    background: #105212;
    color: white;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
  }
}

.post-title {
  font-size: 2rem;
  font-weight: 800;
  color: #105212;
  line-height: 1.3;
  margin-bottom: 1rem;
}

.post-excerpt {
  font-size: 1.05rem;
  color: #555;
  line-height: 1.7;
  border-left: 4px solid #105212;
  padding-left: 1rem;
  margin-bottom: 2rem;
  font-style: italic;
}

.post-content {
  .content-heading {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 2rem 0 0.75rem;
  }

  .content-paragraph {
    font-size: 0.97rem;
    color: #444;
    line-height: 1.8;
    margin-bottom: 1.2rem;
  }
}

.not-found {
  text-align: center;
  padding: 4rem 0;
  color: #666;
}
</style>