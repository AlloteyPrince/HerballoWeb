<template>
  <div>
    <Splashscreen />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Keeping these global so they work on all pages */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease-in-out;
}

.page-enter-from {
  opacity: 0;
  /* transform: translateY(10px); */
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Global Body Styles */
body {
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
}
</style>
