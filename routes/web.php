<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\Admin\AuthController;

Route::get('/', function () {
    return Inertia::render('User/LandingPage');
});

// Public routes
Route::get('/daftar-kue', [ProductController::class, 'index'])->name('products.index');
Route::get('/kue/{id}', [ProductController::class, 'show'])->name('products.show');

// Public order routes (no authentication required)
Route::get('/pesan', [OrderController::class, 'create'])->name('orders.create');
Route::post('/pesan', [OrderController::class, 'store'])->name('orders.store');
Route::get('/konfirmasi/{id}', [OrderController::class, 'show'])->name('orders.show');

// Public testimonial routes
Route::get('/testimonial', [TestimonialController::class, 'create'])->name('testimonials.create');
Route::post('/testimonial', [TestimonialController::class, 'store'])->name('testimonials.store');
Route::get('/api/testimonials', [TestimonialController::class, 'index']);
Route::get('/api/testimonials/featured', [TestimonialController::class, 'featured']);
Route::get('/api/testimonials/product/{product}', [TestimonialController::class, 'byProduct']);

// Public promo routes
Route::get('/api/promos', [PromoController::class, 'index']);
Route::get('/api/promos/featured', [PromoController::class, 'featured']);
Route::post('/api/promos/validate', [PromoController::class, 'validateCode']);

Route::get('/api/produk-unggulan', [ProductController::class, 'featured']);
Route::get('/api/best-sellers', [ProductController::class, 'bestSellers']);

Route::get('/admin/login', [AuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [AuthController::class, 'login'])->name('admin.login.submit');
Route::post('/admin/logout', [AuthController::class, 'logout'])->name('admin.logout');

Route::middleware('admin')->group(function () {
    Route::get('/admin/dashboard', [ProductController::class, 'dashboardStats']);
    Route::get('/admin/produk', [ProductController::class, 'adminIndex'])->name('admin.produk');
    Route::post('/admin/produk', [ProductController::class, 'store']);
    Route::put('/admin/produk/{id}', [ProductController::class, 'update']);
    Route::delete('/admin/produk/{id}', [ProductController::class, 'destroy']);
    Route::get('/admin/pesanan', [OrderController::class, 'adminIndex'])->name('admin.pesanan');
    Route::get('/admin/laporan', [OrderController::class, 'laporan']);
    Route::get('/admin/laporan/export', [OrderController::class, 'exportExcel']);
    Route::get('/admin/laporan/export-pdf', [OrderController::class, 'exportPdf']);
    Route::put('/admin/pesanan/{id}', [OrderController::class, 'update']);
    Route::patch('/admin/produk/{id}/best-seller', [ProductController::class, 'toggleBestSeller']);
    
    // Admin testimonial routes
    Route::get('/admin/testimonials', [TestimonialController::class, 'adminIndex'])->name('admin.testimonials');
    Route::patch('/admin/testimonials/{id}/approval', [TestimonialController::class, 'updateApproval'])->name('admin.testimonials.approval');
    Route::patch('/admin/testimonials/{id}/featured', [TestimonialController::class, 'updateFeatured'])->name('admin.testimonials.featured');
    Route::delete('/admin/testimonials/{id}', [TestimonialController::class, 'destroy'])->name('admin.testimonials.destroy');
    Route::get('/admin/testimonials/stats', [TestimonialController::class, 'getStats'])->name('admin.testimonials.stats');
    
    // Admin promo routes
    Route::get('/admin/promos', [PromoController::class, 'adminIndex'])->name('admin.promos');
    Route::post('/admin/promos', [PromoController::class, 'store'])->name('admin.promos.store');
    Route::put('/admin/promos/{id}', [PromoController::class, 'update'])->name('admin.promos.update');
    Route::patch('/admin/promos/{id}/status', [PromoController::class, 'toggleStatus'])->name('admin.promos.toggle');
    Route::delete('/admin/promos/{id}', [PromoController::class, 'destroy'])->name('admin.promos.destroy');
    Route::get('/admin/promos/stats', [PromoController::class, 'getStats'])->name('admin.promos.stats');
});
