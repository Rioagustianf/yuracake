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
        ->get()
        ->map(function ($product) {
            $product->has_promo = $product->has_promo;
            $product->discounted_price = $product->discounted_price;
            $product->promo_discount = $product->promo_discount;
            return $product;
        });
        
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
            'is_best_seller' => 'boolean',
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
        
        // Add promo calculations
        $product->has_promo = $product->has_promo;
        $product->discounted_price = $product->discounted_price;
        $product->promo_discount = $product->promo_discount;
        
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
            'is_best_seller' => 'boolean',
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
        $products = Product::orderByDesc('id')
            ->take(3)
            ->get()
            ->map(function ($product) {
                $product->has_promo = $product->has_promo;
                $product->discounted_price = $product->discounted_price;
                $product->promo_discount = $product->promo_discount;
                return $product;
            });
        return response()->json($products);
    }

    public function bestSellers()
    {
        $products = Product::bestSeller()
            ->withCount(['testimonials as review_count' => function($query) {
                $query->where('is_approved', true);
            }])
            ->withAvg(['testimonials as average_rating' => function($query) {
                $query->where('is_approved', true);
            }], 'rating')
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($product) {
                $product->has_promo = $product->has_promo;
                $product->discounted_price = $product->discounted_price;
                $product->promo_discount = $product->promo_discount;
                return $product;
            });
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

    public function toggleBestSeller(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->is_best_seller = !$product->is_best_seller;
        $product->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Status best seller berhasil diubah!',
            'is_best_seller' => $product->is_best_seller
        ]);
    }
}
