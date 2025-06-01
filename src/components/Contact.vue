<template>
  <div class="contact-bg">
    <div class="form-white">
      <p class="get-in-touch">Join the Herballo Family</p>
      <form @submit.prevent="handleSubmit">
        <label for="name">Name</label>
        <input
          type="text"
          v-model="form.name"
          placeholder="Your full name"
          required
        />

        <label for="email">Email</label>
        <input
          type="email"
          v-model="form.email"
          placeholder="you@example.com"
          required
        />

        <label for="message">Message or Interest</label>
        <input
          type="text"
          v-model="form.message"
          placeholder="Let us know how we can help"
        />

        <button class="green-button btn-app" type="submit">
          Subscribe
        </button>

        <p v-if="submitted" class="success-text">You're in! 💚 Thank you for joining Herballo.</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitted = ref(false)

const handleSubmit = async () => {
  const zohoEndpoint = 'https://forms.zohopublic.com/...'

  try {
    const formData = new FormData()
    formData.append('Name', form.name)
    formData.append('Email', form.email)
    formData.append('Message', form.message)

    await fetch(zohoEndpoint, {
      method: 'POST',
      body: formData
    })

    submitted.value = true
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (error) {
    alert('Something went wrong. Please try again.')
    console.error(error)
  }
}
</script>

<style scoped>
.contact-bg {
  background-color: #ffffff;
  padding-top: 2rem;
  padding-bottom: 3rem;
  width: 100%;
}

.form-white {
  max-width: 600px;
  margin: auto;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.get-in-touch {
  text-align: center;
  color: #105212;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  color: #222222;
  font-weight: 600;
  margin-bottom: 0.2rem;
}

input {
  width: 100%;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  padding-left: 1rem;
  font-size: 1rem;
}

input::placeholder {
  color: #aaa;
}

.green-button {
  background-color: #105212;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.green-button:hover {
  background-color: #0d4310;
}

.success-text {
  margin-top: 1rem;
  color: #105212;
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
}

@media screen and (max-width: 800px) {
  .get-in-touch {
    font-size: 1.5rem;
  }
}
</style>
