<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Dompdf\Dompdf;
use Dompdf\Options;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $products = \App\Models\Product::all();
        return Inertia::render('User/FormulirPemesanan', [
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:20',
            'customer_address' => 'required|string',
            'payment_method' => 'required|in:cod,bank_transfer',
            'note' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();
        try {
            $total = 0;
            $order = Order::create([
                'customer_name' => $validated['customer_name'],
                'customer_phone' => $validated['customer_phone'],
                'customer_address' => $validated['customer_address'],
                'payment_method' => $validated['payment_method'],
                'status' => 'pending',
                'total_price' => 0, // sementara, update setelah item
                'note' => $validated['note'] ?? null,
            ]);

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $subtotal = $product->price * $item['quantity'];
                $total += $subtotal;
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'subtotal' => $subtotal,
                ]);
            }
            $order->update(['total_price' => $total]);
            DB::commit();
            return redirect()->route('orders.show', $order->id)->with('success', 'Pesanan berhasil dibuat!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal membuat pesanan.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with(['orderItems.product'])->findOrFail($id);
        // Ubah relasi ke snake_case agar props di frontend konsisten
        $order->order_items = $order->orderItems->map(function($item) {
            $item->product = $item->product;
            return $item;
        });
        unset($order->orderItems);
        return Inertia::render('User/KonfirmasiPesanan', [
            'order' => $order
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,processing,delivered,cancelled',
        ]);
        $order = Order::findOrFail($id);
        $order->status = $validated['status'];
        $order->save();
        // Inertia expects a 303 redirect after PUT/PATCH/DELETE
        return redirect()->route('admin.pesanan', [], 303)->with('success', 'Status pesanan berhasil diubah!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function adminIndex()
    {
        $orders = Order::with(['orderItems.product'])->orderByDesc('id')->get();
        return Inertia::render('Admin/Pesanan', [
            'orders' => $orders
        ]);
    }

    public function laporan(Request $request)
    {
        $filter = $request->get('filter', 'all'); // all, daily, weekly, monthly
        $query = Order::with(['orderItems.product'])->orderByDesc('id');
        
        switch ($filter) {
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
        
        $orders = $query->get();
        
        return Inertia::render('Admin/Laporan', [
            'orders' => $orders,
            'filter' => $filter
        ]);
    }

    // Export laporan ke Excel
    public function exportExcel(Request $request)
    {
        $filter = $request->get('filter', 'all');
        $filename = 'laporan-penjualan';
        
        switch ($filter) {
            case 'daily':
                $filename .= '-hari-ini';
                break;
            case 'weekly':
                $filename .= '-minggu-ini';
                break;
            case 'monthly':
                $filename .= '-bulan-ini';
                break;
            default:
                $filename .= '-semua-waktu';
                break;
        }
        
        $filename .= '.xlsx';
        
        // Pastikan package Maatwebsite\Excel sudah diinstall
        return \Excel::download(new \App\Exports\LaporanExport($filter), $filename);
    }

    // Export laporan ke PDF
    public function exportPdf(Request $request)
    {
        $filter = $request->get('filter', 'all');
        $query = Order::with(['orderItems.product'])->orderByDesc('id');
        
        // Apply filter based on time period
        switch ($filter) {
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
        
        $orders = $query->get();
        $totalPenjualan = $orders->sum('total_price');
        
        $filename = 'laporan-penjualan';
        switch ($filter) {
            case 'daily':
                $filename .= '-hari-ini';
                break;
            case 'weekly':
                $filename .= '-minggu-ini';
                break;
            case 'monthly':
                $filename .= '-bulan-ini';
                break;
            default:
                $filename .= '-semua-waktu';
                break;
        }
        $filename .= '.pdf';
        
        $data = [
            'orders' => $orders,
            'totalPenjualan' => $totalPenjualan,
            'filter' => $filter,
            'filterLabel' => $this->getFilterLabel($filter),
            'generatedAt' => now()->format('d/m/Y H:i:s')
        ];
        
        // Generate PDF using DomPDF
        $html = view('admin.laporan-pdf', $data)->render();
        
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isPhpEnabled', true);
        $options->set('isRemoteEnabled', true);
        $options->set('defaultFont', 'Arial');
        
        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        
        return $dompdf->stream($filename);
    }

    private function getFilterLabel($filter)
    {
        switch ($filter) {
            case 'daily':
                return 'Hari Ini (' . now()->format('d/m/Y') . ')';
            case 'weekly':
                return 'Minggu Ini (' . now()->startOfWeek()->format('d/m/Y') . ' - ' . now()->endOfWeek()->format('d/m/Y') . ')';
            case 'monthly':
                return 'Bulan Ini (' . now()->format('F Y') . ')';
            default:
                return 'Semua Waktu';
        }
    }
}
