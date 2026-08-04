<template>
  <div>
    <div class="blog-header">
      <h2>Manage Blog Posts</h2>
      <button @click="showForm = !showForm" class="btn-toggle">
        {{ showForm ? "← Back to Blog List" : "➕ Add New Blog" }}
      </button>
    </div>

    <div v-if="showForm">
      <AdminBlogForm @postCreated="onPostCreated" />
    </div>

    <div v-else>
      <AdminBlogList :refreshKey="refreshKey" />
    </div>
  </div>
</template>

<script setup>
const showForm = ref(false);
const refreshKey = ref(0);

const onPostCreated = () => {
  showForm.value = false;
  refreshKey.value += 1; // This triggers the List to refresh
};
</script>