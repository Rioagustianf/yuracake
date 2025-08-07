<?php

namespace App\Exports;

use App\Models\Order;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class LaporanExport implements FromCollection, WithHeadings
{
    protected $filter;

    public function __construct($filter = 'all')
    {
        $this->filter = $filter;
    }

    public function collection()
    {
        $query = Order::select('created_at', 'customer_name', 'customer_phone', 'customer_address', 'total_price', 'status')
            ->orderByDesc('id');
        
        // Apply filter based on time period
        switch ($this->filter) {
            case 'daily':
                $query->whereDate('created_at', today());
                break;
            case 'weekly':
                $query->whereBetween('created_at', [
                    now()->startOfWeek(),
                    now()->endOfWeek()
                ]);
                break;
            case 'monthly':
                $query->whereBetween('created_at', [
                    now()->startOfMonth(),
                    now()->endOfMonth()
                ]);
                break;
            default:
                // all - tidak ada filter tambahan
                break;
        }
        
        return $query->get()
            ->map(function ($order) {
                return [
                    'Tanggal' => $order->created_at->format('Y-m-d H:i'),
                    'Nama Customer' => $order->customer_name,
                    'No HP' => $order->customer_phone,
                    'Alamat' => $order->customer_address,
                    'Total' => $order->total_price,
                    'Status' => $order->status,
                ];
            });
    }

    public function headings(): array
    {
        return [
            'Tanggal',
            'Nama Customer',
            'No HP',
            'Alamat',
            'Total',
            'Status',
        ];
    }
}
