// import './bootstrap';
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'


import Home from './components/Home.vue'
import Login from './components/auth/Login.vue'
import Register from './components/auth/Register.vue'
import TaskList from './components/tasks/TaskList.vue'
import TaskForm from './components/tasks/TaskForm.vue'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

const token = localStorage.getItem('auth_token')
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/tasks', name: 'tasks', component: TaskList, meta: { requiresAuth: true } },
    { path: '/tasks/create', name: 'task-create', component: TaskForm, meta: { requiresAuth: true } },
    { path: '/tasks/:id/edit', name: 'task-edit', component: TaskForm, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('auth_token')

    if (to.meta.requiresAuth && !token) {
        next('/login')
    } else if ((to.name === 'login' || to.name === 'register') && token) {
        next('/tasks')
    } else {
        next()
    }
})

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.config.globalProperties.$http = axios
app.mount('#app')
