// Vue.js component for Google Calendar availability checking

<template>
  <div class="booking-calendar">
    <h2>Book an Appointment</h2>
    
    <!-- Date Picker -->
    <div class="date-selection">
      <label>Select Date:</label>
      <input 
        type="date" 
        v-model="selectedDate" 
        :min="minDate"
        @change="checkAvailability"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      Checking availability...
    </div>

    <!-- Time Slots -->
    <div v-if="!loading && availableSlots.length" class="time-slots">
      <h3>Available Times for {{ formatDate(selectedDate) }}</h3>
      <div class="slots-grid">
        <button
          v-for="slot in availableSlots"
          :key="slot.time"
          :class="['time-slot', { 'selected': selectedTime === slot.time }]"
          :disabled="!slot.available"
          @click="selectTime(slot)"
        >
          <span class="time">{{ slot.time }}</span>
          <span v-if="!slot.available" class="status">Booked</span>
        </button>
      </div>
    </div>

    <!-- Booking Form -->
    <div v-if="selectedTime" class="booking-form">
      <h3>Book {{ selectedTime }} on {{ formatDate(selectedDate) }}</h3>
      <form @submit.prevent="submitBooking">
        <input v-model="customerName" placeholder="Your Name" required />
        <input v-model="customerEmail" type="email" placeholder="Your Email" required />
        <textarea v-model="notes" placeholder="Notes (optional)"></textarea>
        <button type="submit" :disabled="submitting">
          {{ submitting ? 'Booking...' : 'Book Appointment' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoogleCalendarBooking',
  data() {
    return {
      // Google Calendar setup
      calendarId: 'your-calendar-id@gmail.com', // Your calendar ID
      apiKey: 'your-google-api-key',
      clientId: 'your-oauth-client-id',
      
      // Booking data
      selectedDate: '',
      selectedTime: '',
      availableSlots: [],
      busyTimes: [],
      loading: false,
      submitting: false,
      
      // Customer info
      customerName: '',
      customerEmail: '',
      notes: '',
      
      // Business hours configuration
      businessHours: {
        start: 9, // 9 AM
        end: 17,  // 5 PM
        interval: 60, // 60-minute slots
        days: [1, 2, 3, 4, 5] // Monday to Friday
      }
    }
  },
  
  computed: {
    minDate() {
      return new Date().toISOString().split('T')[0];
    }
  },
  
  mounted() {
    this.initializeGoogleAPI();
  },
  
  methods: {
    // Initialize Google API
    async initializeGoogleAPI() {
      await new Promise((resolve) => {
        if (window.gapi) {
          resolve();
        } else {
          window.addEventListener('google-api-loaded', resolve);
        }
      });
      
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: this.apiKey,
          clientId: this.clientId,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: 'https://www.googleapis.com/auth/calendar.readonly'
        });
      });
    },
    
    // Check availability for selected date
    async checkAvailability() {
      if (!this.selectedDate) return;
      
      this.loading = true;
      this.availableSlots = [];
      
      try {
        // Authenticate user
        const authInstance = gapi.auth2.getAuthInstance();
        if (!authInstance.isSignedIn.get()) {
          await authInstance.signIn();
        }
        
        // Query busy times for the selected date
        const timeMin = new Date(this.selectedDate + 'T00:00:00').toISOString();
        const timeMax = new Date(this.selectedDate + 'T23:59:59').toISOString();
        
        const response = await gapi.client.calendar.freebusy.query({
          resource: {
            timeMin: timeMin,
            timeMax: timeMax,
            items: [{ id: this.calendarId }]
          }
        });
        
        const busyTimes = response.result.calendars[this.calendarId].busy || [];
        this.generateAvailableSlots(busyTimes);
        
      } catch (error) {
        console.error('Error checking availability:', error);
        alert('Failed to check availability. Please try again.');
      }
      
      this.loading = false;
    },
    
    // Generate available time slots
    generateAvailableSlots(busyTimes) {
      const slots = [];
      const selectedDay = new Date(this.selectedDate).getDay();
      
      // Check if selected day is a business day
      if (!this.businessHours.days.includes(selectedDay)) {
        this.availableSlots = [];
        return;
      }
      
      // Generate all possible time slots
      for (let hour = this.businessHours.start; hour < this.businessHours.end; hour++) {
        const timeSlot = {
          time: `${hour.toString().padStart(2, '0')}:00`,
          available: true,
          datetime: new Date(this.selectedDate + `T${hour.toString().padStart(2, '0')}:00:00`)
        };
        
        // Check if this slot conflicts with busy times
        for (const busy of busyTimes) {
          const busyStart = new Date(busy.start);
          const busyEnd = new Date(busy.end);
          
          if (timeSlot.datetime >= busyStart && timeSlot.datetime < busyEnd) {
            timeSlot.available = false;
            break;
          }
        }
        
        // Don't show past times for today
        const now = new Date();
        if (this.selectedDate === now.toISOString().split('T')[0] && 
            timeSlot.datetime <= now) {
          timeSlot.available = false;
        }
        
        slots.push(timeSlot);
      }
      
      this.availableSlots = slots;
    },
    
    // Select a time slot
    selectTime(slot) {
      if (slot.available) {
        this.selectedTime = slot.time;
      }
    },
    
    // Submit booking
    async submitBooking() {
      this.submitting = true;
      
      try {
        // Create event in Google Calendar
        const event = {
          summary: `Appointment - ${this.customerName}`,
          description: `
            Customer: ${this.customerName}
            Email: ${this.customerEmail}
            Notes: ${this.notes || 'None'}
          `,
          start: {
            dateTime: new Date(this.selectedDate + `T${this.selectedTime}:00`).toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          end: {
            dateTime: new Date(this.selectedDate + `T${this.selectedTime}:00`).setHours(
              new Date(this.selectedDate + `T${this.selectedTime}:00`).getHours() + 1
            ).toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          }
        };
        
        // Insert event into calendar
        await gapi.client.calendar.events.insert({
          calendarId: this.calendarId,
          resource: event
        });
        
        // Send confirmation email (using EmailJS)
        await this.sendConfirmationEmail();
        
        alert('Booking confirmed! You will receive a confirmation email shortly.');
        this.resetForm();
        
      } catch (error) {
        console.error('Booking error:', error);
        alert('Booking failed. Please try again.');
      }
      
      this.submitting = false;
    },
    
    // Send confirmation email via EmailJS
    async sendConfirmationEmail() {
      // EmailJS configuration (you'll need to set this up)
      const emailData = {
        customer_name: this.customerName,
        customer_email: this.customerEmail,
        appointment_date: this.formatDate(this.selectedDate),
        appointment_time: this.selectedTime,
        notes: this.notes
      };
      
      // Send email using EmailJS
      // emailjs.send('your_service_id', 'your_template_id', emailData);
    },
    
    // Helper methods
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    
    resetForm() {
      this.selectedDate = '';
      this.selectedTime = '';
      this.customerName = '';
      this.customerEmail = '';
      this.notes = '';
      this.availableSlots = [];
    }
  }
}
</script>

<style scoped>
.booking-calendar {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.date-selection {
  margin-bottom: 20px;
}

.date-selection label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.date-selection input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.time-slots h3 {
  margin-bottom: 15px;
  color: #333;
}

.slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.time-slot {
  padding: 15px 10px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-slot:not(:disabled):hover {
  border-color: #4CAF50;
  background: #f8f8f8;
}

.time-slot.selected {
  border-color: #4CAF50;
  background: #4CAF50;
  color: white;
}

.time-slot:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
  border-color: #ddd;
}

.time-slot .time {
  font-weight: bold;
  font-size: 16px;
}

.time-slot .status {
  font-size: 12px;
  margin-top: 5px;
}

.booking-form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.booking-form h3 {
  margin-bottom: 15px;
  color: #333;
}

.booking-form input,
.booking-form textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.booking-form textarea {
  resize: vertical;
  height: 80px;
}

.booking-form button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.booking-form button:hover:not(:disabled) {
  background: #45a049;
}

.booking-form button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>