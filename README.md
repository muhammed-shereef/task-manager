# Task Management App

A simple CRUD web application built with Laravel 12 and Vue.js 3.

## Features

- User Authentication (Register/Login/Logout)
- Task Management (Create/Read/Update/Delete)
- Task Filtering by Status
- Responsive UI with Tailwind CSS

## Installation

1. Clone the repository
2. Install dependencies: `composer install && npm install`
3. Copy `.env.example` to `.env` and configure database
4. Generate application key: `php artisan key:generate`
5. Run migrations: `php artisan migrate`
6. Start servers: `php artisan serve` and `npm run dev`

## API Endpoints

- POST /api/register - User registration
- POST /api/login - User login
- POST /api/logout - User logout
- GET /api/tasks - Get user tasks
- POST /api/tasks - Create task
- PUT /api/tasks/{id} - Update task
- DELETE /api/tasks/{id} - Delete task

## Technologies

- Laravel 12
- Vue.js 3
- Laravel Sanctum
- Tailwind CSS
- MySQL
