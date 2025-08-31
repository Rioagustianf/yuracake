<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'customer_name',
        'customer_email', 
        'message',
        'rating',
        'product_id',
        'is_approved',
        'is_featured'
    ];

    protected $casts = [
        'is_approved' => 'boolean',
        'is_featured' => 'boolean',
        'rating' => 'integer'
    ];

    /**
     * Get the product that this testimonial belongs to
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Scope to get only approved testimonials
     */
    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    /**
     * Scope to get only featured testimonials
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Get star rating as array for display
     */
    public function getStarsAttribute()
    {
        return array_fill(0, $this->rating, true);
    }
}