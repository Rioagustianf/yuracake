<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

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

    public function laporan()
    {
        $orders = Order::with(['orderItems.product'])->orderByDesc('id')->get();
        return Inertia::render('Admin/Laporan', [
            'orders' => $orders
        ]);
    }

    // Export laporan ke Excel
    public function exportExcel()
    {
        // Pastikan package Maatwebsite\Excel sudah diinstall
        return \Excel::download(new \App\Exports\LaporanExport, 'laporan-penjualan.xlsx');
    }
}
