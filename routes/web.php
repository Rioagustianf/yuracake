<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Admin\AuthController;

Route::get('/', function () {
    return Inertia::render('User/LandingPage');
});

// User flow
Route::get('/daftar-kue', [ProductController::class, 'index'])->name('products.index');
Route::get('/kue/{id}', [ProductController::class, 'show'])->name('products.show');
Route::get('/pesan', [OrderController::class, 'create'])->name('orders.create');
Route::post('/pesan', [OrderController::class, 'store'])->name('orders.store');
Route::get('/konfirmasi/{id}', [OrderController::class, 'show'])->name('orders.show');

Route::get('/api/produk-unggulan', [ProductController::class, 'featured']);

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
    Route::put('/admin/pesanan/{id}', [OrderController::class, 'update']);
});
