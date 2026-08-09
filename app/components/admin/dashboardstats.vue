<template>
  <div class="dashboard-stats">
    <div v-if="pending" class="loading">Loading dashboard...</div>
    <div v-else-if="error" class="loading">Failed to load dashboard stats.</div>

    <template v-else>
      <div class="kpi-row">
        <div class="kpi-tile">
          <span class="kpi-label">Blog Posts</span>
          <span class="kpi-value">{{ stats.blogPosts.total }}</span>
          <span class="kpi-sub">{{ stats.blogPosts.published }} published</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">Plant Library</span>
          <span class="kpi-value">{{ stats.plants }}</span>
          <span class="kpi-sub">species documented</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">Consultation Requests</span>
          <span class="kpi-value">{{ stats.bookings }}</span>
          <span class="kpi-sub">total bookings</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">Newsletter Subscribers</span>
          <span class="kpi-value">{{ stats.subscribers.total }}</span>
          <span class="kpi-sub">{{ stats.subscribers.active }} active</span>
        </div>
      </div>

      <div class="chart-card" v-if="stats.postsByTopic.length">
        <h3 class="chart-title">Blog Posts by Topic</h3>
        <div class="bar-chart">
          <div v-for="row in stats.postsByTopic" :key="row.label" class="bar-row">
            <span class="bar-label">{{ row.label }}</span>
            <div class="bar-track">
              <div
                class="bar-fill"
                :style="{ width: (row.count / maxCount) * 100 + '%' }"
                :title="`${row.label}: ${row.count} post${row.count === 1 ? '' : 's'}`"
              ></div>
            </div>
            <span class="bar-value">{{ row.count }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
const { data: stats, pending, error } = await useAsyncData('admin-dashboard-stats', () =>
  adminFetch('/api/admin/stats')
);

const maxCount = computed(() => Math.max(1, ...(stats.value?.postsByTopic || []).map((r) => r.count)));
</script>

<style scoped>
.dashboard-stats {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.loading {
  color: #64748b;
  padding: 20px 0;
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.kpi-tile {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.kpi-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.kpi-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
}

.kpi-sub {
  font-size: 0.8rem;
  color: #94a3b8;
}

.chart-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.chart-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 20px;
}

.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bar-row {
  display: grid;
  grid-template-columns: 140px 1fr 32px;
  align-items: center;
  gap: 12px;
}

.bar-label {
  font-size: 0.85rem;
  color: #52514e;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bar-track {
  background: #f1f5f1;
  border-radius: 4px;
  height: 20px;
  position: relative;
}

.bar-fill {
  background: #2a78d6;
  height: 100%;
  border-radius: 4px;
  min-width: 4px;
  transition: width 0.4s ease;
}

.bar-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1e293b;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 640px) {
  .bar-row {
    grid-template-columns: 90px 1fr 28px;
  }
}
</style>
