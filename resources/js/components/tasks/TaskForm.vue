<template>
  <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">
      {{ isEditing ? 'Edit Task' : 'Create New Task' }}
    </h2>

    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="form-label">Title</label>
        <input
          v-model="form.title"
          type="text"
          class="form-input"
          :class="{ 'border-red-500': errors.title }"

        >
        <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title[0] }}</p>
      </div>

      <div class="mb-4">
        <label class="form-label">Description</label>
        <textarea
          v-model="form.description"
          rows="4"
          class="form-input"
          :class="{ 'border-red-500': errors.description }"

        ></textarea>
        <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description[0] }}</p>
      </div>

      <div class="mb-4">
        <label class="form-label">Status</label>
        <select
          v-model="form.status"
          class="form-input"
          :class="{ 'border-red-500': errors.status }"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status[0] }}</p>
      </div>

      <div class="mb-6">
        <label class="form-label">Due Date</label>
        <input
          v-model="form.due_date"
          type="date"
          class="form-input"
          :class="{ 'border-red-500': errors.due_date }"

        >
        <p v-if="errors.due_date" class="text-red-500 text-sm mt-1">{{ errors.due_date[0] }}</p>
      </div>

      <div class="flex space-x-4">
        <button type="submit" :disabled="loading" class="btn btn-primary">
          <span v-if="loading">{{ isEditing ? 'Updating...' : 'Creating...' }}</span>
          <span v-else>{{ isEditing ? 'Update Task' : 'Create Task' }}</span>
        </button>
        <router-link to="/tasks" class="btn btn-secondary">
          Cancel
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { useNotificationStore } from '../../stores/notification'

export default {
  name: 'TaskForm',
  data() {
    return {
      form: {
        title: '',
        description: '',
        status: 'pending',
        due_date: ''
      },
      loading: false,
      errors: {}
    }
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id
    }
  },
  async mounted() {
    if (this.isEditing) {
      await this.fetchTask()
    }
  },
  methods: {
    async fetchTask() {
      try {
        const response = await axios.get(`/api/tasks/${this.$route.params.id}`)
        const task = response.data.task
        this.form = {
          title: task.title,
          description: task.description,
          status: task.status,
          due_date: task.due_date
        }
      } catch (error) {
        const notificationStore = useNotificationStore()
        notificationStore.showError('Failed to fetch task')
        this.$router.push('/tasks')
      }
    },

    async handleSubmit() {
      this.loading = true
      this.errors = {}

      const notificationStore = useNotificationStore()

      try {
        if (this.isEditing) {
          await axios.put(`/api/tasks/${this.$route.params.id}`, this.form)
          notificationStore.showSuccess('Task updated successfully')
        } else {
          await axios.post('/api/tasks', this.form)
          notificationStore.showSuccess('Task created successfully')
        }

        this.$router.push('/tasks')
      } catch (error) {
        if (error.response?.data?.errors) {
          this.errors = error.response.data.errors
        } else {
          notificationStore.showError(
            this.isEditing ? 'Failed to update task' : 'Failed to create task'
          )
        }
      }

      this.loading = false
    }
  }
}
</script>
