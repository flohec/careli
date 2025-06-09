<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'first_name',
        'email',
        'password',
        'role_id',
        'company_id',
    ];

    protected $appends = ['full_name'];

    public function isAdmin(): bool
    {
        return $this->role->slug === 'admin';
    }

    public function address()
    {
        return $this->morphOne(Addressee::class, 'addressable');
    }

    public function role() : BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function company() : BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->name}";
    }

    public function scopeSearch(Builder $query, $term)
    {
        if (!empty($term)) {
            $query->where(function ($q) use ($term) {
                $q->where('name', 'LIKE', "%{$term}%")
                    ->orWhere('email', 'LIKE', "%{$term}%")
                    ->orWhere('first_name', 'LIKE', "%{$term}%");
            });
        }
    }

    public function scopeRole($query, $role)
    {
        if (!empty($role) && $role !== 'all') {
            $query->whereHas('role', function ($q) use ($role) {
                $q->where('name', $role);
            });
        }
    }
}
