<template>
  <div class="booking-scheduler">
    <h2>Book Your Appointment</h2>

    <!-- Date Selection -->
    <div class="form-group">
      <label for="date">Select Date</label>
      <input
        id="date"
        v-model="selectedDate"
        type="date"
        :min="todayDate"
        @change="onDateChange"
        class="form-control"
      />
    </div>

    <!-- Time Selection -->
    <div v-if="selectedDate" class="form-group">
      <label for="time">
        Available Times
        <span v-if="dayType" class="day-badge">
          {{ dayTypeLabel }}
        </span>
      </label>
      <select id="time" v-model="selectedTime" class="form-control">
        <option value="">Choose a time slot</option>
        <option v-for="slot in availableTimeSlots" :key="slot" :value="slot">
          {{ slot }}
        </option>
      </select>
    </div>

    <!-- Schedule Summary -->
    <div v-if="dayType" class="schedule-summary">
      <h3>{{ scheduleTitle }}</h3>
      <div class="time-slots">
        <span
          v-for="slot in availableTimeSlots"
          :key="slot"
          class="time-slot"
          :class="{ active: selectedTime === slot }"
        >
          {{ slot }}
        </span>
      </div>
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
  data() {
    return {
      selectedDate: "",
      selectedTime: "",
      timeSlots: {
        weekday: [
          "9-10am",
          "10-11am",
          "11-12pm",
          "1-2pm",
          "2-3pm",
          "3-4pm",
          "4-5pm",
          "7-8pm",
        ],
        saturday: ["9-10am", "10-11am", "11-12pm"],
        sunday: ["1-2pm", "2-3pm", "3-4pm", "4-5pm", "7-8pm"],
      },
    };
  },
  computed: {
    todayDate() {
      return new Date().toISOString().split("T")[0];
    },
    dayType() {
      if (!this.selectedDate) return null;
      const day = new Date(this.selectedDate).getDay();
      if (day === 0) return "sunday";
      if (day === 6) return "saturday";
      return "weekday";
    },
    dayTypeLabel() {
      return {
        weekday: "Weekday",
        saturday: "Saturday",
        sunday: "Sunday",
      }[this.dayType] || "";
    },
    availableTimeSlots() {
      return this.dayType ? this.timeSlots[this.dayType] : [];
    },
    scheduleTitle() {
      return {
        weekday: "Weekday Schedule (Mon–Fri)",
        saturday: "Saturday Schedule",
        sunday: "Sunday Schedule",
      }[this.dayType] || "";
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
  methods: {
    onDateChange() {
      this.selectedTime = "";
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

@media (max-width: 600px) {
  .booking-scheduler {
    padding: 16px;
  }
}

h2 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #14532d;
  text-align: center;
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

.day-badge {
  background: #bbf7d0;
  color: #166534;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
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
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
}

.schedule-summary {
  background: #f0fdf4;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.schedule-summary h3 {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #14532d;
}

.time-slots {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.time-slot {
  padding: 6px 10px;
  background: #ffffff;
  border: 1px solid #d1fae5;
  border-radius: 4px;
  font-size: 13px;
  color: #065f46;
  cursor: pointer;
  transition: all 0.2s ease;
}

.time-slot.active {
  background: #22c55e;
  color: white;
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
