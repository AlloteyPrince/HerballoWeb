<template>
  <div class="site-wrapper">
    <Navigation />

    <main style="padding-top: 85px; min-height: 100vh">
      <slot />
    </main>

    <Appfooter />
  </div>
</template>

<script setup>
const route = useRoute();

const humanize = (segment) =>
  segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const breadcrumbSchema = computed(() => {
  const segments = route.path.split("/").filter(Boolean);
  const items = [{ name: "Home", item: `${SITE_URL}/` }];
  let acc = "";
  for (const segment of segments) {
    acc += `/${segment}`;
    items.push({ name: humanize(segment), item: `${SITE_URL}${acc}` });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
});

useJsonLd(() => breadcrumbSchema.value);
</script>
