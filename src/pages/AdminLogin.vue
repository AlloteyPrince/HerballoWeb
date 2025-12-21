<template>
  <div>
    <Navigation />
  <div class="admin-wrapper">
    <div class="admin-card">
      <h1 class="brand">Herballo</h1>
      <p class="subtitle">Admin Login</p>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Username" required />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
  </div>
</template>

<script setup>
import { api } from "../api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Navigation from "@/components/Navigation.vue";

const username = ref("");
const password = ref("");
const error = ref(null);
const router = useRouter();

const login = async () => {
  error.value = null;
  try {
    const res = await fetch(api("/api/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await res.json();
    console.log("Response status:", res.status, data);

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/admin/dashboard");
    } else {
      error.value = data.message || "Login failed";
    }
  } catch (err) {
    console.error("FETCH ERROR:", err);
    error.value = "Something went wrong";
  }
};
</script>

<style scoped>
.admin-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
}

.admin-card {
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.brand {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #105212;
}

.subtitle {
  font-size: 1.2rem;
  color: #777;
  margin-bottom: 1.5rem;
}

form input {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 15px;
  border: none;
  border-radius: 6px;
  background-color: #f1f3f5;
  font-size: 1rem;
  outline: none;
}

form input:focus {
  background-color: #e9ecef;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #105212;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #0c3d0e;
}

.error {
  color: #e74c3c;
  margin-top: 15px;
  font-size: 0.95rem;
}
</style>
