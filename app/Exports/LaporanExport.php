<?php

namespace App\Exports;

use App\Models\Order;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class LaporanExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Order::select('created_at', 'customer_name', 'customer_phone', 'customer_address', 'total_price', 'status')
            ->orderByDesc('id')
            ->get()
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
