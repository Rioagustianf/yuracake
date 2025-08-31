<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'description', 'price', 'image', 'stock'
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class);
    }

    public function approvedTestimonials()
    {
        return $this->hasMany(Testimonial::class)->approved();
    }

    /**
     * Get average rating for this product
     */
    public function getAverageRatingAttribute()
    {
        return $this->testimonials()->approved()->avg('rating') ?? 0;
    }

    /**
     * Get total number of reviews
     */
    public function getReviewCountAttribute()
    {
        return $this->testimonials()->approved()->count();
    }
}
