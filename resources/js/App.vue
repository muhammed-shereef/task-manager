<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-bold text-gray-800">
              Task Management
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <template v-if="isAuthenticated">
              <router-link to="/tasks" class="text-gray-600 hover:text-gray-900">
                My Tasks
              </router-link>
              <button @click="logout" class="btn btn-secondary">
                Logout
              </button>
            </template>
            <template v-else>
              <router-link to="/login" class="text-gray-600 hover:text-gray-900">
                Login
              </router-link>
              <router-link to="/register" class="btn btn-primary">
                Register
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 px-4">
      <router-view />
    </main>

    <!-- Toast notifications -->
    <div v-if="notification.show"
         :class="[
           'fixed top-4 right-4 p-4 rounded-md shadow-lg z-50',
           notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
         ]">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import { useAuthStore } from './stores/auth'
import { useNotificationStore } from './stores/notification'

export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore()
      return authStore.isAuthenticated
    },
    notification() {
      const notificationStore = useNotificationStore()
      return notificationStore.notification
    }
  },
  methods: {
    async logout() {
      const authStore = useAuthStore()
      await authStore.logout()
      this.$router.push('/login')
    }
  },
  mounted() {
    const authStore = useAuthStore()
    authStore.checkAuth()
  }
}
</script>
