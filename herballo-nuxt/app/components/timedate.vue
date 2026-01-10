<template>
  <div class="booking-scheduler">
    <div class="form-group">
      <label for="date">Select Date *</label>
      <input
        id="date"
        type="date"
        class="form-control"
        :min="minDate"
        :value="date"
        @input="$emit('update:date', $event.target.value)"
        required
      />
    </div>

    <div v-if="date && availableTimeSlots.length" class="form-group">
      <label for="time">Select Time *</label>
      <select
        id="time"
        class="form-control"
        :value="time"
        @change="$emit('update:time', $event.target.value)"
        required
      >
        <option value="">Select a time slot</option>
        <option v-for="slot in availableTimeSlots" :key="slot" :value="slot">
          {{ slot }}
        </option>
      </select>
    </div>

    <div v-if="date && time" class="booking-summary">
      <h3>Selected Schedule</h3>
      <p>{{ formattedDate }} at {{ time }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  date: String,
  time: String,
  minDate: String,
  availableSlots: {
    type: Array,
    default: () => [],
  },
  loading: Boolean,
});

const emit = defineEmits(["update:date", "update:time"]);

const timeSlots = {
  weekday: [
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "19:00-20:00",
  ],
  saturday: ["09:00-10:00", "10:00-11:00", "11:00-12:00"],
  sunday: [
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "19:00-20:00",
  ],
};

const dayType = computed(() => {
  if (!props.date) return null;
  const day = new Date(props.date).getDay();
  if (day === 0) return "sunday";
  if (day === 6) return "saturday";
  return "weekday";
});

const availableTimeSlots = computed(() => {
  // If backend provides specific slots, use them; otherwise, use defaults
  if (props.availableSlots && props.availableSlots.length > 0) {
    return props.availableSlots.map((slot) =>
      typeof slot === "string" ? slot : slot.value
    );
  }
  return dayType.value ? timeSlots[dayType.value] : [];
});

const formattedDate = computed(() => {
  if (!props.date) return "";
  return new Date(props.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

<style scoped>
.booking-scheduler {
  width: 100%;
  padding: 1.5rem;
  background: #fdfdfb;
  border: 1px solid #e8f5e8;
  border-radius: 12px;
}
.form-group {
  margin-bottom: 1.5rem;
}
label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #105212;
}
.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}
.form-control:focus {
  outline: none;
  border-color: #105212;
}
.booking-summary {
  background: #e8f5e8;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}
.booking-summary h3 {
  font-size: 0.9rem;
  color: #105212;
  margin-bottom: 4px;
}
.booking-summary p {
  font-size: 0.85rem;
  color: #333;
  font-weight: 600;
}
</style>
