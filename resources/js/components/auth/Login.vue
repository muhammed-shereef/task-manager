<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">Login</h2>

    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label class="form-label">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="form-input"
          :class="{ 'border-red-500': errors.email }"

        >
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email[0] }}</p>
      </div>

      <div class="mb-6">
        <label class="form-label">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="form-input"
          :class="{ 'border-red-500': errors.password }"

        >
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password[0] }}</p>
      </div>

      <button type="submit" :disabled="loading" class="btn btn-primary w-full">
        <span v-if="loading">Logging in...</span>
        <span v-else>Login</span>
      </button>
    </form>

    <p class="text-center mt-4 text-gray-600">
      Don't have an account?
      <router-link to="/register" class="text-blue-600 hover:underline">
        Register here
      </router-link>
    </p>
  </div>
</template>

<script>
import { useAuthStore } from '../../stores/auth'
import { useNotificationStore } from '../../stores/notification'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      errors: {}
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.errors = {}

      const authStore = useAuthStore()
      const notificationStore = useNotificationStore()

      const result = await authStore.login(this.form)

      if (result.success) {
        notificationStore.showSuccess(result.message)
        this.$router.push('/tasks')
      } else {
        notificationStore.showError(result.message)
      }

      this.loading = false
    }
  }
}
</script>
