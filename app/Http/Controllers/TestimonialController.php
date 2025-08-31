<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Testimonial;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class TestimonialController extends Controller
{
    /**
     * Display a listing of testimonials for public view
     */
    public function index()
    {
        $testimonials = Testimonial::with('product')
            ->approved()
            ->latest()
            ->paginate(12);

        return response()->json($testimonials);
    }

    /**
     * Get featured testimonials for homepage
     */
    public function featured()
    {
        // First try to get featured testimonials
        $featuredTestimonials = Testimonial::with('product')
            ->approved()
            ->featured()
            ->latest()
            ->limit(6)
            ->get();

        // If no featured testimonials, get approved ones
        if ($featuredTestimonials->count() === 0) {
            $testimonials = Testimonial::with('product')
                ->approved()
                ->latest()
                ->limit(6)
                ->get();
        } else {
            $testimonials = $featuredTestimonials;
        }

        return response()->json($testimonials);
    }

    /**
     * Show the form for creating a new testimonial
     */
    public function create(Request $request)
    {
        $productId = $request->get('product_id');
        $product = null;
        
        if ($productId) {
            $product = Product::find($productId);
        }

        return Inertia::render('User/TestimonialForm', [
            'product' => $product,
            'products' => Product::all()
        ]);
    }

    /**
     * Store a newly created testimonial
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'nullable|email|max:255',
            'message' => 'required|string|min:10|max:1000',
            'rating' => 'required|integer|min:1|max:5',
            'product_id' => 'nullable|exists:products,id',
        ]);

        Testimonial::create($validated);

        return redirect()->back()->with('success', 'Terima kasih! Testimoni Anda telah dikirim dan akan ditampilkan setelah disetujui oleh admin.');
    }

    /**
     * Get testimonials for a specific product
     */
    public function byProduct(Product $product)
    {
        $testimonials = $product->testimonials()
            ->approved()
            ->with('product')
            ->latest()
            ->paginate(10);

        return response()->json($testimonials);
    }

    // Admin Methods

    /**
     * Display admin testimonials management page
     */
    public function adminIndex()
    {
        $testimonials = Testimonial::with('product')
            ->latest()
            ->get();

        return Inertia::render('Admin/Testimonials', [
            'testimonials' => $testimonials
        ]);
    }

    /**
     * Update testimonial approval status
     */
    public function updateApproval(Request $request, $id)
    {
        $validated = $request->validate([
            'is_approved' => 'required|boolean',
        ]);

        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update($validated);

        return redirect()->route( 'admin.testimonials', [], 303)->with('success', 'Status testimoni berhasil diubah!');
    }

    /**
     * Update testimonial featured status
     */
    public function updateFeatured(Request $request, $id)
    {
        $validated = $request->validate([
            'is_featured' => 'required|boolean',
        ]);

        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update($validated);

        return redirect()->back()->with('success', 'Status unggulan testimoni berhasil diubah!');
    }

    /**
     * Remove the specified testimonial
     */
    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        return redirect()->route( 'admin.testimonials', [], 303)->with('success', 'Testimoni berhasil dihapus!');
    }

    /**
     * Get testimonial statistics for admin dashboard
     */
    public function getStats()
    {
        $stats = [
            'total' => Testimonial::count(),
            'approved' => Testimonial::approved()->count(),
            'pending' => Testimonial::where('is_approved', false)->count(),
            'featured' => Testimonial::featured()->count(),
            'average_rating' => Testimonial::approved()->avg('rating') ?? 0,
        ];

        return response()->json($stats);
    }
}