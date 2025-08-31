<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::withCount(['testimonials as review_count' => function($query) {
            $query->where('is_approved', true);
        }])
        ->withAvg(['testimonials as average_rating' => function($query) {
            $query->where('is_approved', true);
        }], 'rating')
        ->get();
        
        return Inertia::render('User/DaftarKue', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }
        $product = Product::create($validated);
        return redirect()->back()->with('success', 'Produk berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::withCount(['testimonials as review_count' => function($query) {
            $query->where('is_approved', true);
        }])
        ->withAvg(['testimonials as average_rating' => function($query) {
            $query->where('is_approved', true);
        }], 'rating')
        ->findOrFail($id);
        
        return Inertia::render('User/DetailKue', [
            'product' => $product,
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
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);
        $product = Product::findOrFail($id);
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }
        $product->update($validated);
        return redirect()->back()->with('success', 'Produk berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return redirect()->route('admin.produk', [], 303)->with('success', 'Produk berhasil dihapus!');
    }

    public function featured()
    {
        $products = Product::orderByDesc('id')->take(3)->get();
        return response()->json($products);
    }

    public function adminIndex()
    {
        $products = Product::all();
        return Inertia::render('Admin/Produk', [
            'products' => $products
        ]);
    }

    public function dashboardStats()
    {
        $totalProduk = \App\Models\Product::count();
        $totalPesanan = \App\Models\Order::count();
        $penjualanBulanIni = \App\Models\Order::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total_price');
        return Inertia::render('Admin/Dashboard', [
            'totalProduk' => $totalProduk,
            'totalPesanan' => $totalPesanan,
            'penjualanBulanIni' => $penjualanBulanIni,
        ]);
    }
}
