<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">
      Welcome to Task Management
    </h1>
    <p class="text-xl text-gray-600 mb-8">
      Organize your tasks efficiently and stay productive
    </p>

    <div v-if="!isAuthenticated" class="space-x-4">
      <router-link to="/register" class="btn btn-primary">
        Get Started
      </router-link>
      <router-link to="/login" class="btn btn-secondary">
        Login
      </router-link>
    </div>

    <div v-else>
      <router-link to="/tasks" class="btn btn-primary">
        View My Tasks
      </router-link>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Home',
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore()
      return authStore.isAuthenticated
    }
  }
}
</script>
