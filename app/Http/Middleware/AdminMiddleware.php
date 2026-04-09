<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->role === 'admin') {
            return $next($request);
        }

        // If it's an API/Ajax request, abort. Otherwise redirect back or to POS
        if ($request->ajax() || $request->wantsJson()) {
            abort(403, 'Unauthorized action.');
        }

        return redirect()->route('pos.index')->with('error', 'Hanya Admin yang dapat mengakses area tersebut.');
    }
}
