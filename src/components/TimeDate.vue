<template>
  <div class="booking-scheduler">
    <!-- Date Picker -->
    <div class="form-group">
      <label for="date">Select Date *</label>
      <input
        id="date"
        type="date"
        class="form-control"
        :min="minDate"
        :value="selectedDate"
        @input="onDateInput"
        required
      />
    </div>

    <!-- Time Slots -->
    <div v-if="selectedDate && availableTimeSlots.length" class="form-group">
      <label for="time">Select Time *</label>
      <select
        id="time"
        class="form-control"
        :value="selectedTime"
        @change="onTimeInput"
        required
      >
        <option value="">Select a time slot</option>
        <option v-for="slot in availableTimeSlots" :key="slot" :value="slot">
          {{ slot }}
        </option>
      </select>
    </div>

    <!-- Booking Summary -->
    <div v-if="selectedDate && selectedTime" class="booking-summary">
      <h3>Booking Summary</h3>
      <p>{{ formattedDate }} at {{ selectedTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConditionalTimeSlots",
  props: {
    date: String,
    time: String,
    minDate: String,
    availableSlots: {
      type: Array,
      default: () => [],
    },
    loading: Boolean,
  },
  data() {
    return {
      selectedDate: this.date || "",
      selectedTime: this.time || "",
      timeSlots: {
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
      },
    };
  },
  computed: {
    dayType() {
      if (!this.selectedDate) return null;
      const day = new Date(this.selectedDate).getDay();
      if (day === 0) return "sunday";
      if (day === 6) return "saturday";
      return "weekday";
    },
    availableTimeSlots() {
      if (this.availableSlots && this.availableSlots.length) {
        return this.availableSlots.map((slot) =>
          typeof slot === "string" ? slot : slot.value
        );
      }
      return this.dayType ? this.timeSlots[this.dayType] : [];
    },
    formattedDate() {
      return this.selectedDate
        ? new Date(this.selectedDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "";
    },
  },
  watch: {
    date(newVal) {
      if (newVal !== this.selectedDate) {
        this.selectedDate = newVal || "";
      }
    },
    time(newVal) {
      if (newVal !== this.selectedTime) {
        this.selectedTime = newVal || "";
      }
    },
    selectedDate(newVal, oldVal) {
      if (newVal !== this.date) {
        this.$emit("update:date", newVal);
        this.selectedTime = ""; // Reset time when date changes
      }
    },
    selectedTime(newVal) {
      if (newVal !== this.time) {
        this.$emit("update:time", newVal);
      }
    },
  },
  methods: {
    onDateInput(e) {
      this.selectedDate = e.target.value;
    },
    onTimeInput(e) {
      this.selectedTime = e.target.value;
    },
  },
};
</script>

<style scoped>
.booking-scheduler {
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #166534;
}
.form-control {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1fae5;
  border-radius: 6px;
  font-size: 14px;
  transition: 0.2s border-color;
}
.form-control:focus {
  outline: none;
  border-color: #22c55e;
}
.booking-summary {
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 16px;
  border-radius: 6px;
}
.booking-summary h3 {
  font-size: 15px;
  font-weight: 600;
  color: #064e3b;
  margin-bottom: 8px;
}
.booking-summary p {
  font-size: 14px;
  color: #065f46;
}
</style>
