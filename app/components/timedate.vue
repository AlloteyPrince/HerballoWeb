<template>
  <div class="booking-scheduler">
    <!-- Date Picker -->
    <div class="form-group">
      <label for="date">Preferred Date *</label>
      <input
        id="date"
        type="date"
        class="date-input"
        :min="minDate"
        :value="date"
        @input="$emit('update:date', $event.target.value)"
        required
      />
    </div>

    <!-- Time of Day Selector -->
    <div v-if="date" class="form-group">
      <label>Preferred Time of Day *</label>
      <div class="period-selector">
        <button
          v-for="period in periods"
          :key="period.value"
          type="button"
          class="period-btn"
          :class="{ active: selectedPeriod === period.value }"
          @click="selectPeriod(period.value)"
        >
          <span class="period-icon">{{ period.icon }}</span>
          <span class="period-label">{{ period.label }}</span>
          <span class="period-hint">{{ period.hint }}</span>
        </button>
      </div>
    </div>

    <!-- Selected Summary -->
    <div v-if="date && selectedPeriod" class="schedule-summary">
      <span class="summary-icon">📅</span>
      <div>
        <p class="summary-date">{{ formattedDate }}</p>
        <p class="summary-time">{{ periodLabel }} — we'll confirm your exact time within 24 hrs</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  date: String,
  time: String,
  minDate: String,
})

const emit = defineEmits(['update:date', 'update:time'])

const periods = [
  { value: 'morning',   icon: '🌅', label: 'Morning',   hint: 'Before noon' },
  { value: 'afternoon', icon: '☀️',  label: 'Afternoon', hint: '12pm – 5pm' },
  { value: 'evening',   icon: '🌙', label: 'Evening',   hint: 'After 5pm' },
]

const selectedPeriod = ref(props.time || '')

const selectPeriod = (value) => {
  selectedPeriod.value = value
  emit('update:time', value)
}

const formattedDate = computed(() => {
  if (!props.date) return ''
  // Fix timezone offset issue with date-only strings
  const [y, m, d] = props.date.split('-')
  return new Date(+y, +m - 1, +d).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const periodLabel = computed(() => {
  return periods.find(p => p.value === selectedPeriod.value)?.label || ''
})
</script>

<style scoped lang="scss">
.booking-scheduler {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-weight: 700;
    color: #334155;
    margin-bottom: 0.6rem;
    font-size: 0.9rem;
  }
}

.date-input {
  width: 100%;
  padding: 1rem 1.2rem;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: #fff;
  font-size: 1rem;
  color: #1e293b;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover { border-color: #105212; }
  &:focus {
    outline: none;
    border-color: #105212;
    box-shadow: 0 0 0 4px rgba(16, 82, 18, 0.1);
  }
}

.period-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.period-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 1.2rem 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  .period-icon {
    font-size: 1.6rem;
    line-height: 1;
  }
  .period-label {
    font-weight: 700;
    font-size: 0.9rem;
    color: #334155;
  }
  .period-hint {
    font-size: 0.75rem;
    color: #94a3b8;
  }

  &:hover {
    border-color: #105212;
    background: #f0f7f0;
  }

  &.active {
    border-color: #105212;
    background: #105212;

    .period-label { color: #fff; }
    .period-hint  { color: rgba(255,255,255,0.7); }
  }
}

.schedule-summary {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f0f7f0;
  border: 1px solid #c6e6c7;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin-top: 0.5rem;

  .summary-icon { font-size: 1.5rem; }

  .summary-date {
    font-weight: 700;
    color: #105212;
    font-size: 0.95rem;
    margin: 0 0 2px;
  }
  .summary-time {
    font-size: 0.82rem;
    color: #475569;
    margin: 0;
  }
}

@media (max-width: 480px) {
  .period-selector {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
  }
  .period-btn {
    padding: 0.9rem 0.4rem;
    .period-icon  { font-size: 1.3rem; }
    .period-label { font-size: 0.8rem; }
    .period-hint  { display: none; }
  }
}
</style>