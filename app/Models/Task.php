<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'due_date',
        'created_by'
    ];

    protected $casts = [
        'due_date' => 'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
