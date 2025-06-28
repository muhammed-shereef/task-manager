import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('auth_token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('/api/login', credentials)
        this.token = response.data.token
        this.user = response.data.user

        localStorage.setItem('auth_token', this.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        return { success: true, message: response.data.message }
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || 'Login failed'
        }
      }
    },

    async register(userData) {
      try {
        const response = await axios.post('/api/register', userData)
        this.token = response.data.token
        this.user = response.data.user

        localStorage.setItem('auth_token', this.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        return { success: true, message: response.data.message }
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || 'Registration failed'
        }
      }
    },

    async logout() {
      try {
        if (this.token) {
          await axios.post('/api/logout')
        }
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.token = null
        this.user = null
        localStorage.removeItem('auth_token')
        delete axios.defaults.headers.common['Authorization']
      }
    },

    async checkAuth() {
      if (this.token) {
        try {
          const response = await axios.get('/api/user')
          this.user = response.data
        } catch (error) {
          this.logout()
        }
      }
    }
  }
})
