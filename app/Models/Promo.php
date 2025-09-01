<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Promo extends Model
{
    protected $fillable = [
        'title',
        'description',
        'discount_type',
        'discount_value',
        'min_purchase',
        'max_discount',
        'start_date',
        'end_date',
        'usage_limit',
        'used_count',
        'is_active',
        'promo_code',
        'image'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_active' => 'boolean',
        'discount_value' => 'decimal:2',
        'min_purchase' => 'decimal:2',
        'max_discount' => 'decimal:2'
    ];

    /**
     * The products that belong to the promo.
     */
    public function products()
    {
        return $this->belongsToMany(Product::class, 'promo_product');
    }

    /**
     * Scope for active promos
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
                    ->where('start_date', '<=', now())
                    ->where('end_date', '>=', now());
    }

    /**
     * Scope for available promos (not exceeded usage limit)
     */
    public function scopeAvailable($query)
    {
        return $query->where(function($q) {
            $q->whereNull('usage_limit')
              ->orWhere('used_count', '<', 'usage_limit');
        });
    }

    /**
     * Check if promo is valid
     */
    public function isValid()
    {
        if (!$this->is_active) {
            return false;
        }

        $now = now();
        if ($this->start_date > $now || $this->end_date < $now) {
            return false;
        }

        if ($this->usage_limit && $this->used_count >= $this->usage_limit) {
            return false;
        }

        return true;
    }

    /**
     * Calculate discount amount for a given price
     */
    public function calculateDiscount($price)
    {
        if ($price < $this->min_purchase) {
            return 0;
        }

        if ($this->discount_type === 'percentage') {
            $discount = $price * ($this->discount_value / 100);
            if ($this->max_discount) {
                $discount = min($discount, $this->max_discount);
            }
            return $discount;
        } else {
            return min($this->discount_value, $price);
        }
    }

    /**
     * Get discounted price
     */
    public function getDiscountedPrice($originalPrice)
    {
        $discount = $this->calculateDiscount($originalPrice);
        return $originalPrice - $discount;
    }

    /**
     * Check if promo is currently running
     */
    public function getIsRunningAttribute()
    {
        return $this->isValid();
    }

    /**
     * Get formatted discount value
     */
    public function getFormattedDiscountAttribute()
    {
        if ($this->discount_type === 'percentage') {
            return $this->discount_value . '%';
        } else {
            return 'Rp ' . number_format($this->discount_value, 0, ',', '.');
        }
    }
}
