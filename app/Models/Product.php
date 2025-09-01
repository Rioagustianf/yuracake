<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'description', 'price', 'image', 'stock', 'is_best_seller'
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

    /**
     * Scope for best seller products
     */
    public function scopeBestSeller($query)
    {
        return $query->where('is_best_seller', true);
    }

    /**
     * The promos that belong to the product.
     */
    public function promos()
    {
        return $this->belongsToMany(Promo::class, 'promo_product');
    }

    /**
     * Get active promos for this product
     */
    public function activePromos()
    {
        // Return a collection instead of query builder to avoid UNION issues
        $specificPromos = $this->promos()->active()->available()->get();
        $globalPromos = Promo::active()->available()
            ->whereDoesntHave('products')
            ->get();
        
        return $specificPromos->merge($globalPromos);
    }

    /**
     * Get the best promo for this product
     */
    public function getBestPromo()
    {
        // Get specific promos for this product
        $specificPromos = $this->promos()->active()->available()->get();
        
        // Get global promos (promos with no product attachments)
        $globalPromos = Promo::active()->available()
            ->whereDoesntHave('products')
            ->get();
        
        // Combine all available promos
        $allPromos = $specificPromos->merge($globalPromos);
        
        if ($allPromos->isEmpty()) {
            return null;
        }

        // Find the promo with the highest discount
        return $allPromos->sortByDesc(function ($promo) {
            return $promo->calculateDiscount($this->price);
        })->first();
    }

    /**
     * Get discounted price if promo is available
     */
    public function getDiscountedPriceAttribute()
    {
        $bestPromo = $this->getBestPromo();
        
        if (!$bestPromo) {
            return $this->price;
        }

        return $bestPromo->getDiscountedPrice($this->price);
    }

    /**
     * Check if product has active promo
     */
    public function getHasPromoAttribute()
    {
        $bestPromo = $this->getBestPromo();
        
        if (!$bestPromo) {
            return false;
        }
        
        // Only return true if there's an actual discount
        return $bestPromo->calculateDiscount($this->price) > 0;
    }

    /**
     * Get promo discount amount
     */
    public function getPromoDiscountAttribute()
    {
        $bestPromo = $this->getBestPromo();
        
        if (!$bestPromo) {
            return 0;
        }

        return $bestPromo->calculateDiscount($this->price);
    }
}
