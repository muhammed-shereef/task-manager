<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">Register</h2>

    <form @submit.prevent="handleRegister">
      <div class="mb-4">
        <label class="form-label">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="form-input"
          :class="{ 'border-red-500': errors.name }"

        >
        <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</p>
      </div>

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

      <div class="mb-4">
        <label class="form-label">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="form-input"
          :class="{ 'border-red-500': errors.password }"

        >
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password[0] }}</p>
      </div>

      <div class="mb-6">
        <label class="form-label">Confirm Password</label>
        <input
          v-model="form.password_confirmation"
          type="password"
          class="form-input"
          :class="{ 'border-red-500': errors.password_confirmation }"

        >
        <p v-if="errors.password_confirmation" class="text-red-500 text-sm mt-1">{{ errors.password_confirmation[0] }}</p>
      </div>

      <button type="submit" :disabled="loading" class="btn btn-primary w-full">
        <span v-if="loading">Registering...</span>
        <span v-else>Register</span>
      </button>
    </form>

    <p class="text-center mt-4 text-gray-600">
      Already have an account?
      <router-link to="/login" class="text-blue-600 hover:underline">
        Login here
      </router-link>
    </p>
  </div>
</template>

<script>
import { useAuthStore } from '../../stores/auth'
import { useNotificationStore } from '../../stores/notification'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      loading: false,
      errors: {}
    }
  },
  methods: {
    async handleRegister() {
      this.loading = true
      this.errors = {}

      const authStore = useAuthStore()
      const notificationStore = useNotificationStore()

      const result = await authStore.register(this.form)

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
