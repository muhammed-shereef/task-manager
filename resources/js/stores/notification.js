import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notification: {
      show: false,
      message: '',
      type: 'success'
    }
  }),

  actions: {
    showNotification(message, type = 'success') {
      this.notification = {
        show: true,
        message,
        type
      }

      setTimeout(() => {
        this.notification.show = false
      }, 3000)
    },

    showSuccess(message) {
      this.showNotification(message, 'success')
    },

    showError(message) {
      this.showNotification(message, 'error')
    }
  }
})
