<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_name', 'customer_phone', 'customer_address', 'payment_method', 'status', 'total_price', 'note'
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
