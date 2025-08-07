<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureCustomerIsAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('customer.login');
        }

        if (Auth::user()->role !== 'customer') {
            return redirect()->route('customer.login')->withErrors([
                'email' => 'Anda tidak memiliki akses ke halaman ini.',
            ]);
        }

        return $next($request);
    }
} 