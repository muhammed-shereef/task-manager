<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">My Tasks</h1>
      <router-link to="/tasks/create" class="btn btn-primary">
        Add New Task
      </router-link>
    </div>

    <!-- Filter -->
    <div class="mb-4">
      <select v-model="statusFilter" @change="fetchTasks" class="form-input max-w-xs">
        <option value="">All Tasks</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <!-- Tasks Table -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="task in tasks" :key="task.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ task.title }}</div>
              <div class="text-sm text-gray-500">{{ task.description }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(task.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ formatStatus(task.status) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatDate(task.due_date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
              <router-link
                :to="`/tasks/${task.id}/edit`"
                class="text-blue-600 hover:text-blue-900"
              >
                Edit
              </router-link>
              <button
                @click="deleteTask(task.id)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="tasks.length === 0" class="text-center py-8">
        <p class="text-gray-500">No tasks found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useNotificationStore } from '../../stores/notification'

export default {
  name: 'TaskList',
  data() {
    return {
      tasks: [],
      statusFilter: '',
      loading: false
    }
  },
  mounted() {
    this.fetchTasks()
  },
  methods: {
    async fetchTasks() {
      this.loading = true
      try {
        const params = this.statusFilter ? { status: this.statusFilter } : {}
        const response = await axios.get('/api/tasks', { params })
        this.tasks = response.data.tasks
      } catch (error) {
        const notificationStore = useNotificationStore()
        notificationStore.showError('Failed to fetch tasks')
      }
      this.loading = false
    },

    async deleteTask(id) {
      if (confirm('Are you sure you want to delete this task?')) {
        try {
          await axios.delete(`/api/tasks/${id}`)
          const notificationStore = useNotificationStore()
          notificationStore.showSuccess('Task deleted successfully')
          this.fetchTasks()
        } catch (error) {
          const notificationStore = useNotificationStore()
          notificationStore.showError('Failed to delete task')
        }
      }
    },

    getStatusClass(status) {
      switch (status) {
        case 'pending':
          return 'bg-yellow-100 text-yellow-800'
        case 'in-progress':
          return 'bg-blue-100 text-blue-800'
        case 'completed':
          return 'bg-green-100 text-green-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },

    formatStatus(status) {
      return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>
