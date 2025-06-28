<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Task::where('created_by', auth()->id());

            if ($request->has('status') && $request->status !== '') {
                $query->where('status', $request->status);
            }

            $tasks = $query->orderBy('created_at', 'desc')->get();

            return response()->json([
                'message' => 'Tasks retrieved successfully',
                'tasks' => $tasks
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve tasks',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(StoreTaskRequest $request)
    {
        try {
            $task = Task::create([
                'title' => $request->title,
                'description' => $request->description,
                'status' => $request->status,
                'due_date' => $request->due_date,
                'created_by' => auth()->id()
            ]);

            return response()->json([
                'message' => 'Task created successfully',
                'task' => $task
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $task = Task::where('created_by', auth()->id())->findOrFail($id);

            return response()->json([
                'message' => 'Task retrieved successfully',
                'task' => $task
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Task not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        try {
            $task = Task::where('created_by', auth()->id())->findOrFail($id);

            $task->update([
                'title' => $request->title,
                'description' => $request->description,
                'status' => $request->status,
                'due_date' => $request->due_date
            ]);

            return response()->json([
                'message' => 'Task updated successfully',
                'task' => $task
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $task = Task::where('created_by', auth()->id())->findOrFail($id);
            $task->delete();

            return response()->json([
                'message' => 'Task deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete task',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
