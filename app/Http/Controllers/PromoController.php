<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Promo;
use App\Models\Product;
use Inertia\Inertia;
use Carbon\Carbon;

class PromoController extends Controller
{
    /**
     * Display a listing of active promos.
     */
    public function index()
    {
        $promos = Promo::active()->available()
            ->with('products')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($promos);
    }

    /**
     * Get featured promos for homepage
     */
    public function featured()
    {
        $promos = Promo::active()->available()
            ->with('products')
            ->orderBy('discount_value', 'desc')
            ->take(3)
            ->get();
        
        return response()->json($promos);
    }

    /**
     * Validate promo code
     */
    public function validateCode(Request $request)
    {
        $request->validate([
            'promo_code' => 'required|string',
            'total_amount' => 'required|numeric|min:0'
        ]);

        $promo = Promo::where('promo_code', $request->promo_code)
            ->active()
            ->available()
            ->first();

        if (!$promo) {
            return response()->json([
                'success' => false,
                'message' => 'Kode promo tidak valid atau sudah kadaluarsa'
            ]);
        }

        if ($request->total_amount < $promo->min_purchase) {
            return response()->json([
                'success' => false,
                'message' => 'Minimum pembelian untuk promo ini adalah Rp ' . number_format($promo->min_purchase, 0, ',', '.')
            ]);
        }

        $discount = $promo->calculateDiscount($request->total_amount);
        $finalAmount = $request->total_amount - $discount;

        return response()->json([
            'success' => true,
            'promo' => $promo,
            'discount' => $discount,
            'final_amount' => $finalAmount,
            'message' => 'Kode promo berhasil diterapkan!'
        ]);
    }

    /**
     * Admin: Display a listing of all promos.
     */
    public function adminIndex()
    {
        $promos = Promo::with('products')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('Admin/Promos', [
            'promos' => $promos
        ]);
    }

    /**
     * Admin: Store a newly created promo.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'discount_type' => 'required|in:percentage,fixed',
            'discount_value' => 'required|numeric|min:0',
            'min_purchase' => 'required|numeric|min:0',
            'max_discount' => 'nullable|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'usage_limit' => 'nullable|integer|min:1',
            'promo_code' => 'nullable|string|unique:promos,promo_code',
            'product_ids' => 'nullable|array',
            'product_ids.*' => 'exists:products,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('promos', 'public');
            $validated['image'] = $path;
        }

        $promo = Promo::create($validated);

        // Attach products if specified
        if ($request->has('product_ids')) {
            $promo->products()->sync($request->product_ids);
        }

        return redirect()->back()->with('success', 'Promo berhasil ditambahkan!');
    }

    /**
     * Admin: Update the specified promo.
     */
    public function update(Request $request, $id)
    {
        $promo = Promo::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'discount_type' => 'required|in:percentage,fixed',
            'discount_value' => 'required|numeric|min:0',
            'min_purchase' => 'required|numeric|min:0',
            'max_discount' => 'nullable|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'usage_limit' => 'nullable|integer|min:1',
            'promo_code' => 'nullable|string|unique:promos,promo_code,' . $id,
            'product_ids' => 'nullable|array',
            'product_ids.*' => 'exists:products,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('promos', 'public');
            $validated['image'] = $path;
        }

        $promo->update($validated);

        // Update products relationship
        if ($request->has('product_ids')) {
            $promo->products()->sync($request->product_ids);
        }

        return redirect()->back()->with('success', 'Promo berhasil diupdate!');
    }

    /**
     * Admin: Toggle promo active status
     */
    public function toggleStatus(Request $request, $id)
    {
        $promo = Promo::findOrFail($id);
        $promo->is_active = !$promo->is_active;
        $promo->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Status promo berhasil diubah!',
            'is_active' => $promo->is_active
        ]);
    }

    /**
     * Admin: Remove the specified promo.
     */
    public function destroy($id)
    {
        $promo = Promo::findOrFail($id);
        $promo->delete();
        
        return redirect()->route('admin.promos', [] , 303)->with('success', 'Promo berhasil dihapus!');
    }

    /**
     * Get promo statistics for admin dashboard
     */
    public function getStats()
    {
        $totalPromos = Promo::count();
        $activePromos = Promo::active()->count();
        $expiredPromos = Promo::where('end_date', '<', now())->count();
        $usedPromos = Promo::where('used_count', '>', 0)->count();

        return response()->json([
            'total_promos' => $totalPromos,
            'active_promos' => $activePromos,
            'expired_promos' => $expiredPromos,
            'used_promos' => $usedPromos
        ]);
    }
}
